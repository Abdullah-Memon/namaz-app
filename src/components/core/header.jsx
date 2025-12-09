import React, { useState, useEffect } from "react";
import { getTranslation } from "../../utils/enums";
import { toggleTheme, getCurrentTheme, THEMES } from "../../utils/toggle-theme";
import { getCityByCityCode, defaultCity } from "../../data/static/locations";
import { getLanguages, getCurrentLanguage, saveLayoutDirection } from "../../utils/language";
import sunIcon from "../../assets/icons/sun.svg";
import moonIcon from "../../assets/icons/moon.svg";

const Header = ({ sessionValues }) => {
  const [currentTheme, setCurrentTheme] = useState(getCurrentTheme());
  const [currentLanguage, setCurrentLanguage] = useState(getCurrentLanguage());
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const cityData = getCityByCityCode(sessionValues?.city) || getCityByCityCode(defaultCity);
  const languages = getLanguages().languages;

  useEffect(() => {
    setCurrentTheme(getCurrentTheme());
  }, []);

  const handleThemeToggle = () => {
    const newTheme = toggleTheme();
    setCurrentTheme(newTheme);
  };

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang.value);
    saveLayoutDirection(lang.value);
    
    // Update session storage
    const info = sessionStorage.getItem("info") ? JSON.parse(sessionStorage.getItem("info")) : {};
    info.lang = lang.value;
    sessionStorage.setItem("info", JSON.stringify(info));
    
    // Dispatch event to notify other components of language change
    window.dispatchEvent(new Event("sessionValuesUpdated"));
    setShowLanguageDropdown(false);
  };

  const themeIcon = currentTheme === THEMES.DARK ? sunIcon : moonIcon;
  const currentLanguageData = languages.find(lang => lang.value === currentLanguage);

  return (
    <header 
      className="border-b sticky top-0 z-50 backdrop-blur-sm" 
      style={{ 
        borderColor: 'var(--color-border)', 
        backgroundColor: 'var(--color-card)',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 
            className="text-2xl font-bold" 
            style={{ 
              color: 'var(--color-text)',
              fontFamily: 'var(--font-family-heading)'
            }}
          >
            {getTranslation('AppName')}
          </h1>
        </div>

        {/* Controls Section */}
        <div className="flex items-center gap-3">
          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium flex items-center gap-2"
              style={{ 
                backgroundColor: 'var(--color-card-secondary)',
                color: 'var(--color-text)',
                border: `1px solid var(--color-border)`
              }}
              aria-label="Select language"
            >
              <span>{currentLanguageData?.label || 'EN'}</span>
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${showLanguageDropdown ? 'rotate-180' : ''}`}
                style={{ color: 'var(--color-primary)' }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>

            {/* Language Dropdown Menu */}
            {showLanguageDropdown && (
              <div
                className="absolute top-full -right-8 mt-2 w-48 rounded-lg shadow-lg z-10"
                style={{
                  backgroundColor: 'var(--color-card)',
                  border: `1px solid var(--color-border)`,
                  // direction: 'var(--direction)'
                }}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.value}
                    onClick={() => handleLanguageChange(lang)}
                    className="w-full px-4 py-3 text-left transition-colors duration-200 flex items-center justify-between"
                    style={{
                      backgroundColor: currentLanguage === lang.value ? 'var(--color-card-secondary)' : 'transparent',
                      color: currentLanguage === lang.value ? 'var(--color-primary)' : 'var(--color-text)',
                      borderBottom: lang.value !== languages[languages.length - 1].value ? `1px solid var(--color-border)` : 'none'
                    }}
                  >
                    <span className="font-medium">{lang.label}</span>
                    {currentLanguage === lang.value && (
                      <span style={{ color: 'var(--color-primary)' }}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={handleThemeToggle}
            className="p-2.5 rounded-lg transition-all duration-200 hover:scale-110"
            style={{ 
              backgroundColor: 'var(--color-card-secondary)', 
              color: 'var(--color-primary)',
              border: `1px solid var(--color-border)`
            }}
            aria-label="Toggle theme"
          >
            <img src={themeIcon} alt="Theme" className="w-5 h-5" style={{ filter: 'var(--icon-filter)' }} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
