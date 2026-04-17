/**
 * API Configuration
 *
 * HOW TO FIND YOUR IP ADDRESS:
 * - macOS: Run `ipconfig getifaddr en0` in Terminal
 * - Windows: Run `ipconfig` in Command Prompt, look for IPv4 Address
 * - Linux: Run `ip addr show` in Terminal
 *
 * TROUBLESHOOTING CONNECTION ISSUES:
 * If you see "Failed to load data" or network errors:
 * 1. Make sure the mock server is running: `cd mock-server && npm start`
 * 2. Find your IP address (see above)
 * 3. Set DEV_MODE_OVERRIDE below to your IP
 * 4. Reload the app
 */

/**
 * DEVELOPMENT MODE OVERRIDE
 * If auto-detection fails, set your computer's IP here.
 * This is used in BOTH dev and release builds when set.
 * Set to null to use auto-detection.
 */
export const DEV_MODE_OVERRIDE: string | null = 'http://10.10.10.63:3001';
// Examples:
// - Physical device on same Wi-Fi: 'http://10.10.10.63:3001'
// - Android emulator with adb: 'http://10.0.2.2:3001'
// - With ngrok: 'https://abc123.ngrok.io'
// - Auto-detect (set to null): null

/**
 * RELEASE BUILD URL
 * This is ONLY used in release builds when DEV_MODE_OVERRIDE is null.
 * Set this to your computer's IP or ngrok URL.
 */
export const RELEASE_API_URL = 'http://10.10.10.63:3001';
