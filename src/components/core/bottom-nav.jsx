import React from "react";
import { getTranslation } from "../../utils/enums";
import homeIcon from "../../assets/icons/Time.svg";
import compassIcon from "../../assets/icons/Compass.svg";
import tasbeehIcon from "../../assets/icons/Tasbih.svg";
import { Features } from "../../utils/constant";

const BottomNav = ({ activeTab = "home", onTabChange }) => {
  const tabs = [
    {
      id: "home",
      label: getTranslation("NavigationLabels").home,
      icon: homeIcon,
      title: "Home",
    },
    {
      id: "qibla",
      label: getTranslation("NavigationLabels").qibla,
      icon: compassIcon,
      title: "Compass",
    },
    {
      id: "tasbeeh",
      label: getTranslation("NavigationLabels").tasbeeh,
      icon: tasbeehIcon,
      title: "Tasbeeh",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <section
        className="flex items-center justify-center gap-0  w-full px-0 py-3 shadow-lg"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-card)",
          boxShadow: "0 -1px 3px 0 rgba(0, 0, 0, 0.1)",
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          if(Features.TasbeehCounter === false && tab.id === 'tasbeeh') {
            return null;
          }

          if(Features.QiblaDirection === false && tab.id === 'qibla') {
            return null;
          }

          if(Features.PrayerTimes === false && tab.id === 'home') {
            return null;
          }

          if(Features.Compass === false && tab.id === 'qibla') {
            return null;
          }

          if(Features.ARCompass === false && tab.id === 'qibla') {
            return null;
          }

          if(Features.QuranVerses === false && tab.id === 'quran') {
            return null;
          }

          return (
            <label
              key={tab.id}
              title={tab.title}
              htmlFor={tab.id}
              className="relative flex-1  text-center flex flex-col items-center justify-center px-4 py-2 cursor-pointer transition-all duration-200 group"
            >
              <input
                id={tab.id}
                name="page"
                type="radio"
                checked={isActive}
                onChange={() => onTabChange?.(tab.id)}
                className="hidden"
              />

              {/* Underline animation */}
              {/* <div
                className={`absolute bottom-1 left-1/2 h-0.5 bg-orange-500 rounded transition-all duration-200  ${
                  isActive ? 'w-full -translate-x-1/2' : 'w-0 -translate-x-1/2'
                }`}
              /> */}

              {/* Icon */}
              <img
                src={tab.icon}
                alt={tab.title}
                className={`w-5 h-5 transition-all duration-300 ${
                  isActive
                    ? "scale-125 -translate-y-1"
                    : "group-hover:opacity-60"
                }`}
                style={{
                  filter: isActive
                    ? "brightness(0) saturate(100%) invert(57%) sepia(81%) saturate(3279%) hue-rotate(3deg) brightness(101%) contrast(101%)"
                    : "brightness(0) saturate(100%) invert(69%) sepia(3%) saturate(600%) hue-rotate(178deg) brightness(97%) contrast(89%)",
                }}
              />

              {/* Label */}
              <span
                className={`mt-1 text-xs font-medium block transition-all duration-300 ${
                  isActive
                    ? "text-orange-500"
                    : "text-gray-400 group-hover:text-gray-200"
                }`}
              >
                {tab.label}
              </span>
            </label>
          );
        })}
      </section>
    </nav>
  );
};

export default BottomNav;
