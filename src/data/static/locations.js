import { getCurrentLanguage } from "../../utils/language";

const locations =[
  {
    "country": {
      "en": "Pakistan",
      "ur": "پاکستان",
      "sd": "پاڪستان"
    },
    "countryCode": "PK",
    "cities": [
      { 
        "id": "PK-KHI", 
        "city": {
          en: "Karachi",
          ur: "کراچی",
          sd: "ڪراچي"
        }, 
        "cityCode": "KHI",
        "lat": 24.8607, 
        "lng": 67.0011,
        "elevation": 8,
        "timezone": "UTC+5",
        "timezoneName": "Asia/Karachi",
        "method": "University of Islamic Sciences, Karachi"
      },
      {
        "id": "PK-LHR",
        "city": {
          en: "Lahore",
          ur: "لاہور",
          sd: "لاهور"
        },
        "cityCode": "LHR",
        "lat": 31.5204,
        "lng": 74.3587,
        "elevation": 217,
        "timezone": "UTC+5",
        "timezoneName": "Asia/Karachi",
        "method": "University of Islamic Sciences, Karachi"
      }
    ]
  }
]

const defaultCountry = "PK";
const defaultCity = "KHI";

const getCountryList = () => {
  return locations.map(location => ({
    label: location.country[getCurrentLanguage()],
    value: location.countryCode
  }));
}

const getCitysByCountryCode = (countryCode) => {
  const country = locations.find(location => location.countryCode === countryCode);
  return country ? country.cities.map(city => ({
    label: city.city[getCurrentLanguage()],
    value: city.cityCode
  })) : [];
}

const getCityByCityCode = (cityCode) => {
  for (const location of locations) {
    const city = location.cities.find(city => city.cityCode === cityCode);
    if (city) {
      return city;
    }
  }
  return null;
}

export {getCountryList, getCitysByCountryCode, getCityByCityCode, defaultCountry, defaultCity };