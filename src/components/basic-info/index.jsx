import { React, useState } from "react";
import Dropdown from "../shared/dropdown";

import { getLanguages, saveLayoutDirection } from "../../utils/language";
import {
  getCitysByCountryCode,
  getCountryList,
  defaultCity,
  defaultCountry,
} from "../../data/static/locations";
import { defaultImam, getImamList } from "../../utils/imam";
import { getTranslation } from "../../utils/enums";

const BasicInfoForm = () => {

  const sessionValues = JSON.parse(sessionStorage.getItem("info")) || {};

  const [formData, setFormData] = useState({
    lang: sessionValues.lang || getLanguages().defaultLanguage,
    country: sessionValues.country || defaultCountry,
    city: sessionValues.city || defaultCity,
    imam: sessionValues.imam || defaultImam,
  });

  const saveToSessionStorage = (updatedData) => {
    sessionStorage.setItem("info", JSON.stringify(updatedData));
  };

  const handleLanguageChange = (option) => {
    const updatedData = { ...formData, lang: option.value };
    setFormData(updatedData);
    saveLayoutDirection(option.value);
    saveToSessionStorage(updatedData);
  };

  const handleCountryChange = (option) => {
    const updatedData = { ...formData, country: option.value, city: null };
    setFormData(updatedData);
    saveToSessionStorage(updatedData);
  };

  const handleCityChange = (option) => {
    const updatedData = { ...formData, city: option.value };
    setFormData(updatedData);
    saveToSessionStorage(updatedData);
  };

  const handleImamChange = (option) => {
    const updatedData = { ...formData, imam: option.value };
    setFormData(updatedData);
    saveToSessionStorage(updatedData);
  };

  return (
    <div className="module">
      <div className="max-w-7xl mx-auto">
        {/* <div className="">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">{getTranslation('basicInfoTitle')}</h1>
        </div> */}

        <div className="p-8">
          {/* 1x4 Grid Layout */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Language Dropdown */}
            <div className="flex flex-col">
              <Dropdown
                label={getTranslation('LanguageLabel')}
                options={getLanguages().languages}
                preSelectOption={formData.lang}
                onSelect={handleLanguageChange}
              />
            </div>

            {/* Country Dropdown */}
            <div className="flex flex-col">
              <Dropdown
                label={getTranslation('CountryLabel')}
                options={getCountryList()}
                preSelectOption={formData.country}
                onSelect={handleCountryChange}
              />
            </div>

            {/* City Dropdown */}
            <div className="flex flex-col">
              <Dropdown
                label={getTranslation('CityLabel')}
                options={getCitysByCountryCode(formData.country)}
                preSelectOption={formData.city}
                onSelect={handleCityChange}
              />
            </div>

            {/* Imam Dropdown */}
            <div className="flex flex-col">
              <Dropdown
                label={getTranslation('ImamLabel')}
                options={getImamList()}
                preSelectOption={formData.imam}
                onSelect={handleImamChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoForm;
