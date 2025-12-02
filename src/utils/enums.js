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
    "FooterText": {
        en: {
            line1: "© 2025 Abdul Majid Bhurgri Institute of Language Engineering",
            line2: "Culture, Tourism, Antiquities & Archives Department, Government of Sindh.",
        },
        ud: {
            line1: "© 2025 عبدالمجید بھرگری انسٹی ٹیوٹ آف لینگویج انجینئرنگ",
            line2: "ثقافت، سیاحت، آثار قدیمہ اور آرکائیوز ڈیپارٹمنٹ، حکومت سندھ۔",
        },
        sd: {
            line1: "© 2025 عبدالمجيد ڀرڳڙي انسٽيٽيوٽ آف لينگويج انجنيئرنگ",
            line2: "ثقافت، سياحت، آثار قديمه ۽ آرڪائيوز ڊپارٽمينٽ، حڪومت سنڌ۔",
        }
    }
};

const getTranslation = (key) => {
    const lang = getCurrentLanguage();
    return dictionary[key] ? dictionary[key][lang] || dictionary[key]['en'] : key;
}

export { getTranslation };
