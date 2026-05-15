import type { CapacitorConfig } from "@capacitor/cli";

// Android/iOS shell config for packaging the web build as a native app.
// To build an APK, see README-android.md.
const config: CapacitorConfig = {
  appId: "com.engineerstechbd.earabicquran",
  appName: "e-Arabicquran",
  webDir: "dist",
  bundledWebRuntime: false,
  android: {
    allowMixedContent: false,
  },
  server: {
    androidScheme: "https",
  },
};

export default config;
