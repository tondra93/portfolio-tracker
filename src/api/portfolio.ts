import axios from 'axios';
import { NativeModules, Platform } from 'react-native';
import type { AddHoldingInput, Holding } from '../types';
import { RELEASE_API_URL, DEV_MODE_OVERRIDE } from '../config/api';

const parseHostFromUrl = (url: string | undefined): string | null => {
  if (!url) {
    return null;
  }

  const match = url.match(/^https?:\/\/([^/:]+)(?::\d+)?/);
  return match?.[1] ?? null;
};

const getDevServerHost = (): string | null => {
  const sourceCodeHost = parseHostFromUrl(NativeModules.SourceCode?.scriptURL);
  if (sourceCodeHost) {
    return sourceCodeHost;
  }

  // On Android devices this often contains "<host-ip>:8081", even when
  // SourceCode.scriptURL is localhost via adb reverse.
  const rawServerHost: string | undefined = NativeModules.PlatformConstants?.ServerHost;
  if (rawServerHost) {
    const [hostPart] = rawServerHost.split(':');
    if (hostPart) {
      return hostPart;
    }
  }

  return null;
};

const isDevMode = (): boolean => {
  return __DEV__;
};

const getCandidateBaseUrls = (): string[] => {
  // If manual override is set, use it first (works in both dev and release)
  if (DEV_MODE_OVERRIDE) {
    console.log('[API] Using manual override URL:', DEV_MODE_OVERRIDE);
    return [DEV_MODE_OVERRIDE];
  }

  // In release mode, use the configured API URL
  if (!isDevMode()) {
    console.log('[API] Release mode - using configured URL:', RELEASE_API_URL);
    return [RELEASE_API_URL];
  }

  // Development mode auto-detection
  if (Platform.OS === 'ios') {
    return ['http://localhost:3001'];
  }

  const candidates: string[] = [];
  const host = getDevServerHost();

  console.log('[API] Development mode - Detected Metro host:', host);

  if (host && host !== 'localhost' && host !== '127.0.0.1') {
    // Physical devices on same Wi-Fi should call the same host Metro came from.
    candidates.push(`http://${host}:3001`);
  }

  // Try adb reverse for physical devices (works if configured)
  if (host === 'localhost' || host === '127.0.0.1' || !host) {
    candidates.push('http://127.0.0.1:3001');
  }

  // Android emulator mapping
  candidates.push('http://10.0.2.2:3001');

  // Localhost fallback
  candidates.push('http://localhost:3001');

  return [...new Set(candidates)];
};

const requestWithFallback = async <T>(
  method: 'get' | 'post',
  path: string,
  payload?: unknown,
): Promise<T> => {
  const baseUrls = getCandidateBaseUrls();
  let latestError: unknown = null;

  console.log(`[API] Attempting ${method.toUpperCase()} ${path}`);
  console.log(`[API] Candidate URLs:`, baseUrls);

  for (const baseURL of baseUrls) {
    try {
      console.log(`[API] Trying: ${baseURL}${path}`);
      const response = await axios.request<T>({
        method,
        baseURL,
        url: path,
        data: payload,
        timeout: 10_000,
      });
      console.log(`[API] Success with: ${baseURL}`);
      return response.data;
    } catch (error: unknown) {
      latestError = error;
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Got a response from server with error status - throw immediately
          console.log(`[API] Server error from ${baseURL}:`, error.response.status);
          throw error;
        } else if (error.code) {
          // Network error - log and try next URL
          console.log(`[API] Network error with ${baseURL}:`, error.code);
        }
      }
      // Otherwise continue trying other URLs
    }
  }

  console.log(`[API] All URLs failed. Last error:`, latestError);
  throw latestError;
};

export const portfolioApi = {
  fetchHoldings: async (): Promise<Holding[]> => {
    return requestWithFallback<Holding[]>('get', '/api/portfolio');
  },

  addHolding: async (input: AddHoldingInput): Promise<Holding> => {
    return requestWithFallback<Holding>('post', '/api/portfolio', input);
  },
};
