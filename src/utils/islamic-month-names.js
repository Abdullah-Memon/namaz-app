import { getCurrentLanguage } from "./language";
import { getCached } from "../api/cache.js";

const monthNames = {
  en: [
    { value: 1, label: "Muharram" },
    { value: 2, label: "Safar" },
    { value: 3, label: "Rabi' al-Awwal" },
    { value: 4, label: "Rabi' al-Thani" },
    { value: 5, label: "Jumada al-Awwal" },
    { value: 6, label: "Jumada al-Thani" },
    { value: 7, label: "Rajab" },
    { value: 8, label: "Sha'ban" },
    { value: 9, label: "Ramadan" },
    { value: 10, label: "Shawwal" },
    { value: 11, label: "Dhu al-Qi'dah" },
    { value: 12, label: "Dhu al-Hijjah" },
  ],
  ur: [
    { value: 1, label: "محرم الحرام" },
    { value: 2, label: "صفر المظفر" },
    { value: 3, label: "ربیع الاول" },
    { value: 4, label: "ربیع الثانی" },
    { value: 5, label: "جمادی الاول" },
    { value: 6, label: "جمادی الثانی" },
    { value: 7, label: "رجب المرجب" },
    { value: 8, label: "شعبان المعظم" },
    { value: 9, label: "رمضان المبارک" },
    { value: 10, label: "شوال المکرم" },
    { value: 11, label: "ذوالقعدہ الحرام" },
    { value: 12, label: "ذوالحجہ الحرام" },
  ],
  sd: [
    { value: 1, label: "محرم الحرام" },
    { value: 2, label: "صفر المظفر" },
    { value: 3, label: "ربيع الاول" },
    { value: 4, label: "ربيع الثاني" },
    { value: 5, label: "جمادي الاول" },
    { value: 6, label: "جمادي الثاني" },
    { value: 7, label: "رجب المرجب" },
    { value: 8, label: "شعبان المعظم" },
    { value: 9, label: "رمضان المبارڪ" },
    { value: 10, label: "شوال المڪرم" },
    { value: 11, label: "ذوالقعده الحرام" },
    { value: 12, label: "ذوالحجه الحرام" },
  ],
};


const getIslmaicMonthNames = () => {
  const lang = getCurrentLanguage();

  return monthNames[lang];
};

export const getCurrentIslamicMonth = async () => {
  try {
    // Try to get cached prayer data
    const prayerCacheKey = "prayer_{}"; // Empty params cache key
    const cachedPrayer = await getCached(prayerCacheKey);

    if (!cachedPrayer || !cachedPrayer.data || !cachedPrayer.data.date) {
      console.warn("[getCurrentIslamicMonth] No cached prayer data with date information");
      return null;
    }

    // Extract Islamic date from the cached response
    const dateInfo = cachedPrayer.data.date;
    const islamicDate = dateInfo.hijri;

    if (!islamicDate || !islamicDate.month) {
      console.warn("[getCurrentIslamicMonth] Islamic date not found in cached data");
      return null;
    }

    const monthNumber = parseInt(islamicDate.month.number);
    const lang = getCurrentLanguage();
    const monthData = monthNames[lang];

    if (!monthData) {
      console.warn(`[getCurrentIslamicMonth] Language "${lang}" not supported`);
      return null;
    }

    const monthLabel = monthData.find((m) => m.value === monthNumber)?.label || `Month ${monthNumber}`;

    return {
      month: monthNumber,
      label: monthLabel,
      gregorianDate: dateInfo.readable,
      hijriDate: islamicDate.date,
    };
  } catch (error) {
    console.error("[getCurrentIslamicMonth] Error fetching Islamic month:", error);
    return null;
  }
};

export default getIslmaicMonthNames;
