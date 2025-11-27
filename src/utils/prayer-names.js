import { getCurrentLanguage } from "./language";

const prayerNames = {
  Fajr: {
    en: "Fajr",
    ur: "فجر",
    sd: "فجر",
  },
  Sunrise: {
    en: "Sunrise",
    ur: "طلوع آفتاب",
    sd: "سج جو اڀرڻ",
  },
  Dhuhr: {
    en: "Dhuhr",
    ur: "ظہر",
    sd: "ظهر",
  },
  Asr: {
    en: "Asr",
    ur: "عصر",
    sd: "عصر",
  },
  Sunset: {
    en: "Sunset",
    ur: "غروب آفتاب",
    sd: "سج جو غروب ٿيڻ",
  },
  Maghrib: {
    en: "Maghrib",
    ur: "مغرب",
    sd: "مغرب",
  },
  Isha: {
    en: "Isha",
    ur: "عشاء",
    sd: "عشاء",
  },
  Tahajjud: {
    en: "Tahajjud",
    ur: "تہجد",
    sd: "تهجد",
  },
};

export function getPrayerName(prayerKey) {
  const lang = getCurrentLanguage();
  const prayer = prayerNames[prayerKey];
  return prayer ? prayer[lang] || prayer.en : prayerKey;
}
