# Build e-Arabicquran as an Android APK

This project ships with a Capacitor config so you can wrap the web build as a
native Android app and produce an installable APK.

## One-time setup (on your computer)

You need:

- Node.js 20+ and `bun` (or `npm`)
- Java JDK 17
- Android Studio (gives you the Android SDK + emulator)
- The `ANDROID_HOME` environment variable pointing to your Android SDK

Install the Capacitor CLI + Android platform:

```bash
bun add -d @capacitor/cli
bun add @capacitor/core @capacitor/android
```

Initialize the Android project once:

```bash
bunx cap add android
```

This creates an `android/` folder. Commit it.

## Build a fresh APK

Every time you want a new APK:

```bash
# 1. Build the web app
bun run build

# 2. Copy the build into the Android project
bunx cap sync android

# 3. Open in Android Studio…
bunx cap open android
#    …then Build → Build Bundle(s) / APK(s) → Build APK(s).
#    The APK will be in android/app/build/outputs/apk/
```

Or, fully from the command line:

```bash
cd android && ./gradlew assembleDebug
# Output: android/app/build/outputs/apk/debug/app-debug.apk
```

## App identity

- **App ID:** `com.engineerstechbd.earabicquran`
- **App name:** e-Arabicquran
- Edit these in `capacitor.config.ts` before `cap add android` if you want
  different values; otherwise change them inside Android Studio later.

## Notes

- The PWA manifest + service worker also work in Chrome on Android; users can
  "Add to Home Screen" without installing the APK.
- Audio uses the public everyayah.com CDN; the service worker caches each
  ayah after the first play, so re-listening works offline.
- Browser TTS (`speechSynthesis`) is used for letter / word audio. On
  Android WebView this falls back to the system voice if `ar-SA` isn't
  available.
