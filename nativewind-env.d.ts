/// <reference types="nativewind/types" />

// CSS side-effect imports (used by NativeWind global.css)
declare module '*.css' {}

// process.env is provided by Metro/Expo at build time
declare const process: { env: Record<string, string | undefined> };
