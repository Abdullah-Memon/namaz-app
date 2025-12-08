import React from "react";
import { getTranslation } from "../../utils/enums";

const BottomNav = ({ activeTab = 'home', onTabChange }) => {
  const tabs = [
    { id: 'home', label: getTranslation("NavigationLabels").home, icon: '🏠' },
    { id: 'qibla', label: getTranslation("NavigationLabels").qibla, icon: '🧭' },
    { id: 'tasbeeh', label: getTranslation("NavigationLabels").tasbeeh, icon: '📿' },
    // { id: 'more', label: 'More', icon: '☰' }
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 border-t z-50 backdrop-blur-sm"
      style={{ 
        backgroundColor: 'var(--color-card)', 
        borderColor: 'var(--color-border)',
        boxShadow: '0 -1px 3px 0 rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-around">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange?.(tab.id)}
            className="flex flex-col items-center gap-1 px-4 py-2 transition-all duration-200"
            style={{ 
              color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-secondary)'
            }}
          >
            <div 
              className="w-1.5 h-1.5 rounded-full transition-all duration-200" 
              style={{ 
                backgroundColor: activeTab === tab.id ? 'var(--color-primary)' : 'transparent'
              }}
            />
            <span className="text-base">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
