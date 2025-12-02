// GPS utility for location detection and city matching
import { getCitysByCountryCode, defaultCity, defaultCountry } from '../data/static/locations';
import { getCurrentLanguage } from './language';

// GPS status constants
export const GPS_STATUS = {
  IDLE: 'idle',
  REQUESTING: 'requesting', 
  SUCCESS: 'success',
  ERROR: 'error',
  DENIED: 'denied',
  UNAVAILABLE: 'unavailable'
};

// Store GPS state
let gpsState = {
  status: GPS_STATUS.IDLE,
  position: null,
  detectedCity: null,
  error: null
};

// Calculate distance between two coordinates using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Find nearest city based on GPS coordinates
const findNearestCity = (latitude, longitude) => {
  const cities = getCitysByCountryCode(defaultCountry);
  let nearestCity = null;
  let minDistance = Infinity;

  // Get city data with coordinates from locations
  const { getCityByCityCode } = require('../data/static/locations');
  
  cities.forEach(city => {
    const cityData = getCityByCityCode(city.value);
    if (cityData && cityData.lat && cityData.lng) {
      const distance = calculateDistance(
        latitude, longitude,
        cityData.lat, cityData.lng
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        nearestCity = city.value;
      }
    }
  });

  return { cityCode: nearestCity, distance: minDistance };
};

// Request GPS location
export const requestGPSLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      gpsState.status = GPS_STATUS.UNAVAILABLE;
      gpsState.error = 'Geolocation is not supported by this browser.';
      reject(gpsState.error);
      return;
    }

    gpsState.status = GPS_STATUS.REQUESTING;

    const options = {
      enableHighAccuracy: true,
      timeout: 10000, // 10 seconds
      maximumAge: 300000 // 5 minutes
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        gpsState.status = GPS_STATUS.SUCCESS;
        gpsState.position = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy
        };
        
        // Find nearest city
        const nearestCity = findNearestCity(
          position.coords.latitude,
          position.coords.longitude
        );
        
        gpsState.detectedCity = nearestCity.cityCode;
        
        // Save to session storage
        const currentInfo = sessionStorage.getItem('info') 
          ? JSON.parse(sessionStorage.getItem('info')) 
          : {};
        
        const updatedInfo = { 
          ...currentInfo, 
          gpsCity: nearestCity.cityCode,
          gpsCoords: gpsState.position,
          gpsDetected: true
        };
        
        sessionStorage.setItem('info', JSON.stringify(updatedInfo));
        sessionStorage.setItem('gpsData', JSON.stringify(gpsState));
        
        resolve({
          position: gpsState.position,
          detectedCity: nearestCity.cityCode,
          distance: nearestCity.distance
        });
      },
      (error) => {
        switch(error.code) {
          case error.PERMISSION_DENIED:
            gpsState.status = GPS_STATUS.DENIED;
            gpsState.error = 'Location access denied by user.';
            break;
          case error.POSITION_UNAVAILABLE:
            gpsState.status = GPS_STATUS.UNAVAILABLE;
            gpsState.error = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            gpsState.status = GPS_STATUS.ERROR;
            gpsState.error = 'Location request timed out.';
            break;
          default:
            gpsState.status = GPS_STATUS.ERROR;
            gpsState.error = 'An unknown error occurred.';
        }
        reject(gpsState.error);
      },
      options
    );
  });
};

// Get current GPS state
export const getGPSState = () => {
  // Try to load from session storage
  const savedGpsData = sessionStorage.getItem('gpsData');
  if (savedGpsData) {
    try {
      const parsed = JSON.parse(savedGpsData);
      gpsState = { ...gpsState, ...parsed };
    } catch (e) {
      console.warn('Failed to parse saved GPS data:', e);
    }
  }
  return { ...gpsState };
};

// Get detected city from GPS
export const getDetectedCity = () => {
  const currentInfo = sessionStorage.getItem('info');
  if (currentInfo) {
    try {
      const parsed = JSON.parse(currentInfo);
      return parsed.gpsCity || null;
    } catch (e) {
      console.warn('Failed to parse session info for GPS city:', e);
    }
  }
  return null;
};

// Initialize GPS on app load
export const initializeGPS = async () => {
  // Check if GPS was already detected in this session
  const currentInfo = sessionStorage.getItem('info');
  if (currentInfo) {
    try {
      const parsed = JSON.parse(currentInfo);
      if (parsed.gpsDetected && parsed.gpsCity) {
        gpsState.status = GPS_STATUS.SUCCESS;
        gpsState.detectedCity = parsed.gpsCity;
        return { detectedCity: parsed.gpsCity, fromCache: true };
      }
    } catch (e) {
      console.warn('Failed to parse session info for GPS initialization:', e);
    }
  }

  // Request fresh GPS location
  try {
    const result = await requestGPSLocation();
    return { ...result, fromCache: false };
  } catch (error) {
    console.warn('GPS initialization failed:', error);
    return { error, fromCache: false };
  }
};

// Check if GPS is supported
export const isGPSSupported = () => {
  return 'geolocation' in navigator;
};

// Clear GPS data
export const clearGPSData = () => {
  gpsState = {
    status: GPS_STATUS.IDLE,
    position: null,
    detectedCity: null,
    error: null
  };
  
  sessionStorage.removeItem('gpsData');
  
  // Remove GPS data from info but keep other data
  const currentInfo = sessionStorage.getItem('info');
  if (currentInfo) {
    try {
      const parsed = JSON.parse(currentInfo);
      delete parsed.gpsCity;
      delete parsed.gpsCoords;
      delete parsed.gpsDetected;
      sessionStorage.setItem('info', JSON.stringify(parsed));
    } catch (e) {
      console.warn('Failed to clear GPS data from session info:', e);
    }
  }
};