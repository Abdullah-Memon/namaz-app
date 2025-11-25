import { getCurrentLanguage } from "./language";
const dictionary = {
    AppName: {
        en: "Namaz",
        sd: "نماز",
        ur: "نماز",
    },
    basicInfoTitle: {
        en: "Basic Information",
        sd: "بنيادي معلومات",
        ur: "بنیادی معلومات",
    },
    CountryLabel:{
        en: "Country",
        sd: "ملڪ",
        ur: "ملک",
    },
    CityLabel:{
        en: "City",
        sd: "شهر",
        ur: "شہر",
    },
    LanguageLabel:{
        en: "Language",
        sd: "ٻولي",
        ur: "زبان",
    },
    ImamLabel:{
        en: "Imam",
        sd: "امام",
        ur: "امام",
    },
    SearchPlaceholder:{
        en: "Search...",
        sd: "ڳولا...",
        ur: "تلاش کریں...",
    },
};

const getTranslation = (key) => {
    const lang = getCurrentLanguage();
    return dictionary[key] ? dictionary[key][lang] || dictionary[key]['en'] : key;
}

export { getTranslation };
