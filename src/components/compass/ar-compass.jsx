import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { getCityByCityCode, defaultCity } from "../../data/static/locations";
import { getTranslation } from '../../utils/enums';
import qiblaPinIcon from "../../assets/icons/qibla-pin-location.svg";

const ArCompass = ({ sessionValues, onClose }) => {
  const webcamRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [qiblaBearing, setQiblaBearing] = useState(0);
  const [deviceHeading, setDeviceHeading] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);

  const KAABA_LAT = 21.422507;
  const KAABA_LNG = 39.826206;
  const ALIGNMENT_TOLERANCE = 15; // degrees - increased for better user experience with hardware fluctuations

  const cityData = getCityByCityCode(sessionValues?.city) || getCityByCityCode(defaultCity);

  // Auto-start when component mounts
  useEffect(() => {
    console.log("ArCompass component mounted, starting AR compass...");
    startArCompass();
    return () => {
      // Cleanup on unmount
      console.log("ArCompass component unmounting, cleaning up...");
      if (webcamRef.current && webcamRef.current.video) {
        const stream = webcamRef.current.video.srcObject;
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
      }
    };
  }, []);

  // Calculate Qibla direction (same as regular compass)
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
    let headingHistory = [];
    const SMOOTHING_SAMPLES = 5; // Number of samples to average
    
    const handleOrientation = (event) => {
      let heading = 0;

      if (event.webkitCompassHeading !== undefined) {
        // iOS - webkitCompassHeading gives true heading
        heading = event.webkitCompassHeading;
      } else if (event.alpha !== null) {
        // Android - alpha gives rotation from north (0-360)
        heading = event.alpha;
      }

      // Add smoothing to reduce sensor noise
      headingHistory.push(heading);
      if (headingHistory.length > SMOOTHING_SAMPLES) {
        headingHistory.shift();
      }
      
      // Calculate smoothed heading
      const avgHeading = headingHistory.reduce((sum, h) => sum + h, 0) / headingHistory.length;
      setDeviceHeading(Math.round(avgHeading));
    };

    const startCompass = () => {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
          .then(res => {
            if (res === 'granted') {
              setPermissionGranted(true);
              window.addEventListener('deviceorientation', handleOrientation);
            } else {
              setError('Device orientation permission denied');
            }
          })
          .catch(() => setError('Error requesting orientation permission'));
      } else {
        // Non-iOS devices
        setPermissionGranted(true);
        window.addEventListener('deviceorientation', handleOrientation);
      }
    };

    // Start compass orientation tracking
    startCompass();

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []); // Remove isArActive dependency since it should always be active in this component

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

  // Calculate angle difference for AR positioning
  const calculateAngleDifference = () => {
    if (deviceHeading === null || qiblaBearing === null) return 0;
    
    let diff = qiblaBearing - deviceHeading;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    
    return diff;
  };

  const angleDifference = calculateAngleDifference();
  const isAligned = Math.abs(angleDifference) <= ALIGNMENT_TOLERANCE;

  // Calculate Kaaba position on screen (center when aligned)
  const getKaabaPosition = () => {
    const screenWidth = window.innerWidth;
    const maxOffset = screenWidth * 0.4; // Maximum offset from center
    const offset = (angleDifference / 180) * maxOffset; // Normalize to screen width
    
    return {
      x: Math.max(-maxOffset, Math.min(maxOffset, offset)),
      scale: isAligned ? 1.2 : 0.8 + (1 - Math.abs(angleDifference) / 180) * 0.4
    };
  };

  const kaabaPosition = getKaabaPosition();

  // Camera constraints for rear camera
  const videoConstraints = {
    facingMode: { exact: "environment" } // Use rear camera
  };

  const handleCameraError = (error) => {
    console.error("Camera error:", error);
    setIsLoading(false);
    setCameraReady(false);
    if (error.name === 'NotAllowedError') {
      setCameraError("Camera access denied. Please allow camera permissions and try again.");
    } else if (error.name === 'NotFoundError') {
      setCameraError("No camera found. Please make sure your device has a camera.");
    } else if (error.name === 'NotReadableError') {
      setCameraError("Camera is being used by another application. Please close other camera apps and try again.");
    } else {
      setCameraError("Unable to access camera. Please check permissions and try again.");
    }
  };

  const handleCameraReady = () => {
    console.log("Camera is ready! Setting cameraReady to true");
    setIsLoading(false);
    setCameraReady(true);
    setCameraError(null);
  };

  const startArCompass = async () => {
    try {
      setIsLoading(true);
      setCameraError(null);
      setCameraReady(false);
      getUserLocation();
    } catch (error) {
      console.error("AR Compass initialization error:", error);
      setIsLoading(false);
      handleCameraError(error);
    }
  };

  const stopArCompass = () => {
    setIsLoading(false);
    setCameraReady(false);
    setDeviceHeading(null);
    setCameraError(null);
    if (webcamRef.current && webcamRef.current.video) {
      const stream = webcamRef.current.video.srcObject;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 overflow-hidden">
      {/* Camera Background */}
      <div className="absolute inset-0">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          onUserMedia={handleCameraReady}
          onUserMediaError={handleCameraError}
          className="w-full h-full object-cover"
          mirrored={false}
        />
        
        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-black flex items-center justify-center z-20">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              <div className="text-white text-lg font-semibold">
                {isLoading ? 'Starting Camera...' : 'Loading AR View...'}
              </div>
              <div className="text-gray-300 text-sm">
                Please allow camera access when prompted
              </div>
            </div>
          </div>
        )}
        
        {/* Camera Error Overlay */}
        {cameraError && (
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <div className="text-center space-y-6 px-6">
              <div className="text-6xl text-red-400">📷</div>
              <div className="text-white text-xl font-semibold">Camera Error</div>
              <div className="text-gray-300 text-sm max-w-md">
                {cameraError}
              </div>
              <button
                onClick={startArCompass}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>

      {/* AR Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Crosshair Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="w-8 h-8 border-2 border-white rounded-full bg-white/20 backdrop-blur-sm"></div>
          <div className="absolute top-1/2 left-1/2 w-12 h-0.5 bg-white -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-0.5 h-12 bg-white -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Kaaba Icon - Moves based on direction */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-y-1/2 z-30 transition-all duration-500 ease-out"
          style={{ 
            transform: `translate(calc(-50% + ${kaabaPosition.x}px), -50%) scale(${kaabaPosition.scale})`,
          }}
        >
          <div 
            className={`w-20 h-20 rounded-xl border-4 ${
              isAligned ? 'border-green-400 bg-green-400/30' : 'border-cyan-400 bg-cyan-400/30'
            } backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${
              isAligned ? 'animate-pulse shadow-lg shadow-green-400/50' : 'shadow-lg shadow-cyan-400/50'
            }`}
          >
            <img 
              src={qiblaPinIcon} 
              alt="Qibla" 
              className="w-10 h-10"
              style={{ 
                filter: isAligned 
                  ? 'brightness(0) saturate(100%) invert(90%) sepia(20%) saturate(500%) hue-rotate(80deg)' 
                  : 'brightness(0) saturate(100%) invert(80%) sepia(50%) saturate(500%) hue-rotate(160deg)'
              }} 
            />
          </div>
          <div className={`text-center mt-2 text-sm font-semibold ${isAligned ? 'text-green-300' : 'text-cyan-300'}`}>
            Kaaba
          </div>
        </div>

        {/* Direction Indicator */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20">
          <div className="backdrop-blur-md px-6 py-4 rounded-xl border" style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', opacity: '0.95' }}>
            <div className="text-center">
              <div className="text-3xl font-bold tabular-nums" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-family-heading)' }}>
                {deviceHeading !== null ? Math.abs(Math.round(angleDifference)) : '--'}°
              </div>
              <div className="text-sm font-semibold mt-1" style={{ color: isAligned ? '#10b981' : 'var(--color-primary)' }}>
                {deviceHeading === null 
                  ? "Calibrating..." 
                  : isAligned 
                    ? "Perfect Alignment!" 
                    : Math.abs(angleDifference) <= 5
                      ? "Almost There!"
                      : angleDifference < -5 
                        ? "Turn Left" 
                        : angleDifference > 5
                          ? "Turn Right"
                          : "Almost There!"
                }
              </div>
            </div>
          </div>
        </div>

        {/* Location Info */}
        {location && (
          <div className="absolute bottom-32 left-4 right-4 z-20">
            <div className="backdrop-blur-md px-4 py-3 rounded-xl border" style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', opacity: '0.95' }}>
              <div className="text-xs font-semibold" style={{ color: 'var(--color-primary)' }}>QIBLA DIRECTION</div>
              <div className="font-semibold" style={{ color: 'var(--color-text)' }}>{location.name}</div>
              <div className="text-sm" style={{ color: 'var(--color-secondary)' }}>
                Bearing: {location.qibla}° from North
              </div>
            </div>
          </div>
        )}

        {/* Success Feedback */}
        {isAligned && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-20 z-40">
            <div className="backdrop-blur-md px-8 py-4 rounded-xl border-2 animate-pulse" style={{ backgroundColor: '#10b981', borderColor: '#34d399', opacity: '0.95' }}>
              <div className="text-white font-bold text-lg text-center" style={{ fontFamily: 'var(--font-family-heading)' }}>
                ✨ You are facing the Kaaba! ✨
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="absolute top-32 left-4 right-4 z-20">
            <div className="backdrop-blur-md px-4 py-3 rounded-xl border" style={{ backgroundColor: '#fecaca', borderColor: '#f87171', opacity: '0.95' }}>
              <div className="text-sm" style={{ color: '#dc2626' }}>{error}</div>
            </div>
          </div>
        )}
      </div>

      {/* Control Buttons */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-4">
        <button
          onClick={getUserLocation}
          className="px-6 py-3 rounded-xl font-semibold backdrop-blur-md transition pointer-events-auto"
          style={{ backgroundColor: 'var(--color-button-bg)', color: 'var(--color-button-text)', border: '1px solid var(--color-border)', opacity: '0.95' }}
          onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-button-hover)'}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-button-bg)'}
        >
          GPS
        </button>
        <button
          onClick={() => cityData && setLocationAndQibla(cityData.lat, cityData.lng, cityData.name)}
          className="px-6 py-3 rounded-xl font-semibold backdrop-blur-md transition pointer-events-auto"
          style={{ backgroundColor: 'var(--color-card)', color: 'var(--color-text)', border: '1px solid var(--color-border)', opacity: '0.95' }}
          onMouseEnter={(e) => { e.target.style.backgroundColor = 'var(--color-card-secondary)'; }}
          onMouseLeave={(e) => { e.target.style.backgroundColor = 'var(--color-card)'; }}
        >
          City
        </button>
        <button
          onClick={stopArCompass}
          className="px-6 py-3 rounded-xl font-semibold backdrop-blur-md transition pointer-events-auto"
          style={{ backgroundColor: '#dc2626', color: '#ffffff', border: '1px solid #f87171', opacity: '0.95' }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#b91c1c'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#dc2626'}
        >
          Exit AR
        </button>
      </div>
    </div>
  );
};

export default ArCompass;
