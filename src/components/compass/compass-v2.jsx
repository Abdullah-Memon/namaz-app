import React, { useState, useEffect } from "react";
import { getCityByCityCode, defaultCity } from "../../data/static/locations";
import { getTranslation } from "../../utils/enums";
import DirectionIcon from "../../assets/icons/direction.svg";

const CompassV2 = ({ sessionValues }) => {
  const [qiblaBearing, setQiblaBearing] = useState(0);
  const [deviceHeading, setDeviceHeading] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const KAABA_LAT = 21.422507;
  const KAABA_LNG = 39.826206;

  const cityData =
    getCityByCityCode(sessionValues?.city) || getCityByCityCode(defaultCity);

  /** ---------------------------------------------------------
   * 🕋 QIBLA CALCULATION (ACCURATE & VERIFIED)
   * --------------------------------------------------------- */
  const calculateQibla = (lat, lng) => {
    const φK = (KAABA_LAT * Math.PI) / 180;
    const λK = (KAABA_LNG * Math.PI) / 180;
    const φ = (lat * Math.PI) / 180;
    const λ = (lng * Math.PI) / 180;

    const y = Math.sin(λK - λ);
    const x = Math.cos(φ) * Math.tan(φK) - Math.sin(φ) * Math.cos(λK - λ);

    let angle = (Math.atan2(y, x) * 180) / Math.PI;
    return (angle + 360) % 360;
  };

  /** ---------------------------------------------------------
   * 📍 SET LOCATION & QIBLA BEARING
   * --------------------------------------------------------- */
  const setLocationAndQibla = (lat, lng, name = "Current Location") => {
    const qibla = calculateQibla(lat, lng);
    setLocation({ lat, lng, qibla, name });
    setQiblaBearing(qibla);
    setError(null);
  };

  /** ---------------------------------------------------------
   * 📡 GET GPS LOCATION
   * --------------------------------------------------------- */
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationAndQibla(
          pos.coords.latitude,
          pos.coords.longitude,
          "GPS Location"
        );
      },
      () => {
        if (cityData)
          setLocationAndQibla(cityData.lat, cityData.lng, cityData.name);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  /** ---------------------------------------------------------
   * 🧭 DEVICE ORIENTATION FIXED FOR iOS + ANDROID
   * --------------------------------------------------------- */
  useEffect(() => {
    const handleOrientation = (event) => {
      let heading = null;

      if (event.webkitCompassHeading !== undefined) {
        // iOS gives TRUE NORTH directly
        heading = event.webkitCompassHeading;
      } else if (event.alpha !== null) {
        // ANDROID FIX — rotate device alpha into compass direction
        heading = (360 - event.alpha + 360) % 360;
      }

      if (heading !== null) setDeviceHeading(Math.round(heading));
    };

    const startCompass = () => {
      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function"
      ) {
        DeviceOrientationEvent.requestPermission()
          .then((res) => {
            if (res === "granted") {
              setPermissionGranted(true);
              window.addEventListener("deviceorientation", handleOrientation);
            } else {
              setError("Orientation permission denied");
            }
          })
          .catch(() => setError("Error requesting sensor permission"));
      } else if (typeof DeviceOrientationEvent !== "undefined") {
        setPermissionGranted(true);
        window.addEventListener("deviceorientation", handleOrientation);
      } else {
        setError("Device does not support compass sensor");
      }
    };

    startCompass();

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  /** ---------------------------------------------------------
   * 🎯 INITIALIZE LOCATION
   * --------------------------------------------------------- */
  useEffect(() => {
    getUserLocation();
  }, [cityData]);

  /** ---------------------------------------------------------
   * 🎛️ CALCULATE ANGLE DIFFERENCE
   * --------------------------------------------------------- */
  const angleDifference =
    deviceHeading != null
      ? ((qiblaBearing - deviceHeading + 540) % 360) - 180
      : 0;

  const isAligned = Math.abs(angleDifference) < 10;

  /** ---------------------------------------------------------
   * 🧭 FINAL NEEDLE ROTATION (FIXED)
   * --------------------------------------------------------- */
  const needleRotation =
    deviceHeading != null ? (qiblaBearing - deviceHeading + 360) % 360 : 0;

  /** ---------------------------------------------------------
   * 🕌 UI: KAABA MARKER FIXED ON COMPASS
   * --------------------------------------------------------- */
  const kaabaMarkerRotation = qiblaBearing != null ? qiblaBearing : 0;

  return (
    <div className=" p-6 flex flex-col items-center justify-center">
      {/* Directions  */}
      <div
        className={`mt-4 text-lg font-bold ${
          isAligned ? "text-green-600" : "text-red-500"
        }`}
      >
        {deviceHeading === null
          ? "Calibrating..."
          : isAligned
          ? getTranslation("Directions").facingDirection
          : angleDifference < 0
          ? getTranslation("Directions").left
          : getTranslation("Directions").right}
      </div>

      {/* Compass Circle */}
      <div
        className={`relative w-72 h-72 rounded-full border-4  bg-gray-50  shadow-xl ${
          isAligned ? "border-green-500" : "border-gray-400"
        }`}
      >
        {/* Cardinal N */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-4xl font-bold">
          🕋
        </div>

        {/* Kaaba Direction Marker */}
        <div
          className="absolute inset-0"
          style={{ transform: `rotate(${kaabaMarkerRotation}deg)` }}
        >
          {/* <div className="absolute top-1 left-1/2 -translate-x-1/2 text-2xl">
            🕋
          </div> */}
        </div>

        {/* Qibla Needle (moves with SVG) */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
          style={{ transform: `rotate(${needleRotation}deg)` }}
        >
          <img
            src={DirectionIcon}
            alt="Qibla Needle"
            className="w-20 h-20 select-none pointer-events-none"
            draggable="false"
          />
        </div>
      </div>

      {/* Info Below */}
      <div className="mt-6 text-center">
        <div className="text-3xl font-bold">
          {deviceHeading === null
            ? "--"
            : `${getTranslation("Directions").yourDirection} : ${
                deviceHeading !== null ? Math.round(deviceHeading) + "°" : "--"
              }`}
        </div>

        <div className="text-xl mt-2">
          {getTranslation("Directions").exactDirection} :{" "}
          {Math.round(qiblaBearing)}°
        </div>
      </div>
    </div>
  );
};

export default CompassV2;
