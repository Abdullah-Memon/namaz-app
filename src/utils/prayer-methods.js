import { getCurrentLanguage } from "./language";

const prayerMethods = 
[
  {
    "id": "jafari",
    "name": {
      en: "Jafari (Shia Ithna-Ashari)",
      ur: "جعفري (شیعہ اثنا عشری)",
      sd: "جعفري (شيعه اثنا عشري)"
    },
    "apiMethodId": 0,
    "description": {
      en: "Jafari method as used in Iran, Iraq",
      ur: "ایران، عراق میں استعمال ہونے والا جعفری طریقہ",
      sd: "ايران، عراق ۾ استعمال ٿيندڙ جعفري طريقو"
    },
    "fajrAngle": 16,
    "ishaAngle": 14,
    "school": "jafari",
    "region": "Iran, Iraq"
  },
  {
    "id": "karachi",
    "name": {
      en: "University of Islamic Sciences, Karachi",
      ur: "یونیورسٹی آف اسلامک سائنسز، کراچی",
      sd: "يونيورسٽي آف اسلامڪ سائنسز، ڪراچي"
    },
    "apiMethodId": 1,
    "description": {
      en: "University of Islamic Sciences, Karachi method",
      ur: "يونيورسٽي آف اسلامڪ سائنسز، ڪراچي جو طريقو",
      sd: "يونيورسٽي آف اسلامڪ سائنسز، ڪراچي جو طريقو"
    },
    "fajrAngle": 18,
    "ishaAngle": 18,
    "school": "hanafi",
    "region": "Pakistan, India, Bangladesh"
  },
  {
    "id": "isna",
    "name": {
      en: "Islamic Society of North America (ISNA)",
      ur: "اسلامک سوسائٹی آف نارتھ امریکہ (آئسنا)",
      sd: "اسلامي سوسائٽي آف نارٿ آمريڪا (اسنا)"
    },
    "apiMethodId": 2,
    "description": {
      en: "Islamic Society of North America calculation method",
      ur: "اسلامي سوسائٽي آف نارتھ امریکہ کا حسابی طریقہ",
      sd: "اسلامي سوسائٽي آف نارٿ آمريڪا جو حسابي طريقو"
    },
    "fajrAngle": 15,
    "ishaAngle": 15,
    "school": "shafi",
    "region": "North America"
  },
  {
    "id": "mwl",
    "name": {
      en: "Muslim World League",
      ur: "مسلم ورلڈ لیگ",
      sd: "مسلم ورلڊ ليگ"
    },
    "apiMethodId": 3,
    "description": {
      en: "Muslim World League calculation method",
      ur: "مسلم ورلڈ لیگ جو حسابی طریقہ",
      sd: "مسلم ورلڊ ليگ جو حسابي طريقو"
    },
    "fajrAngle": 18,
    "ishaAngle": 17,
    "school": "shafi",
    "region": "Europe, Far East, parts of US"
  },
  {
    "id": "mecca",
    "name": {
      en: "Umm Al-Qura University, Mecca",
      ur: "ام القري يونيورسٽي، مڪه",
      sd: "ام القري يونيورسٽي، مڪه"
    },
    "apiMethodId": 4,
    "description": {
      en: "Umm Al-Qura University, Mecca calculation method",
      ur: "ام القري يونيورسٽي، مڪه جو حسابي طريقو",
      sd: "ام القري يونيورسٽي، مڪه جو حسابي طريقو"
    },
    "fajrAngle": 18.5,
    "ishaFixed": "90 min",
    "school": "shafi",
    "region": "Saudi Arabia"
  },
  {
    "id": "egyptian",
    "name": {
      en: "Egyptian General Authority of Survey",
      ur: "مصري جنرل اٿارٽي آف سروي",
      sd: "مصري جنرل اٿارٽي آف سروي"
    },
    "apiMethodId": 5,
    "description": {
      en: "Egyptian General Authority of Survey calculation method",
      ur: "مصري جنرل اٿارٽي آف سروي جو حسابي طريقو",
      sd: "مصري جنرل اٿارٽي آف سروي جو حسابي طريقو"
    },
    "fajrAngle": 19.5,
    "ishaAngle": 17.5,
    "school": "shafi",
    "region": "Africa, Syria, Iraq, Lebanon, Malaysia, Parts of the USA"
  },
  {
    "id": "custom",
    "name": {
      en: "Custom Setting",
      ur: "کسٹم سیٹنگ",
      sd: "ڪسٽم سيٽنگ"
    },
    "apiMethodId": 6,
    "description": {
      en: "Custom calculation method with user-defined parameters",
      ur: "ڪسٽم حسابي طريقو يوزر جي مقرر ڪيل پيرا ميٽرن سان",
      sd: "ڪسٽم حسابي طريقو يوزر جي مقرر ڪيل پيرا ميٽرن سان"
    },
    "fajrAngle": 18,
    "ishaAngle": 18,
    "school": "hanafi",
    "region": "Global (Customizable)"
  },
  {
    "id": "tehran",
    "name": {
      en: "Institute of Geophysics, University of Tehran",
      ur: "انسٹی ٹیوٹ آف جیو فزکس، یونیورسٹی آف تہران",
      sd: "انسٽيٽيوٽ آف جيو فزڪس، يونيورسٽي آف تهران"
    },
    "apiMethodId": 7,
    "description":{
      en: "Institute of Geophysics, University of Tehran calculation method",
      ur: "انسٹی ٹیوٹ آف جیو فزکس، یونیورسٹی آف تہران کا حسابی طریقہ",
      sd: "انسٽيٽيوٽ آف جيو فزڪس، يونيورسٽي آف تهران جو حسابي طريقو"
    },
    "description_sd": "انسٽيٽيوٽ آف جيو فزڪس، يونيورسٽي آف تهران جو حسابي طريقو",
    "fajrAngle": 17.7,
    "ishaAngle": 14,
    "school": "jafari",
    "region": "Iran"
  },
  {
    "id": "gulf",
    "name": {
      en: "Gulf Region",
      ur: "خلیج علاقہ",
      sd: "خليج علائقو"
    },
    "name_sd": "خليج علائقو",
    "apiMethodId": 8,
    "description": "Gulf Region calculation method",
    "description_sd": "خليج علائقي جو حسابي طريقو",
    "fajrAngle": 19.5,
    "ishaFixed": "90 min",
    "school": "shafi",
    "region": "Kuwait, Qatar, Bahrain, Oman, UAE"
  },
  {
    "id": "kuwait",
    "name": {
      en: "Kuwait Ministry of Awqaf and Islamic Affairs",
      ur: "کویت وزارت اوقاف و امور اسلامی",
      sd: "ڪويت وزارت اوقاف ۽ اسلامي معاملن"
    },
    "apiMethodId": 9,
    "description": {
      en: "Kuwait calculation method",
      ur: "کویت کا حسابی طریقہ",
      sd: "ڪويت جو حسابي طريقو"
    },
    "fajrAngle": 18,
    "ishaAngle": 17.5,
    "school": "shafi",
    "region": "Kuwait"
  },
  {
    "id": "qatar",
    "name": {
      en: "Qatar Ministry of Awqaf and Islamic Affairs",
      ur: "قطر وزارت اوقاف و امور اسلامی",
      sd: "قطر وزارت اوقاف ۽ اسلامي معاملن"
    },
    "apiMethodId": 10,
    "description": {
      en: "Qatar calculation method",
      ur: "قطر کا حسابی طریقہ",
      sd: "قطر جو حسابي طريقو"
    },
    "fajrAngle": 18,
    "ishaFixed": "90 min",
    "school": "shafi",
    "region": "Qatar"
  },
  {
    "id": "singapore",
    "name": {
      en: "Majlis Ugama Islam Singapura",
      ur: "مجلس عوام اسلام سنگاپور",
      sd: "مجلس عوام اسلام سنگاپور"
    },
    "apiMethodId": 11,
    "description": {
      en: "Majlis Ugama Islam Singapura calculation method",
      ur: "مجلس عوام اسلام سنگاپور کا حسابی طریقہ",
      sd: "مجلس عوام اسلام سنگاپور جو حسابي طريقو"
    },
    "fajrAngle": 20,
    "ishaAngle": 18,
    "school": "shafi",
    "region": "Singapore, Malaysia, Brunei"
  },
  {
    "id": "france",
    "name": {
      en: "Union Organization islamic de France",
      ur: "یونین آرگنائيزيشن اسلامک ڈی فرانس",
      sd: "يونين آرگنائيزيشن اسلامڪ ڊي فرانس"
    },
    "apiMethodId": 12,
    "description": {
      en: "Union Organization islamic de France calculation method",
      ur: "یونین آرگنائيزيشن اسلامک ڈی فرانس کا حسابی طریقہ",
      sd: "يونين آرگنائيزيشن اسلامڪ ڊي فرانس جو حسابي طريقو"
    },
    "fajrAngle": 12,
    "ishaAngle": 12,
    "school": "shafi",
    "region": "France"
  },
  {
    "id": "turkey",
    "name": {
      en: "Diyanet İşleri Başkanlığı",
      ur: "ديانت اشليري باشڪانليگي",
      sd: "ديانت اشليري باشڪانليگي"
    },
    "apiMethodId": 13,
    "description": {
      en: "Diyanet İşleri Başkanlığı calculation method",
      ur: "ديانت اشليري باشڪانليگي جو حسابي طريقو",
      sd: "ديانت اشليري باشڪانليگي جو حسابي طريقو"
    },
    "fajrAngle": 18,
    "ishaAngle": 17,
    "school": "hanafi",
    "region": "Turkey"
  },
  {
    "id": "russia",
    "name": {
      en: "Spiritual Administration of Muslims of Russia",
      ur: "روس کے مسلمانوں کی روحانی انتظامیہ",
      sd: "روس جي مسلمانن جي روحاني انتظاميه"
    },
    "apiMethodId": 14,
    "description": {
      en: "Spiritual Administration of Muslims of Russia calculation method",
      ur: "روس کے مسلمانوں کی روحانی انتظامیہ کا حسابی طریقہ",
      sd: "روس جي مسلمانن جي روحاني انتظاميه جو حسابي طريقو"
    },
    "fajrAngle": 16,
    "ishaAngle": 15,
    "school": "hanafi",
    "region": "Russia"
  }
];

const defaultPrayerMethodForCountries = {
  "PK": "karachi",
};

const getPrayerMethods = () => {

  const lang = getCurrentLanguage();

  return prayerMethods.map(method => ({
    label: method.name[lang],
    value: method.id
  }));
}

const getPrayerMethodById = (id) => {
  return prayerMethods.find(method => method.id === id);
}

export { getPrayerMethods, defaultPrayerMethodForCountries, getPrayerMethodById };