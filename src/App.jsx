import React, { useState, useEffect } from "react";

import BasicInfoForm from "./components/basic-info";
import Prayer from "./components/prayer";
import Events from "./components/events";
import Compass from "./components/compass";
import Quran from "./components/quran";
import Tasbeeh from "./components/tasbeeh";

import AppWrapper from "./components/core/app-wrapper";

import { defaultCity, defaultCountry } from "./data/static/locations";
import { defaultImamForCountries } from "./utils/imam";
import { defaultLanguage } from "./utils/language";
import { defaultPrayerMethodForCountries } from "./utils/prayer-methods";
import { initializeGPS, isGPSSupported } from "./utils/gps";
import { Features } from "./utils/constant";

const App = () => {
  const getInitialSessionValues = () => {
    const stored = JSON.parse(sessionStorage.getItem("info"));
    if (stored) return stored;

    const defaultValues = {
      lang: defaultLanguage,
      country: defaultCountry,
      city: defaultCity,
      imam: defaultImamForCountries[defaultCountry],
      method: defaultPrayerMethodForCountries[defaultCountry],
      school: 0,
    };
    sessionStorage.setItem("info", JSON.stringify(defaultValues));
    return defaultValues;
  };

  const [sessionValues, setSessionValues] = useState(getInitialSessionValues());

  // Initialize GPS on app load
  useEffect(() => {
    const initGPS = async () => {
      if (isGPSSupported()) {
        try {
          const result = await initializeGPS();
          if (result.detectedCity && !result.fromCache) {
            console.log('GPS detected city:', result.detectedCity);
            // Trigger session values update
            const stored = JSON.parse(sessionStorage.getItem('info'));
            if (stored) {
              setSessionValues(stored);
            }
          }
        } catch (error) {
          console.warn('GPS initialization failed:', error);
        }
      }
    };

    // Initialize GPS after a short delay to allow UI to load first
    const timeoutId = setTimeout(initGPS, 1000);
    
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = JSON.parse(sessionStorage.getItem("info"));
      if (stored) {
        setSessionValues(stored);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("sessionValuesUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("sessionValuesUpdated", handleStorageChange);
    };
  }, []);

  const [activeTab, setActiveTab] = useState('home');

  // Listen for tab changes
  useEffect(() => {
    const handleTabChange = (e) => {
      setActiveTab(e.detail);
    };
    window.addEventListener('changeTab', handleTabChange);
    return () => window.removeEventListener('changeTab', handleTabChange);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <BasicInfoForm sessionValues={sessionValues} />
            {Features.PrayerTimes && <Prayer sessionValues={sessionValues} />}
          </>
        );
      case 'qibla':
        return Features.QiblaDirection ? <Compass sessionValues={sessionValues} /> : null;
      case 'quran':
        return Features.QuranVerses ? <Quran /> : null;
      case 'tasbeeh':
        return Features.TasbeehCounter ? <Tasbeeh /> : null;
      default:
        return null;
    }
  };

  return (
    <AppWrapper 
      sessionValues={sessionValues} 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
    >
      {renderContent()}
    </AppWrapper>
  );
};

export default App;
