import React, { useState } from 'react';
import CompassV2 from './compass-v2';
import ArCompass from './ar-compass';
import { getTranslation } from '../../utils/enums';

const Compass = ({ sessionValues }) => {
  const [activeTab, setActiveTab] = useState('traditional');
  const [isArActive, setIsArActive] = useState(false);

  return (
    <div style={{ backgroundColor: 'var(--color-background)', fontFamily: 'var(--font-family-regular)' }}>
      {/* Header Section */}
      <div className="px-6 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-family-heading)' }}>
              {getTranslation('CompassTitle')}
            </h1>
            <p className="text-sm max-w-7xl mx-auto leading-relaxed" style={{ color: 'var(--color-secondary)' }}>
              {getTranslation('CompassDescription')}
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6">
            <div className="flex flex-1 rounded-xl p-1" style={{ backgroundColor: 'var(--color-card-secondary)', border: '1px solid var(--color-border)' }}>
              <button
                onClick={() => setActiveTab('traditional')}
                className={`flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200`}
                style={{
                  backgroundColor: activeTab === 'traditional' ? 'var(--color-primary)' : 'transparent',
                  color: activeTab === 'traditional' ? 'var(--color-button-text)' : 'var(--color-text)'
                }}
              >
                {getTranslation('CompassTraditionalTab')}
              </button>
              
              <button
                onClick={() => setActiveTab('ar')}
                className={`flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200`}
                style={{
                  backgroundColor: activeTab === 'ar' ? 'var(--color-primary)' : 'transparent',
                  color: activeTab === 'ar' ? 'var(--color-button-text)' : 'var(--color-text)'
                }}
              >
                {getTranslation('CompassARTab')}
              </button>
            </div>
          </div>

          {/* Quick Access Buttons */}
          {/* <div className="flex flex-wrap gap-2 justify-center">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
              <span className="text-sm">📍</span>
              <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>GPS</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
              <span className="text-sm">🎯</span>
              <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>Precise</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ backgroundColor: 'var(--color-card-secondary)' }}>
              <span className="text-sm">⚡</span>
              <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>Real-time</span>
            </div>
          </div> */}
        </div>
      </div>

      {/* Dynamic Content Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ 
            backgroundImage: `radial-gradient(circle at 25% 25%, var(--color-primary) 0%, transparent 50%), 
                              radial-gradient(circle at 75% 75%, var(--color-primary) 0%, transparent 50%)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>

        {/* Active Component */}
        <div className="relative z-10">
          <div className={`transition-all duration-700 ease-in-out transform ${
            activeTab === 'traditional' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none absolute inset-0'
          }`}>
            {activeTab === 'traditional' && <CompassV2 sessionValues={sessionValues} />}
          </div>
          
          {/* AR Mode Button */}
          {activeTab === 'ar' && !isArActive && (
            <div className="flex items-center justify-center py-12">
              <button
                onClick={() => setIsArActive(true)}
                className="px-8 py-4 rounded-2xl font-bold text-base transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-button-text)'
                }}
              >
                🚀 {getTranslation('CompassARTab')}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer Information */}
      <div className="px-6 py-8">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xl mb-1">🕌</div>
            <p className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>
              {getTranslation('CompassExtraText').footer1.title}
            </p>
          </div>
          <div>
            <div className="text-xl mb-1">🔄</div>
            <p className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>
              {getTranslation('CompassExtraText').footer2.title}
            </p>
          </div>
          <div>
            <div className="text-xl mb-1">✨</div>
            <p className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>
              {getTranslation('CompassExtraText').footer3.title}
            </p>
          </div>
        </div>
      </div>
      
      {/* AR Compass - Renders outside container */}
      {isArActive && (
        <ArCompass 
          sessionValues={sessionValues} 
          onClose={() => setIsArActive(false)}
        />  
      )}
    </div>
  );
};

export default Compass;
