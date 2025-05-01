
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "com.toolmaster.app",
  appName: "ToolMaster",
  webDir: "dist",
  bundledWebRuntime: false,
  server: {
    androidScheme: "https"
  },
  android: {
    buildOptions: {
      keystorePath: "release.keystore",
      keystoreAlias: "key0",
      keystorePassword: "android",
      keystoreAliasPassword: "android"
    }
  }
};

export default config;
