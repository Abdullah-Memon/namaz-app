import { useApi } from "../../hooks/useApi";
import { useState, useEffect } from "react";
import { getCurrentDate } from "../../utils/constant.js";
import { getCityByCityCode, defaultCity } from "../../data/static/locations";
import { getPrayerName } from "../../utils/prayer-names.js";
import Card from "../shared/card.jsx";
import { formatTime } from "../../utils/constant.js";

// Helper function to subtract minutes from a time string (HH:MM)
const subtractMinutes = (timeStr, minutes) => {
  const [hours, mins] = timeStr.split(":").map(Number);
  let newMins = mins - minutes;
  let newHours = hours;
  
  if (newMins < 0) {
    newMins += 60;
    newHours -= 1;
  }
  
  return `${newHours.toString().padStart(2, "0")}:${newMins.toString().padStart(2, "0")}`;
};

const Prayer = ({ sessionValues }) => {
  // Get city data with fallback to default city
  const cityData = getCityByCityCode(sessionValues?.city) || getCityByCityCode(defaultCity);
  
  // If still no city data found, use Karachi as hardcoded fallback
  const fallbackCity = {
    lat: 24.8607,
    lng: 67.0011
  };
  
  const selectedCity = cityData || fallbackCity;

  // Get prayer times using the custom hook
  const { data, loading, error, refresh } = useApi(
    "prayer",
    {
      date: getCurrentDate(),
      latitude: selectedCity.lat,
      longitude: selectedCity.lng,
      method: sessionValues?.method || 5,
      shafaq: sessionValues?.imam || "general",
    }
  );

  const [upcomingPrayer, setUpcomingPrayer] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [currentPrayer, setCurrentPrayer] = useState(null);

  // Calculate upcoming prayer and current prayer
  useEffect(() => {
    if (!data?.data?.timings) return;

    const timings = data.data.timings;
    const now = new Date();
    const currentTimeStr = now.getHours().toString().padStart(2, "0") + ":" + now.getMinutes().toString().padStart(2, "0");

    const prayerOrder = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Sunset", "Maghrib", "Isha"];
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
    return <div className="prayer-loading">Loading prayer times...</div>;
  }

  if (error && !data) {
    return (
      <div className="prayer-error">
        <p>Error: {error}</p>
        <button onClick={refresh}>Retry</button>
      </div>
    );
  }

  if (!data) {
    return <div className="prayer-empty">No prayer data available</div>;
  }

  const timings = data.data?.timings || {};

  return (
    <div className="module">

      {/* Main Layout: Left (5 prayers) and Right (Current Prayer) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 h-96">
        
        {/* left  side: Current Prayer */}
        <div className="lg:col-span-1">
          <Card
            size="full"
            body={
              currentPrayer ? (
                <div className="flex flex-col justify-center items-center h-full">
                  <h1 className="text-9xl">{getPrayerName(currentPrayer.name)}</h1>
                  <p className="text-5xl font-bold time text-gray-700 mb-4">{formatTime(currentPrayer.time) }</p>
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center h-full">
                  <p className="text-gray-500">No active prayer at this time</p>
                </div>
              )
            }
            className="bg-white"
          />
        </div>

        {/* Right side: 5 Prayer Times distributed equally */}
        <div className="lg:col-span-1 flex flex-col gap-3">
          {["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].map((prayer) => {
            const isCurrentPrayer = currentPrayer?.name === prayer;
            const allPrayers = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Sunset", "Maghrib", "Isha"];
            const currentIndex = allPrayers.indexOf(prayer);
            let nextPrayerTime = null;
            
            // Find the next prayer in the list
            for (let i = currentIndex + 1; i < allPrayers.length; i++) {
              if (timings[allPrayers[i]]) {
                nextPrayerTime = timings[allPrayers[i]];
                break;
              }
            }
            
            // Calculate upper range
            let upperRangeTime = null;
            if (prayer === "Maghrib") {
              // Maghrib: add 15-20 mins range
              const [maghribHours, maghribMins] = timings[prayer].split(":").map(Number);
              const endTime = new Date();
              endTime.setHours(maghribHours, maghribMins + 20, 0);
              const endHours = endTime.getHours();
              const endMins = endTime.getMinutes();
              upperRangeTime = `${endHours.toString().padStart(2, "0")}:${endMins.toString().padStart(2, "0")}`;
            } else if (nextPrayerTime) {
              // For other prayers: subtract 5 mins from next prayer
              upperRangeTime = subtractMinutes(nextPrayerTime, 5);
            }
            
            return (
              <div key={prayer} className="flex-1 min-h-0">
                <Card
                  size="full"
                  className={`${isCurrentPrayer ? 'bg-primary text-white' : 'bg-white'}`}
                  body={
                    <div className="flex justify-between items-center h-full">
                      <span className={`text-lg font-semibold ${isCurrentPrayer ? 'text-white' : 'text-gray-700'}`}>{getPrayerName(prayer)}</span>
                      <span className={`text-2xl font-bold time ${isCurrentPrayer ? 'text-white' : 'text-primary'}`}>
                        {timings[prayer] ? `${formatTime(timings[prayer])}${upperRangeTime ? ` - ${formatTime(upperRangeTime)}` : ''}` : "N/A"}
                      </span>
                    </div>
                  }
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Last Prayer Time */}
        <Card
        className="bg-white"
          body={
            <div className="flex flex-col items-center justify-center py-4">
              <p className="text-3xl font-bold text-primary mb-2 time">
                {currentPrayer?.time ? formatTime(currentPrayer.time) : "N/A"}
              </p>
              <p className="text-gray-600 text-sm">
                {currentPrayer?.name ? getPrayerName(currentPrayer.name) : "No prayer yet"}
              </p>
            </div>
          }
        />

        {/* Upcoming Prayer */}
        <Card
        className="bg-white"
          body={
            <div className="flex flex-col items-center justify-center py-4">
              <p className="text-3xl font-bold text-primary mb-2">
                {upcomingPrayer?.name ? getPrayerName(upcomingPrayer.name) : "N/A"}
              </p>
              <p className="text-gray-600 text-sm time">
                {upcomingPrayer?.time ? formatTime(upcomingPrayer.time) : "No upcoming prayer"}
              </p>
            </div>
          }
        />

        {/* Time Remaining */}
        <Card
        className="bg-white"
          body={
            <div className="flex flex-col items-center justify-center py-4">
              <p className="text-3xl font-bold text-primary mb-2">
                {timeRemaining || "Calculating..."}
              </p>
              <p className="text-gray-600 text-sm">Until next prayer</p>
            </div>
          }
        />
      </div>

      {/* Refresh Button */}
      {/* <div className="mt-8 text-center">
        <button
          onClick={refresh}
          disabled={loading}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div> */}
    </div>
  );
};

export default Prayer;
