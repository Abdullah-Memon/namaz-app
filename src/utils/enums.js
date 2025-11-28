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
    DateLabel:{
        en: "Date",
        sd: "تاريخ",
        ur: "تاریخ",
    },
    TimeLabel:{
        en: "Time",
        sd: "وقت",
        ur: "وقت",
    },
    NoDataFound:{
        en: "No data found",
        sd: "ڪو مواد نه مليو",
        ur: "کوئی مواد نہیں ملا",
    },
    EventLabel:{
        en: "Occasion of",
        sd: "موقعو",
        ur: "موقع",
    },
    CelebrateByLabel:{
        en: "Celebrate by",
        sd: " ملهائڻ وارا",
        ur: " منانے والا",
    },
};

const getTranslation = (key) => {
    const lang = getCurrentLanguage();
    return dictionary[key] ? dictionary[key][lang] || dictionary[key]['en'] : key;
}

export { getTranslation };
