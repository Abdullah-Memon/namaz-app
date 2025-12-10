import Prayer from "../components/prayer";

// get current date in DD-MM-YYYY format
export const getCurrentDate = () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${day}-${month}-${year}`;
}

export const formatTime = (timeStr) => {
  const [hour, minute] = timeStr.split(':').map(Number);
  const period = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${formattedHour}:${String(minute).padStart(2, '0')} ${period}`;
}

export const Features = {
  PrayerTimes: true,
  ARCompass: true,
  Compass: true,
  TasbeehCounter: true,
  QiblaDirection: true,
  IslamicEvents: false,
  QuranVerses: false,
};

export const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
