/**
 * PWA Registration Service
 * Handles Service Worker registration and PWA notifications
 */

export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
      });
      console.log('Service Worker registered successfully:', registration);
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  } else {
    console.warn('Service Workers are not supported in this browser');
    return null;
  }
};

export const checkForUpdates = async () => {
  if ('serviceWorker' in navigator) {
    const registration = await navigator.serviceWorker.getRegistrations();
    registration.forEach((reg) => {
      reg.update();
    });
  }
};

export const installPrompt = () => {
  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install button/banner to user
    console.log('PWA can be installed');
    
    // You can dispatch an event or update state here
    window.dispatchEvent(new CustomEvent('pwaInstallPrompt', { detail: e }));
  });

  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    deferredPrompt = null;
  });

  return {
    prompt: async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        deferredPrompt = null;
      }
    }
  };
};

export const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    if (Notification.permission === 'granted') {
      return true;
    } else if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
  }
  return false;
};

export const sendNotification = (title, options = {}) => {
  if ('Notification' in window && Notification.permission === 'granted') {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(title, {
          icon: '/icon-192x192.png',
          badge: '/icon-192x192.png',
          ...options
        });
      });
    } else {
      new Notification(title, {
        icon: '/icon-192x192.png',
        badge: '/icon-192x192.png',
        ...options
      });
    }
  }
};

export const isPWAInstalled = () => {
  // Check if app is running in standalone mode (installed as PWA)
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone === true ||
         document.referrer.includes('android-app://');
};

export const getInstallationSource = () => {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return 'standalone';
  } else if (window.navigator.standalone === true) {
    return 'ios-standalone';
  } else if (document.referrer.includes('android-app://')) {
    return 'android';
  }
  return 'browser';
};

export default {
  registerServiceWorker,
  checkForUpdates,
  installPrompt,
  requestNotificationPermission,
  sendNotification,
  isPWAInstalled,
  getInstallationSource
};
