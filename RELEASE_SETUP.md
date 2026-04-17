# Release Build Setup Guide

This guide will help you configure the app to connect to the mock server when using a release APK.

## Problem

When running the app in development mode, it automatically detects the server URL. However, in release builds (like `app-release.apk`), the development tools aren't available, so you need to manually configure the server URL.

## Solution

### Step 1: Find Your Computer's Local IP Address

**On macOS:**
```bash
ipconfig getifaddr en0
```

**On Windows:**
```bash
ipconfig
```
Look for "IPv4 Address" under your active network adapter.

**On Linux:**
```bash
ip addr show
```

Example: Your IP might be something like `192.168.1.100` or `10.0.0.5`

### Step 2: Update the API Configuration

1. Open `src/config/api.ts`
2. Replace the IP address in `RELEASE_API_URL` with your computer's IP:

```typescript
export const RELEASE_API_URL = 'http://YOUR_IP_HERE:3001';
```

For example:
```typescript
export const RELEASE_API_URL = 'http://192.168.1.100:3001';
```

### Step 3: Rebuild the Release APK

```bash
cd android
./gradlew assembleRelease
```

The new APK will be at: `android/app/build/outputs/apk/release/app-release.apk`

### Step 4: Start the Mock Server

Make sure the mock server is running on your computer:

```bash
cd mock-server
npm install  # if you haven't already
npm start
```

You should see:
```
Mock API running at http://localhost:3001
Also accessible via your local network IP on port 3001
For Android emulator, use: http://10.0.2.2:3001
```

### Step 5: Install and Test

1. Install the new APK on your Android device
2. Make sure your device is on the same Wi-Fi network as your computer
3. Open the app - it should now connect to your server!

## Alternative: Using ngrok (for remote testing)

If you need to test the app when not on the same network:

1. Install ngrok: https://ngrok.com/
2. Start ngrok tunnel:
   ```bash
   ngrok http 3001
   ```
3. Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`)
4. Update `RELEASE_API_URL` in `src/config/api.ts`:
   ```typescript
   export const RELEASE_API_URL = 'https://abc123.ngrok.io';
   ```
5. Rebuild the APK

## Troubleshooting

**App shows "Failed to load data":**
- Verify the mock server is running
- Check that the IP address in `src/config/api.ts` is correct
- Make sure your phone and computer are on the same Wi-Fi network
- Try pinging your computer from your phone to verify network connectivity
- Check your firewall isn't blocking port 3001

**"Add holding" not working:**
- Make sure you fill in all required fields (Ticker, Quantity, Purchase Price)
- Ticker must be 2-5 uppercase letters
- Quantity must be a positive integer
- Purchase price must be a positive number with at most 2 decimal places

**Can't connect even with correct IP:**
- Some Wi-Fi networks (especially public ones) block device-to-device communication
- Try using ngrok as described above
- Check if your computer's firewall is blocking incoming connections on port 3001
