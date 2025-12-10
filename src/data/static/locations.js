import { getCurrentLanguage } from "../../utils/language";

const locations = [
  {
    country: {
      en: "Pakistan",
      ur: "پاکستان",
      sd: "پاڪستان",
    },
    countryCode: "PK",
    cities: [
      {
        id: "PK-HDD",
        city: { en: "Hyderabad", ur: "حیدرآباد", sd: "حيدرآباد" },
        cityCode: "HDD",
        lat: 25.396,
        lng: 68.3776,
        elevation: 23,
        timezone: "UTC+5",
        timezoneName: "Asia/Karachi",
        method: "University of Islamic Sciences, Karachi",
      },
      {
        id: "PK-JCD",
        city: { en: "Jacobabad", ur: "جیکب آباد", sd: "جيڪب آباد" },
        cityCode: "JCD",
        lat: 28.2811,
        lng: 68.4376,
        elevation: 60,
        timezone: "UTC+5",
        timezoneName: "Asia/Karachi",
        method: "University of Islamic Sciences, Karachi",
      },
      {
        id: "PK-KAM",
        city: {
          en: "Kamber Shahdadkot",
          ur: "قمبر شہدادکوٹ",
          sd: "قمبر شھدادڪوٽ",
        },
        cityCode: "KAM",
        lat: 27.587,
        lng: 67.998,
        elevation: 52,
        timezone: "UTC+5",
        timezoneName: "Asia/Karachi",
        method: "University of Islamic Sciences, Karachi",
      },
      {
        id: "PK-KSH",
        city: { en: "Kashmore", ur: "کش مور", sd: "ڪشمور" },
        cityCode: "KSH",
        lat: 28.433,
        lng: 69.583,
        elevation: 70,
        timezone: "UTC+5",
        timezoneName: "Asia/Karachi",
        method: "University of Islamic Sciences, Karachi",
      },
      {
        id: "PK-KHI",
        city: { en: "Karachi", ur: "کراچی ", sd: "ڪراچي " },
        cityCode: "KHC",
        lat: 24.94,
        lng: 67.05,
        elevation: 15,
        timezone: "UTC+5",
        timezoneName: "Asia/Karachi",
        method: "University of Islamic Sciences, Karachi",
      },
      {
        id: "PK-LRK",
        city: { en: "Larkana", ur: "لاڑکانہ", sd: "لاڙڪاڻو" },
        cityCode: "LRK",
        lat: 27.5589,
        lng: 68.2133,
        elevation: 53,
        timezone: "UTC+5",
        timezoneName: "Asia/Karachi",
        method: "University of Islamic Sciences, Karachi",
      },
      {
        id: "PK-MTI",
        city: { en: "Matiari", ur: "مٹیاری", sd: "مٽياري" },
        cityCode: "MTI",
        lat: 25.6,
        lng: 68.45,
        elevation: 20,
        timezone: "UTC+5",
        timezoneName: "Asia/Karachi",
        method: "University of Islamic Sciences, Karachi",
      },
      {
        id: "PK-MIR",
        city: { en: "Mirpur Khas", ur: "میرپور خاص", sd: "ميرپور خاص" },
        cityCode: "MIR",
        lat: 25.5269,
        lng: 69.0142,
        elevation: 23,
        timezone: "UTC+5",
        timezoneName: "Asia/Karachi",
        method: "University of Islamic Sciences, Karachi",
      },
      {
        id: "PK-NSH",
        city: {
          en: "Naushahro Feroze",
          ur: "نوشہرو فیروز",
          sd: "نوشهرو فیروز",
        },
        cityCode: "NSH",
        lat: 26.84,
        lng: 68.12,
        elevation: 38,
        timezone: "UTC+5",
        timezoneName: "Asia/Karachi",
        method: "University of Islamic Sciences, Karachi",
      },
      {
        id: "PK-QMB",
        city: {
          en: "Qambar Shahdadkot",
          ur: "قمبر شہدادکوٹ",
          sd: "قمبر شھدادڪوٽ",
        },
        cityCode: "QMB",
        lat: 27.587,
        lng: 67.998,
        elevation: 52,
        timezone: "UTC+5",
        timezoneName: "Asia/Karachi",
        method: "University of Islamic Sciences, Karachi",
      },
      {
        id: "PK-SBA",
        city: {
          en: "Shaheed Benazirabad (Nawabshah)",
          ur: "شہید بے نظیر آباد",
          sd: "شھيد بينظير آباد",
        },
        cityCode: "SBA",
        lat: 26.2442,
        lng: 68.4057,
        elevation: 30,
        timezone: "UTC+5",
        timezoneName: "Asia/Karachi",
        method: "University of Islamic Sciences, Karachi",
      },
      {
        id: "PK-SKJ",
        city: { en: "Shikarpur", ur: "شکارپور", sd: "شڪارپور" },
        cityCode: "SKJ",
        lat: 27.9556,
        lng: 68.6378,
        elevation: 65,
        timezone: "UTC+5",
        timezoneName: "Asia/Karachi",
        method: "University of Islamic Sciences, Karachi",
      },
      {
        id: "PK-SUK",
        city: { en: "Sukkur", ur: "سکھر", sd: "سکر" },
        cityCode: "SKZ",
        lat: 27.7052,
        lng: 68.8574,
        elevation: 67,
        timezone: "UTC+5",
        timezoneName: "Asia/Karachi",
        method: "University of Islamic Sciences, Karachi",
      },
      {
        id: "PK-TND",
        city: { en: "Tando Allahyar", ur: "ٹنڈو الہ یار", sd: "ٽنڊو الهيار" },
        cityCode: "TND",
        lat: 25.462,
        lng: 68.717,
        elevation: 20,
        timezone: "UTC+5",
        timezoneName: "Asia/Karachi",
        method: "University of Islamic Sciences, Karachi",
      },
      {
        id: "PK-TMK",
        city: {
          en: "Tando Muhammad Khan",
          ur: "ٹنڈو محمد خان",
          sd: "ٽنڊو محمد خان",
        },
        cityCode: "TMK",
        lat: 25.123,
        lng: 68.537,
        elevation: 18,
        timezone: "UTC+5",
        timezoneName: "Asia/Karachi",
        method: "University of Islamic Sciences, Karachi",
      },
      {
        id: "PK-THR",
        city: { en: "Tharparkar", ur: "تھرپارکر", sd: "ٿرپارڪر" },
        cityCode: "THR",
        lat: 24.75,
        lng: 69.8333,
        elevation: 10,
        timezone: "UTC+5",
        timezoneName: "Asia/Karachi",
        method: "University of Islamic Sciences, Karachi",
      },
      {
        id: "PK-UMP",
        city: { en: "Umerkot", ur: "عمر کوٹ", sd: "عمرڪوٽ" },
        cityCode: "UMP",
        lat: 25.363,
        lng: 69.736,
        elevation: 15,
        timezone: "UTC+5",
        timezoneName: "Asia/Karachi",
        method: "University of Islamic Sciences, Karachi",
      },
      {
        id: "PK-SJH",
        city: { en: "Sanghar", ur: "سانگھڑ", sd: "سانگهڙ" },
        cityCode: "SJH",
        lat: 26.046,
        lng: 68.948,
        elevation: 25,
        timezone: "UTC+5",
        timezoneName: "Asia/Karachi",
        method: "University of Islamic Sciences, Karachi",
      },
      {
        id: "PK-THA",
        city: { en: "Thatta", ur: "ٹھٹہ", sd: "ٺٽو" },
        cityCode: "THA",
        lat: 24.747,
        lng: 67.923,
        elevation: 10,
        timezone: "UTC+5",
        timezoneName: "Asia/Karachi",
        method: "University of Islamic Sciences, Karachi",
      },
      {
        id: "PK-BDN",
        city: { en: "Badin", ur: "بدین", sd: "بدين" },
        cityCode: "BDN",
        lat: 24.656,
        lng: 68.838,
        elevation: 10,
        timezone: "UTC+5",
        timezoneName: "Asia/Karachi",
        method: "University of Islamic Sciences, Karachi",
      },
      {
        id: "PK-DAD",
        city: { en: "Dadu", ur: "دادو", sd: "دادو" },
        cityCode: "DAD",
        lat: 26.7304,
        lng: 67.775,
        elevation: 40,
        timezone: "UTC+5",
        timezoneName: "Asia/Karachi",
        method: "University of Islamic Sciences, Karachi",
      },
      {
        id: "PK-JAM",
        city: { en: "Jamshoro", ur: "جامشورو", sd: "ڄامشورو" },
        cityCode: "JAM",
        lat: 25.43,
        lng: 68.28,
        elevation: 25,
        timezone: "UTC+5",
        timezoneName: "Asia/Karachi",
        method: "University of Islamic Sciences, Karachi",
      },
      {
        id: "PK-SUJ",
        city: { en: "Sujawal", ur: "سجاول", sd: "سجاول" },
        cityCode: "SUJ",
        lat: 24.6,
        lng: 68.0833,
        elevation: 10,
        timezone: "UTC+5",
        timezoneName: "Asia/Karachi",
        method: "University of Islamic Sciences, Karachi",
      },
    ],
  },
];

const defaultCountry = "PK";
const defaultCity = "KHI";

const getCountryList = () => {
  return locations.map((location) => ({
    label: location.country[getCurrentLanguage()],
    value: location.countryCode,
  }));
};

const getCitysByCountryCode = (countryCode) => {
  const country = locations.find(
    (location) => location.countryCode === countryCode
  );
  return country
    ? country.cities.map((city) => ({
        label: city.city[getCurrentLanguage()],
        value: city.cityCode,
      }))
    : [];
};

const getCityByCityCode = (cityCode) => {
  if (!cityCode) return null;

  for (const location of locations) {
    const city = location.cities.find((city) => city.cityCode === cityCode);
    if (city) {
      return city;
    }
  }
  return null;
};

export {
  getCountryList,
  getCitysByCountryCode,
  getCityByCityCode,
  defaultCountry,
  defaultCity,
};
