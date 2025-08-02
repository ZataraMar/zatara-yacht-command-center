import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Network } from '@capacitor/network';
import { Camera } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { PushNotifications } from '@capacitor/push-notifications';

export const useCapacitor = () => {
  const [isNative, setIsNative] = useState(false);
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline'>('online');

  useEffect(() => {
    const initializeCapacitor = async () => {
      setIsNative(Capacitor.isNativePlatform());

      if (Capacitor.isNativePlatform()) {
        // Set up status bar
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setBackgroundColor({ color: '#1e3a8a' });

        // Hide splash screen
        await SplashScreen.hide();

        // Initialize push notifications
        await initializePushNotifications();

        // Monitor network status
        Network.addListener('networkStatusChange', status => {
          setNetworkStatus(status.connected ? 'online' : 'offline');
        });

        const status = await Network.getStatus();
        setNetworkStatus(status.connected ? 'online' : 'offline');
      }
    };

    initializeCapacitor();
  }, []);

  const initializePushNotifications = async () => {
    try {
      // Request permission
      await PushNotifications.requestPermissions();

      // Register for push notifications
      await PushNotifications.register();

      // Listen for registration
      PushNotifications.addListener('registration', token => {
        console.log('Push registration success, token: ' + token.value);
      });

      // Listen for push notifications
      PushNotifications.addListener('pushNotificationReceived', notification => {
        console.log('Push notification received: ', notification);
      });

      PushNotifications.addListener('pushNotificationActionPerformed', notification => {
        console.log('Push notification action performed', notification.actionId, notification.inputValue);
      });
    } catch (error) {
      console.error('Error initializing push notifications:', error);
    }
  };

  const takePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: 'uri' as any
      });
      return image.webPath;
    } catch (error) {
      console.error('Error taking photo:', error);
      return null;
    }
  };

  const getCurrentPosition = async () => {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      return {
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude
      };
    } catch (error) {
      console.error('Error getting location:', error);
      return null;
    }
  };

  return {
    isNative,
    networkStatus,
    takePhoto,
    getCurrentPosition
  };
};