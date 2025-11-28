import { getCurrentLanguage } from "./language";
import { getCached } from "../api/cache.js";

const monthNames = [
  {
    value: 1,
    label: {
      en: "Muharram",
      ur: "محرم الحرام",
      sd: "محرم الحرام",
    },
  },
  {
    value: 2,
    label: {
      en: "Safar",
      ur: "صفر المظفر",
      sd: "صفر المظفر",
    },
  },
  {
    value: 3,
    label: {
      en: "Rabi' al-Awwal",
      ur: "ربیع الاول",
      sd: "ربيع الاول",
    },
  },
  {
    value: 4,
    label: {
      en: "Rabi' al-Thani",
      ur: "ربیع الثانی",
      sd: "ربيع الثاني",
    },
  },
  {
    value: 5,
    label: {
      en: "Jumada al-Awwal",
      ur: "جمادی الاول",
      sd: "جمادي الاول",
    },
  },
  {
    value: 6,
    label: {
      en: "Jumada al-Thani",
      ur: "جمادی الثانی",
      sd: "جمادي الثاني",
    },
  },
  {
    value: 7,
    label: {
      en: "Rajab",
      ur: "رجب المرجب",
      sd: "رجب المرجب",
    },
  },
  {
    value: 8,
    label: {
      en: "Sha'ban",
      ur: "شعبان المعظم",
      sd: "شعبان المعظم",
    },
  },
  {
    value: 9,
    label: {
      en: "Ramadan",
      ur: "رمضان المبارک",
      sd: "رمضان المبارڪ",
    },
  },
  {
    value: 10,
    label: {
      en: "Shawwal",
      ur: "شوال المکرم",
      sd: "شوال المڪرم",
    },
  },
  {
    value: 11,
    label: {
      en: "Dhu al-Qi'dah",
      ur: "ذوالقعدہ الحرام",
      sd: "ذوالقعده الحرام",
    },
  },
  {
    value: 12,
    label: {
      en: "Dhu al-Hijjah",
      ur: "ذوالحجہ الحرام",
      sd: "ذوالحجه الحرام",
    },
  },
];

const getIslmaicMonthNames = () => {
  const lang = getCurrentLanguage();

  return monthNames.map((month) => ({
    value: month.value,
    label: month.label[lang],
  }));
};

export const getCurrentIslamicMonth = async () => {
  try {
    // Try to get cached prayer data
    const prayerCacheKey = "prayer_{}"; // Empty params cache key
    const cachedPrayer = await getCached(prayerCacheKey);

    if (!cachedPrayer || !cachedPrayer.data || !cachedPrayer.data.date) {
      console.warn(
        "[getCurrentIslamicMonth] No cached prayer data with date information"
      );
      return null;
    }

    // Extract Islamic date from the cached response
    const dateInfo = cachedPrayer.data.date;
    const islamicDate = dateInfo.hijri;

    if (!islamicDate || !islamicDate.month) {
      console.warn(
        "[getCurrentIslamicMonth] Islamic date not found in cached data"
      );
      return null;
    }

    const monthNumber = parseInt(islamicDate.month.number);
    const lang = getCurrentLanguage();
    const monthData = monthNames[lang];

    if (!monthData) {
      console.warn(`[getCurrentIslamicMonth] Language "${lang}" not supported`);
      return null;
    }

    const monthLabel =
      monthData.find((m) => m.value === monthNumber)?.label ||
      `Month ${monthNumber}`;

    return {
      month: monthNumber,
      label: monthLabel,
      gregorianDate: dateInfo.readable,
      hijriDate: islamicDate.date,
    };
  } catch (error) {
    console.error(
      "[getCurrentIslamicMonth] Error fetching Islamic month:",
      error
    );
    return null;
  }
};

export default getIslmaicMonthNames;
