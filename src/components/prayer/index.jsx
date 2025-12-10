import { useApi } from "../../hooks/useApi";
import { useState, useEffect, useRef } from "react";
import { getCurrentDate } from "../../utils/constant.js";
import { getCityByCityCode, defaultCity } from "../../data/static/locations";
import { getPrayerName } from "../../utils/prayer-names.js";
import { formatTime } from "../../utils/constant.js";
import azanAudio from "../../assets/azan.mp3";
import bellIcon from "../../assets/icons/bell.svg";
import { getTranslation } from "../../utils/enums.js";
import { Features } from "../../utils/constant";

// Helper function to subtract minutes from a time string (HH:MM)
const subtractMinutes = (timeStr, minutes) => {
  const [hours, mins] = timeStr.split(":").map(Number);
  let newMins = mins - minutes;
  let newHours = hours;

  if (newMins < 0) {
    newMins += 60;
    newHours -= 1;
  }

  return `${newHours.toString().padStart(2, "0")}:${newMins
    .toString()
    .padStart(2, "0")}`;
};

const Prayer = ({ sessionValues }) => {
  // Get city data with fallback to default city
  const cityData =
    getCityByCityCode(sessionValues?.city) || getCityByCityCode(defaultCity);

  // If still no city data found, use Karachi as hardcoded fallback
  const fallbackCity = {
    lat: 24.8607,
    lng: 67.0011,
  };

  const selectedCity = cityData || fallbackCity;

  // Get prayer times using the custom hook
  const { data, loading, error, refresh } = useApi("prayer", {
    date: getCurrentDate(),
    latitude: selectedCity.lat,
    longitude: selectedCity.lng,
    method: sessionValues?.method || 5,
    shafaq: sessionValues?.imam || "general",
  });

  const [upcomingPrayer, setUpcomingPrayer] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [currentPrayer, setCurrentPrayer] = useState(null);
  const audioRef = useRef(null);
  const [playedPrayers, setPlayedPrayers] = useState(new Set());

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio(azanAudio);
    audioRef.current.volume = 1.0;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Check and play Azan when prayer time arrives
  useEffect(() => {
    if (!data?.data?.timings) return;

    const checkAndPlayAzan = () => {
      const now = new Date();
      const currentTimeStr = `${now
        .getHours()
        .toString()
        .padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
      const timings = data.data.timings;

      // Only check main prayer times (not Sunrise/Sunset)
      const mainPrayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

      for (const prayer of mainPrayers) {
        const prayerTime = timings[prayer];
        if (prayerTime === currentTimeStr) {
          const prayerKey = `${getCurrentDate()}-${prayer}`;

          // Check if we haven't played Azan for this prayer today
          if (!playedPrayers.has(prayerKey)) {
            console.log(`Prayer time reached: ${prayer} at ${prayerTime}`);

            // Play Azan
            if (audioRef.current) {
              audioRef.current.play().catch((err) => {
                console.error("Error playing Azan:", err);
              });
            }

            // Mark this prayer as played
            setPlayedPrayers((prev) => new Set([...prev, prayerKey]));

            // Show browser notification if supported
            if (
              "Notification" in window &&
              Notification.permission === "granted"
            ) {
              new Notification(`${getPrayerName(prayer)} Time`, {
                body: `It's time for ${getPrayerName(prayer)} prayer`,
                icon: "/icon.png",
                tag: prayer,
              });
            }

            break;
          }
        }
      }
    };

    // Check every second
    const interval = setInterval(checkAndPlayAzan, 1000);
    return () => clearInterval(interval);
  }, [data, playedPrayers]);

  // Request notification permission on mount
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Calculate upcoming prayer and current prayer
  useEffect(() => {
    if (!data?.data?.timings) return;

    const timings = data.data.timings;
    const now = new Date();
    const currentTimeStr =
      now.getHours().toString().padStart(2, "0") +
      ":" +
      now.getMinutes().toString().padStart(2, "0");

    const prayerOrder = [
      "Fajr",
      "Sunrise",
      "Dhuhr",
      "Asr",
      "Sunset",
      "Maghrib",
      "Isha",
    ];
    let foundUpcoming = null;
    let foundCurrent = null;

    for (const prayer of prayerOrder) {
      const prayerTime = timings[prayer];
      if (prayerTime && prayerTime > currentTimeStr && !foundUpcoming) {
        foundUpcoming = { name: prayer, time: prayerTime };
      } else if (prayerTime && prayerTime <= currentTimeStr) {
        foundCurrent = { name: prayer, time: prayerTime };
      }
    }

    setUpcomingPrayer(foundUpcoming);
    setCurrentPrayer(foundCurrent);
  }, [data]);

  // Calculate time remaining
  useEffect(() => {
    if (!upcomingPrayer) return;

    const updateTimeRemaining = () => {
      const now = new Date();
      const [upHour, upMin] = upcomingPrayer.time.split(":").map(Number);
      const upcomingTime = new Date();
      upcomingTime.setHours(upHour, upMin, 0);

      const diff = upcomingTime - now;
      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeRemaining(`${hours}h ${mins}m ${secs}s`);
      } else {
        setTimeRemaining("Starting now");
      }
    };

    updateTimeRemaining();
    const timer = setInterval(updateTimeRemaining, 1000);
    return () => clearInterval(timer);
  }, [upcomingPrayer]);

  if (loading) {
    return (
      <div className="px-6 py-8">
        <div className="animate-pulse space-y-4">
          <div
            className="h-32 rounded-3xl"
            style={{ backgroundColor: "var(--color-card-secondary)" }}
          ></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-16 rounded-2xl"
                style={{ backgroundColor: "var(--color-card-secondary)" }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="px-6 py-8">
        <div
          className="p-6 rounded-3xl text-center"
          style={{
            backgroundColor: "var(--color-card)",
            borderColor: "var(--color-border)",
          }}
        >
          <p style={{ color: "var(--color-text)" }}>Error: {error}</p>
          <button
            onClick={refresh}
            className="mt-4 px-6 py-3 rounded-2xl font-semibold"
            style={{
              backgroundColor: "var(--color-button-bg)",
              color: "var(--color-button-text)",
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div
        className="px-6 py-8 text-center"
        style={{ color: "var(--color-secondary)" }}
      >
        No prayer data available
      </div>
    );
  }

  const timings = data.data?.timings || {};

  // Calculate time until next prayer in readable format
  const getTimeRemaining = () => {
    if (!upcomingPrayer) return null;
    const now = new Date();
    const [upHour, upMin] = upcomingPrayer.time.split(":").map(Number);
    const upcomingTime = new Date();
    upcomingTime.setHours(upHour, upMin, 0);
    const diff = upcomingTime - now;
    if (diff > 0) {
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${mins}m`;
    }
    return null;
  };

  return (
    <div className="px-6 py-8 space-y-8">
      {/* Azan Notification Badge */}
      {/* <div 
        className="flex items-center justify-center gap-2 p-3 rounded-xl"
        style={{ 
          backgroundColor: 'var(--color-card-secondary)', 
          border: '1px solid var(--color-border)' 
        }}
      >
        <span className="text-lg">🔔</span>
        <span className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
          Azan will play automatically at prayer time
        </span>
      </div> */}

      {/* Current Prayer Highlight */}
      {currentPrayer && (
        <div
          className="rounded-3xl p-8 shadow-lg"
          style={{
            background:
              "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/80 text-sm font-medium tracking-wider">
              {getTranslation("LabelTexts").currentTime}
            </span>
            <img
              src={bellIcon}
              alt="Bell"
              className="w-6 h-6"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>
          <h2 className="text-4xl font-bold mb-2" style={{ color: "#ffffff" }}>
            {getPrayerName(currentPrayer.name)}
          </h2>
          <div className="flex items-center gap-2 mb-6 mt-2">
            {/* <span className="text-xl">⏰</span> */}
            <span className="text-white text-2xl font-semibold time">
              {formatTime(currentPrayer.time)}
            </span>
          </div>
          {upcomingPrayer && (
            <div className="pt-4 border-t border-white/20">
              <span className="text-white/80 text-sm">
                {getTranslation("LabelTexts").nextPrayerLabel}:{" "}
                {getPrayerName(upcomingPrayer.name)}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Prayer Times List */}
      <div>
        {/* <h3 
          className="text-lg font-semibold mb-4"
          style={{ color: 'var(--color-text)' }}
        >
          Prayer Times
        </h3> */}
        <div className="space-y-2">
          {["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map((prayer) => {
            const isUpcoming = upcomingPrayer?.name === prayer;
            const isCompleted =
              currentPrayer &&
              ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].indexOf(
                currentPrayer.name
              ) >=
                ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].indexOf(prayer) &&
              !isUpcoming;

            return (
              <div
                key={prayer}
                className="flex items-center justify-between p-4 rounded-2xl transition-all duration-200"
                style={{
                  backgroundColor: isUpcoming
                    ? "var(--color-next-bg)"
                    : "var(--color-card-secondary)",
                  // border: isUpcoming ? '2px solid var(--color-primary)' : '1px solid var(--color-border)'
                  border: "1px solid var(--color-border)",
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      backgroundColor: isCompleted
                        ? "var(--color-completed)"
                        : isUpcoming
                        ? "var(--color-primary)"
                        : "var(--color-secondary)",
                    }}
                  />
                  <span
                    className="font-medium"
                    style={{
                      // color: isUpcoming ? 'var(--color-primary)' : 'var(--color-text)'
                      color: "var(--color-text)",
                    }}
                  >
                    {getPrayerName(prayer)}
                  </span>
                </div>
                <span
                  className="text-lg font-semibold time"
                  style={{
                    // color: isUpcoming ? 'var(--color-primary)' : 'var(--color-secondary)'
                    color: "var(--color-text)",
                  }}
                >
                  {timings[prayer] ? formatTime(timings[prayer]) : "N/A"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div
        className={`grid ${
          Features.TasbeehCounter ? "grid-cols-2" : "grid-cols-1"
        } gap-3`}
      >
        <button
          className="p-6 rounded-2xl font-medium transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: "var(--color-next-bg)",
            color: "var(--color-primary)",
            border: "1px solid var(--color-primary)",
          }}
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("changeTab", { detail: "qibla" })
            )
          }
        >
          🧭 {getTranslation("LabelTexts").qiblaDirectionLabel}
        </button>
        {Features.TasbeehCounter && (
          <button
            className="p-6 rounded-2xl font-medium transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: "var(--color-card-secondary)",
              color: "var(--color-text)",
              border: "1px solid var(--color-border)",
            }}
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("changeTab", { detail: "tasbeeh" })
              )
            }
          >
            {getTranslation("LabelTexts").tasbeehCounterTitle}
          </button>
        )}
      </div>
    </div>
  );
};

export default Prayer;
