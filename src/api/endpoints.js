
import { dateRegex } from "../utils/constant";

const ENDPOINTS = {
  prayer: {
    key: "prayer",
    buildUrl: ({ date, latitude, longitude, method, shafaq, tune, timezonestring, calendarMethod }) => {
      if (!date || !latitude || !longitude) {
        return null;
      }

      if (!dateRegex.test(date)) {
        return null;
      }

      const baseURL = "https://api.aladhan.com/v1/timings/";
      let url = `${baseURL}${date}?latitude=${latitude}&longitude=${longitude}`;

      if (method) url += `&method=${method}`;
      if (shafaq) url += `&shafaq=${shafaq}`;
      if (tune) url += `&tune=${tune}`;
      if (timezonestring) url += `&timezonestring=${encodeURIComponent(timezonestring)}`;
      if (calendarMethod) url += `&calendarMethod=${calendarMethod}`;

      return url;
    },
    fallbackPath: "/data/prayer.json",
    ttl: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    description: "Prayer times API from Aladhan",
  },

  events: {
    key: "events",
    buildUrl: () => "https://example.com/api/events",
    fallbackPath: "/data/events.json",
    ttl: 7 * 24 * 60 * 60 * 1000, // 7 days
    description: "Islamic events API",
  },

  quran: {
    key: "quran",
    buildUrl: () => "https://api.quran.com/api/v4/chapters",
    fallbackPath: "/data/quran/metadata.json",
    ttl: 30 * 24 * 60 * 60 * 1000, // 30 days
    description: "Quran metadata API",
  },

  // Quran API
  quranChapters: {
    key: "quranChapters", 
    buildUrl: () => "https://api.quran.com/api/v4/chapters",
    fallbackPath: "/data/quran/metadata.json",
    ttl: 30 * 24 * 60 * 60 * 1000, // 30 days
    description: "Quran chapters API",
  },

  quranVerse: {
    key: "quranVerse",
    buildUrl: ({ chapterId, page }) => {
      if (!chapterId) return null;
      
      // Base fields for verses (Arabic only)
      const fields = ['text_uthmani', 'verse_number', 'verse_key'];
      
      let url = `https://api.quran.com/api/v4/verses/by_chapter/${chapterId}?fields=${fields.join(',')}`;
      
      if (page) {
        url += `&page=${page}`;
      }
      // Add per_page parameter for consistent pagination
      url += `&per_page=10`;
      
      return url;
    },
    fallbackPath: null,
    ttl: 30 * 24 * 60 * 60 * 1000, // 30 days
    description: "Quran verses by chapter API (Arabic only)",
  },

  quranChapterInfo: {
    key: "quranChapterInfo",
    buildUrl: ({ chapterId }) => {
      if (!chapterId) return null;
      return `https://api.quran.com/api/v4/chapters/${chapterId}/info`;
    },
    fallbackPath: null,
    ttl: 30 * 24 * 60 * 60 * 1000, // 30 days
    description: "Quran chapter info API",
  },
};

export const getEndpoint = (key) => {
  return ENDPOINTS[key] || null;
};


export const getAllEndpoints = () => {
  return ENDPOINTS;
};

export default ENDPOINTS;
