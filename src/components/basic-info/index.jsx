import { React, useState, useEffect } from "react";
import Dropdown from "../shared/dropdown";
import locationIcon from "../../assets/icons/location.svg";
import { getLanguages, saveLayoutDirection } from "../../utils/language";
import {
  getCitysByCountryCode,
  getCountryList,
} from "../../data/static/locations";
import { getImamList } from "../../utils/imam";
import {
  getPrayerMethods,
  defaultPrayerMethodForCountries,
} from "../../utils/prayer-methods";
import { getTranslation } from "../../utils/enums";
import { getGPSState, getDetectedCity, requestGPSLocation, GPS_STATUS } from "../../utils/gps";

const BasicInfoForm = ({ sessionValues }) => {
  const [formData, setFormData] = useState({
    lang: sessionValues.lang,
    country: sessionValues.country,
    city: sessionValues.city,
    imam: sessionValues.imam,
    method: sessionValues.method,
    school: sessionValues.school,
  });

  const [gpsState, setGpsState] = useState(getGPSState());
  const [isGpsLoading, setIsGpsLoading] = useState(false);

  // Update GPS state when component mounts or session values change
  useEffect(() => {
    setGpsState(getGPSState());
  }, [sessionValues]);

  const saveToSessionStorage = (updatedData) => {
    sessionStorage.setItem("info", JSON.stringify(updatedData));
    window.dispatchEvent(new Event("sessionValuesUpdated"));
  };

  const handleLanguageChange = (option) => {
    const updatedData = { ...formData, lang: option.value };
    setFormData(updatedData);
    saveLayoutDirection(option.value);
    saveToSessionStorage(updatedData);
  };

  const handleCountryChange = (option) => {
    // Get default method and imam for the selected country
    const defaultMethod =
      defaultPrayerMethodForCountries[option.value] || "karachi";
    const updatedData = {
      ...formData,
      country: option.value,
      city: null,
      method: defaultMethod,
    };
    setFormData(updatedData);
    saveToSessionStorage(updatedData);
  };

  const handleCityChange = (cityCode) => {
    const updatedData = { ...formData, city: cityCode };
    setFormData(updatedData);
    saveToSessionStorage(updatedData);
  };

  const handleGPSClick = async () => {
    if (isGpsLoading) return;
    
    setIsGpsLoading(true);
    try {
      const result = await requestGPSLocation();
      if (result.detectedCity) {
        handleCityChange(result.detectedCity);
        setGpsState(getGPSState());
      }
    } catch (error) {
      console.warn('GPS location failed:', error);
      setGpsState(getGPSState());
    } finally {
      setIsGpsLoading(false);
    }
  };

  const handleImamChange = (option) => {
    console.log("Imam changed to:", option.value);
    const updatedData = { ...formData, imam: option.value };
    setFormData(updatedData);
    saveToSessionStorage(updatedData);
  };

  const handleMethodChange = (option) => {
    const updatedData = { ...formData, method: option.value };
    setFormData(updatedData);
    saveToSessionStorage(updatedData);
  };

  return (
    <div className="px-6 py-4">
      <div className="space-y-4">
        {/* City Selection - Badge Style */}
        <div className="flex flex-col">
          <label className="block mb-2 text-xs font-semibold tracking-wider uppercase" style={{ color: 'var(--color-secondary)' }}>
            {getTranslation("CityLabel")}
          </label>
          <div className="flex flex-wrap gap-2">
            {/* GPS Badge */}
            <button
              onClick={handleGPSClick}
              disabled={isGpsLoading}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 border flex items-center gap-1.5`}
                  style={{
                    backgroundColor: (gpsState.status === GPS_STATUS.SUCCESS && formData.city === getDetectedCity()) 
                      ? 'var(--color-primary)' 
                      : 'var(--color-card)',
                    color: (gpsState.status === GPS_STATUS.SUCCESS && formData.city === getDetectedCity()) 
                      ? 'var(--color-button-text)' 
                      : 'var(--color-text)',
                    borderColor: (gpsState.status === GPS_STATUS.SUCCESS && formData.city === getDetectedCity()) 
                      ? 'var(--color-primary)' 
                      : (gpsState.status === GPS_STATUS.ERROR || gpsState.status === GPS_STATUS.DENIED) 
                        ? '#EF4444'
                        : 'var(--color-border)',
                    opacity: isGpsLoading ? 0.6 : 1,
                    cursor: isGpsLoading ? 'not-allowed' : 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    if (!isGpsLoading && !(gpsState.status === GPS_STATUS.SUCCESS && formData.city === getDetectedCity())) {
                      e.target.style.backgroundColor = 'var(--color-card-secondary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isGpsLoading && !(gpsState.status === GPS_STATUS.SUCCESS && formData.city === getDetectedCity())) {
                      e.target.style.backgroundColor = 'var(--color-card)';
                    }
                  }}
                >
                  {isGpsLoading ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <img 
                      src={locationIcon} 
                      alt="GPS" 
                      className="w-4 h-4" 
                      style={{ 
                        filter: (gpsState.status === GPS_STATUS.SUCCESS && formData.city === getDetectedCity()) 
                          ? 'brightness(0) invert(1)' 
                          : 'var(--icon-filter)'
                      }} 
                    />
                  )}
                  <span>
                    {isGpsLoading 
                      ? 'Detecting...' 
                      : gpsState.status === GPS_STATUS.SUCCESS && getDetectedCity()
                        ? 'GPS'
                        : gpsState.status === GPS_STATUS.DENIED
                          ? 'GPS Denied'
                          : gpsState.status === GPS_STATUS.ERROR
                            ? 'GPS Error'
                            : 'Use GPS'
                    }
                  </span>
                </button>
                
            {/* Regular City Badges */}
            {getCitysByCountryCode(formData.country).map((city, index) => (
              <button
                key={index}
                onClick={() => handleCityChange(city.value)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 border`}
                    style={{
                      backgroundColor: formData.city === city.value 
                        ? 'var(--color-primary)' 
                        : 'var(--color-card)',
                      color: formData.city === city.value 
                        ? 'var(--color-button-text)' 
                        : 'var(--color-text)',
                      borderColor: formData.city === city.value 
                        ? 'var(--color-primary)' 
                        : 'var(--color-border)'
                    }}
                    onMouseEnter={(e) => {
                      if (formData.city !== city.value) {
                        e.target.style.backgroundColor = 'var(--color-card-secondary)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (formData.city !== city.value) {
                        e.target.style.backgroundColor = 'var(--color-card)';
                      }
                    }}
                  >
                    {city.label}
                  </button>
            ))}
          </div>
        </div>

        {/* Imam Dropdown - Compact */}
        {/* <div className="flex flex-col">
          <label className="block mb-2 text-xs font-semibold tracking-wider uppercase" style={{ color: 'var(--color-secondary)' }}>
            {getTranslation("ImamLabel")}
          </label>
          <Dropdown
            options={getImamList()}
            preSelectOption={formData.imam}
            onSelect={handleImamChange}
            searchable={false}
          />
        </div> */}
      </div>
    </div>
  );
};

export default BasicInfoForm;
