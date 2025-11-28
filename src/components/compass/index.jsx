import React, { useState, useEffect } from 'react';
import { getCityByCityCode, defaultCity } from "../../data/static/locations";

const Compass = ({ sessionValues }) => {
  const [qiblaBearing, setQiblaBearing] = useState(0);        // Fixed bearing from North
  const [deviceHeading, setDeviceHeading] = useState(null);   // What direction phone is facing - null until first reading
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const KAABA_LAT = 21.422507;
  const KAABA_LNG = 39.826206;

  const cityData = getCityByCityCode(sessionValues?.city) || getCityByCityCode(defaultCity);

  // Accurate Qibla bearing calculation
  const calculateQibla = (lat, lng) => {
    const φK = KAABA_LAT * Math.PI / 180;
    const λK = KAABA_LNG * Math.PI / 180;
    const φ = lat * Math.PI / 180;
    const λ = lng * Math.PI / 180;

    const y = Math.sin(λK - λ);
    const x = Math.cos(φ) * Math.tan(φK) - Math.sin(φ) * Math.cos(λK - λ);

    let angle = Math.atan2(y, x) * 180 / Math.PI;
    return (angle + 360) % 360;
  };

  // Get accurate heading (True North) — works on iOS & Android
  useEffect(() => {
    const handleOrientation = (event) => {
      let heading = 0;

      if (event.webkitCompassHeading !== undefined) {
        // iOS - webkitCompassHeading gives true heading
        heading = event.webkitCompassHeading;
      } else if (event.alpha !== null) {
        // Android - alpha gives rotation from north (0-360)
        heading = event.alpha;
      }

      setDeviceHeading(Math.round(heading));
    };

    const startCompass = () => {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
          .then(res => {
            if (res === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation);
            }
          })
          .catch(() => setError("Compass permission denied"));
      } else {
        window.addEventListener('deviceorientation', handleOrientation);
      }
    };

    startCompass();
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  // Set location and calculate Qibla
  const setLocationAndQibla = (lat, lng, name) => {
    const qibla = calculateQibla(lat, lng);
    setQiblaBearing(qibla);
    setLocation({ name, lat: lat.toFixed(4), lng: lng.toFixed(4), qibla: qibla.toFixed(1) });
    setError(null);
  };

  const getGPS = () => {
    navigator.geolocation.getCurrentPosition(
      pos => setLocationAndQibla(pos.coords.latitude, pos.coords.longitude, "GPS Location"),
      () => setError("GPS access denied"),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    if (cityData) {
      setLocationAndQibla(cityData.lat, cityData.lng, cityData.city?.en || "Selected City");
    }
  }, [cityData]);

  // This is the ONLY angle we rotate: how much to turn so Kaaba is in front
  // Only calculate when we have a valid device heading
  const angleToTurn = deviceHeading !== null ? ((qiblaBearing - deviceHeading + 360) % 360) : 0;
  const isFacingQibla = deviceHeading !== null && (angleToTurn < 8 || angleToTurn > 352);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md text-center">

        <h1 className="text-5xl font-bold text-cyan-400 mb-3 tracking-widest">Qibla</h1>
        <p className="text-gray-400 text-sm mb-10">Direction to the Holy Kaaba</p>

        <div className="flex justify-center gap-4 mb-8">
          <button onClick={getGPS} className="px-6 py-3 bg-cyan-900/60 hover:bg-cyan-800 border-2 border-cyan-500 text-cyan-300 rounded-xl font-semibold transition">
            GPS
          </button>
          <button onClick={() => cityData && setLocationAndQibla(cityData.lat, cityData.lng)} className="px-6 py-3 bg-cyan-900/60 hover:bg-cyan-800 border-2 border-cyan-500 text-cyan-300 rounded-xl font-semibold transition">
            City
          </button>
        </div>

        {error && <div className="p-4 bg-red-900/50 border border-red-500 text-red-300 rounded-xl mb-6">{error}</div>}

        {location && (
          <div className="p-5 bg-gray-900/50 border border-cyan-800 rounded-2xl mb-10">
            <p className="text-cyan-400 text-xs font-bold tracking-wider">LOCATION</p>
            <p className="text-white font-bold text-lg">{location.name}</p>
            <p className="text-gray-400 text-xs">{location.lat}°, {location.lng}°</p>
            <p className="text-cyan-300 text-sm mt-2">Qibla Bearing: {location.qibla}° from North</p>
          </div>
        )}

        {/* PROFESSIONAL FIXED COMPASS */}
        <div className="relative w-80 h-80 mx-auto mb-12">

          {/* Outer Glow */}
          <div className="absolute inset-0 rounded-full bg-cyan-400 blur-3xl opacity-30 animate-pulse"></div>

          {/* Fixed Compass Body (N always at top) */}
          <div className="absolute inset-0 rounded-full bg-black border-8 border-cyan-500 shadow-2xl shadow-cyan-500/70">

            {/* Fixed North Marker */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2">
              <div className="w-4 h-16 bg-cyan-400 rounded-full shadow-lg"></div>
              <p className="text-cyan-300 text-2xl font-bold mt-4">N</p>
            </div>

            {/* Show loading or compass needle */}
            {deviceHeading === null ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-cyan-400 text-lg font-semibold">Calibrating compass...</p>
              </div>
            ) : (
              /* Qibla Needle — Rotates to show correct direction */
              <div 
                className="absolute inset-0 origin-center transition-transform duration-700 ease-out"
                style={{ transform: `rotate(${angleToTurn}deg)` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  {/* Long Cyan Arrow */}
                  <div className="w-6 h-56 bg-gradient-to-t from-cyan-600 via-cyan-400 to-cyan-300 rounded-t-full shadow-2xl shadow-cyan-400/80"></div>
                  {/* Kaaba Icon */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-cyan-300 rounded-full border-6 border-black shadow-2xl flex items-center justify-center">
                    <span className="text-black text-4xl font-bold">Kaaba</span>
                  </div>
                </div>
              </div>
            )}

            {/* Center Hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-cyan-400 to-cyan-700 rounded-full shadow-2xl border-6 border-black z-10"></div>

            {/* Alignment Glow */}
            {isFacingQibla && (
              <div className="absolute inset-0 rounded-full bg-cyan-400 blur-2xl animate-pulse opacity-60"></div>
            )}
          </div>
        </div>

        {/* Final Feedback */}
        <div className={`inline-block px-12 py-8 rounded-3xl border-4 ${isFacingQibla ? 'bg-green-900/60 border-green-500' : 'bg-gray-900/80 border-cyan-500'} transition-all duration-500`}>
          <p className="text-6xl font-bold text-white tabular-nums">
            {deviceHeading !== null ? Math.round(angleToTurn) : '--'}°
          </p>
          <p className={`text-2xl font-bold mt-3 ${isFacingQibla ? 'text-green-400' : 'text-cyan-300'}`}>
            {deviceHeading === null 
              ? "Calibrating..." 
              : isFacingQibla 
                ? "You are facing the Kaaba!" 
                : angleToTurn < 180 
                  ? "Turn Left" 
                  : "Turn Right"
            }
          </p>
        </div>

        <p className="text-gray-400 text-sm mt-8">
          Hold phone flat • When Kaaba arrow points straight up → You are facing Mecca
        </p>
      </div>
    </div>
  );
};

export default Compass;