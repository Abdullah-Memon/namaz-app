import React, { useState, useEffect } from "react";
import { getCityByCityCode, defaultCity } from "../../data/static/locations";

const CompassV2 = ({ sessionValues }) => {
  const [qiblaBearing, setQiblaBearing] = useState(0);
  const [deviceHeading, setDeviceHeading] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const KAABA_LAT = 21.422507;
  const KAABA_LNG = 39.826206;
  const ALIGNMENT_TOLERANCE = 10; // degrees

  const cityData =
    getCityByCityCode(sessionValues?.city) || getCityByCityCode(defaultCity);

  // Calculate Qibla direction
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

  // Set location and calculate Qibla
  const setLocationAndQibla = (lat, lng, name = "Current Location") => {
    const qibla = calculateQibla(lat, lng);
    setLocation({ lat, lng, qibla, name });
    setQiblaBearing(qibla);
    setError(null);
  };

  // Get user's GPS location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocationAndQibla(latitude, longitude, "GPS Location");
      },
      () => {
        setError("Unable to retrieve your location. Using city location.");
        if (cityData) {
          setLocationAndQibla(cityData.lat, cityData.lng, cityData.name);
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Handle device orientation
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
      if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
        DeviceOrientationEvent.requestPermission()
          .then((res) => {
            if (res === "granted") {
              setPermissionGranted(true);
              window.addEventListener("deviceorientation", handleOrientation);
            } else {
              setError("Device orientation permission denied");
            }
          })
          .catch(() => setError("Error requesting orientation permission"));
      } else if (typeof DeviceOrientationEvent !== "undefined") {
        // Non-iOS devices
        setPermissionGranted(true);
        window.addEventListener("deviceorientation", handleOrientation);
      } else {
        setError("Device orientation not supported in this browser");
      }
    };

    startCompass();

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  // Initialize location on component mount - prioritize GPS
  useEffect(() => {
    const initLocation = async () => {
      // Try GPS first
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocationAndQibla(latitude, longitude, "GPS Location");
          },
          () => {
            // Fall back to city location if GPS fails
            if (cityData) {
              setLocationAndQibla(cityData.lat, cityData.lng, cityData.name);
            }
          },
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 300000 }
        );
      } else {
        // No GPS support, use city location
        if (cityData) {
          setLocationAndQibla(cityData.lat, cityData.lng, cityData.name);
        }
      }
    };

    initLocation();
  }, [cityData]);

  // Calculate angle difference
  const calculateAngleDifference = () => {
    if (deviceHeading === null || qiblaBearing === null) return 0;

    let diff = qiblaBearing - deviceHeading;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    return diff;
  };

  const angleDifference = calculateAngleDifference();
  const isAligned = Math.abs(angleDifference) <= ALIGNMENT_TOLERANCE;

  // Calculate needle rotation: needle should point to Qibla direction relative to device orientation
  // Adding 180 degrees to correct the direction (needle was pointing opposite)
  const needleRotation =
    deviceHeading !== null ? (qiblaBearing - deviceHeading + 180) % 360 : 0;

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--color-background)",
        fontFamily: "var(--font-family-regular)",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Responsive grid layout */}
        <div className="max-w-6xl mx-auto">
          {/* Compass Dial - Center */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative w-full max-w-md aspect-square">
              {/* Main Compass Body */}
              <div
                className="absolute inset-0 rounded-full border-8"
                style={{
                  backgroundColor: "var(--color-card)",
                  borderColor: "var(--color-primary)",
                }}
              >
                {/* Compass Rose - Cardinal Directions */}
                <div className="absolute inset-0">
                  {/* Compass Rose - Cardinal Directions */}
                  <div className="absolute inset-0">
                    {/* North */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2">
                      <div 
                        className="text-xl font-bold"
                        style={{ color: "var(--color-primary)" }}
                      >
                        N
                      </div>
                      <div
                        className="w-1 h-6 mx-auto mt-1"
                        style={{ backgroundColor: "var(--color-primary)" }}
                      ></div>
                    </div>

                    {/* East */}
                    <div className="absolute right-8 top-1/2 -translate-y-1/2">
                      <div 
                        className="text-lg font-bold"
                        style={{ color: "var(--color-secondary)" }}
                      >
                        E
                      </div>
                    </div>

                    {/* South */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                      <div 
                        className="text-lg font-bold"
                        style={{ color: "var(--color-secondary)" }}
                      >
                        S
                      </div>
                    </div>

                    {/* West */}
                    <div className="absolute left-8 top-1/2 -translate-y-1/2">
                      <div 
                        className="text-lg font-bold"
                        style={{ color: "var(--color-secondary)" }}
                      >
                        W
                      </div>
                    </div>
                  </div>

                  {/* Degree Markings */}
                  <div className="absolute inset-0">
                    {[...Array(72)].map((_, i) => {
                      const angle = i * 5;
                      const isMainMark = angle % 30 === 0;
                      const isMediumMark = angle % 15 === 0 && angle % 30 !== 0;
                      
                      return (
                        <div
                          key={angle}
                          className="absolute origin-center"
                          style={{
                            backgroundColor: isMainMark 
                              ? "var(--color-primary)" 
                              : isMediumMark 
                                ? "var(--color-secondary)" 
                                : "var(--color-border)",
                            width: "1px",
                            height: isMainMark ? "20px" : isMediumMark ? "15px" : "8px",
                            left: "50%",
                            top: "16px",
                            transform: `translateX(-50%) rotate(${{angle}}deg)`,
                            transformOrigin: "50% calc(50% - 16px)",
                            opacity: isMainMark ? 1 : isMediumMark ? 0.7 : 0.4
                          }}
                        />
                      );
                    })}
                  </div>

                  {/* Qibla Needle */}
                  {deviceHeading !== null ? (
                    <div
                      className="absolute inset-0 origin-center transition-transform duration-700 ease-out"
                      style={{ transform: `rotate(${needleRotation}deg)` }}
                    >
                      {/* Qibla needle pointing to Qibla */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        {/* Main needle pointing to Qibla with Kaaba icon */}
                        <div
                          className="rounded-t-full shadow-xl transition-colors duration-500 -translate-y-20 relative"
                          style={{
                            width: "6px",
                            height: "140px",
                            background: isAligned
                              ? "linear-gradient(to top, #059669, #10b981)"
                              : "linear-gradient(to top, var(--color-button-bg), var(--color-primary))",
                          }}
                        >
                          {/* Kaaba icon at the tip */}
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-2xl">
                            🕋
                          </div>
                        </div>
                        {/* Opposite end (South pointer) */}
                        <div
                          className="rounded-b-full shadow-xl translate-y-3"
                          style={{
                            width: "6px",
                            height: "60px",
                            background:
                              "linear-gradient(to bottom, #dc2626, #ef4444)",
                          }}
                        ></div>
                      </div>
                    </div>
                  ) : (
                    /* Loading state */
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4 animate-pulse">
                        <div
                          className="w-16 h-16 mx-auto rounded-full border-4 border-dashed animate-spin"
                          style={{ borderColor: "var(--color-primary)" }}
                        ></div>
                        <div
                          className="text-lg font-semibold"
                          style={{ color: "var(--color-primary)" }}
                        >
                          Calibrating compass...
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Center Hub */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full shadow-2xl border-4 z-10 flex items-center justify-center transition-all duration-500"
                    style={{
                      background: `linear-gradient(135deg, var(--color-primary), var(--color-button-bg))`,
                      borderColor: "var(--color-border)",
                    }}
                  >
                    <div className="text-center">
                      <div
                        className="text-xs font-bold leading-tight"
                        style={{
                          color: "var(--color-button-text)",
                          fontFamily: "var(--font-family-heading)",
                        }}
                      >
                        QIBLA
                      </div>
                      <div className="text-2xl">🕋</div>
                    </div>
                  </div>

                  {/* Alignment Glow */}
                  {isAligned && (
                    <div
                      className="absolute inset-0 rounded-full blur-2xl animate-pulse opacity-50"
                      style={{ backgroundColor: "#10b981" }}
                    ></div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Info Cards Below Compass */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* Location Info */}
            {location && (
              <div
                className="p-6 rounded-2xl border-2 transition-all duration-300"
                style={{
                  backgroundColor: "var(--color-card)",
                  borderColor: "var(--color-primary)",
                }}
              >
                <div className="text-center space-y-3">
                  <div className="text-3xl">📍</div>
                  <div>
                    <p
                      className="text-xs font-bold tracking-wider uppercase"
                      style={{ color: "var(--color-primary)" }}
                    >
                      Current Location
                    </p>
                    <p
                      className="font-bold text-lg"
                      style={{ color: "var(--color-text)" }}
                    >
                      {location.name}
                    </p>
                    <p
                      className="text-xs opacity-75"
                      style={{ color: "var(--color-secondary)" }}
                    >
                      {location.lat}°, {location.lng}°
                    </p>
                  </div>
                  <div
                    className="pt-3 border-t"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <p
                      className="text-sm font-medium"
                      style={{ color: "var(--color-primary)" }}
                    >
                      Qibla Direction
                    </p>
                    <p
                      className="text-2xl font-bold"
                      style={{
                        color: "var(--color-text)",
                        fontFamily: "var(--font-family-heading)",
                      }}
                    >
                      {location.qibla}°
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--color-secondary)" }}
                    >
                      from True North
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Status Display */}
            <div
              className="p-6 rounded-2xl border-4 transition-all duration-300"
              style={{
                backgroundColor: isAligned ? "#10b981" : "var(--color-card)",
                borderColor: isAligned ? "#34d399" : "var(--color-primary)",
              }}
            >
              <div className="text-center space-y-4">
                <div
                  className="text-5xl font-bold tabular-nums"
                  style={{
                    color: isAligned ? "#ffffff" : "var(--color-text)",
                    fontFamily: "var(--font-family-heading)",
                  }}
                >
                  {deviceHeading !== null
                    ? Math.abs(Math.round(angleDifference))
                    : "--"}
                  °
                </div>
                <div>
                  <div
                    className="text-xl font-bold"
                    style={{
                      color: isAligned ? "#ffffff" : "var(--color-primary)",
                    }}
                  >
                    {deviceHeading === null
                      ? "Calibrating..."
                      : isAligned
                      ? "Perfect Alignment!"
                      : angleDifference < 0
                      ? "Turn Left"
                      : "Turn Right"}
                  </div>
                  {isAligned && (
                    <div
                      className="text-lg animate-pulse"
                      style={{ color: "#ffffff" }}
                    >
                      🕌 Facing Kaaba! 🕌
                    </div>
                  )}
                </div>
                {deviceHeading !== null && (
                  <div
                    className="pt-3 border-t text-sm"
                    style={{
                      borderColor: isAligned
                        ? "#ffffff"
                        : "var(--color-border)",
                      color: isAligned ? "#ffffff" : "var(--color-secondary)",
                    }}
                  >
                    Device: {deviceHeading}° • Target:{" "}
                    {Math.round(qiblaBearing)}°
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompassV2;
