import React, { useState, useEffect } from "react";

import BasicInfoForm from "./components/basic-info";
import Prayer from "./components/prayer";
import Events from "./components/events";
import Compass from "./components/compass";
import Quran from "./components/quran";
import ArCompass from "./components/compass/ar-compass";

import AppWrapper from "./components/core/app-wrapper";

import { defaultCity, defaultCountry } from "./data/static/locations";
import { defaultImamForCountries } from "./utils/imam";
import { defaultLanguage } from "./utils/language";
import { defaultPrayerMethodForCountries } from "./utils/prayer-methods";

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

  return (
    <AppWrapper>
      <BasicInfoForm sessionValues={sessionValues} />
      <Prayer sessionValues={sessionValues} />
      <Events />
      {/* <Compass />
      <ArCompass /> */}
      <Quran />
    </AppWrapper>
  );
};

export default App;
