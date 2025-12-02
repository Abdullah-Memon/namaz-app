import React, { useState, useEffect } from "react";
import Button from "../shared/btn";
import Dropdown from "../shared/dropdown";
import { getTranslation } from "../../utils/enums";
import { toggleTheme, getCurrentTheme, THEMES } from "../../utils/toggle-theme";
import { getLanguages, saveLayoutDirection, getCurrentLanguage } from "../../utils/language";

const Header = () => {
  const [currentTheme, setCurrentTheme] = useState(getCurrentTheme());
  const [currentLang, setCurrentLang] = useState(getCurrentLanguage());

  useEffect(() => {
    setCurrentTheme(getCurrentTheme());
    setCurrentLang(getCurrentLanguage());
  }, []);

  const handleThemeToggle = () => {
    const newTheme = toggleTheme();
    setCurrentTheme(newTheme);
  };

  const handleLanguageChange = (option) => {
    setCurrentLang(option.value);
    saveLayoutDirection(option.value);
    
    // Update session storage
    const currentInfo = sessionStorage.getItem("info") 
      ? JSON.parse(sessionStorage.getItem("info")) 
      : {};
    const updatedInfo = { ...currentInfo, lang: option.value };
    sessionStorage.setItem("info", JSON.stringify(updatedInfo));
    window.dispatchEvent(new Event("sessionValuesUpdated"));
    
    // Reload page to apply language changes
    window.location.reload();
  };

  const themeIcon = currentTheme === THEMES.DARK ? '☀️' : '🌙';
  const themeText = currentTheme === THEMES.DARK ? 'Light' : 'Dark';

  return (
    <header className="border-b" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-background)' }}>
      <div className="container flex items-center justify-between px-6 py-4 mx-auto">
        <div>
          <h1 className="text-5xl">{getTranslation('AppName')}</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="min-w-[120px]">
            <Dropdown
              options={getLanguages().languages}
              preSelectOption={currentLang}
              onSelect={handleLanguageChange}
              placeholder="Language"
              searchable={false}
            />
          </div>
          <Button 
            title={themeText}
            iconStart={<span className="text-lg">{themeIcon}</span>}
            onClick={handleThemeToggle}
            tooltip={`Switch to ${themeText} mode`}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
