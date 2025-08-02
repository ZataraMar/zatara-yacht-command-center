import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.d73138869c5d49538a7c210a860cadae',
  appName: 'Zatara Yacht Command Center',
  webDir: 'dist',
  server: {
    url: 'https://d7313886-9c5d-4953-8a7c-210a860cadae.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1e3a8a',
      showSpinner: false
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#1e3a8a'
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    }
  }
};

export default config;