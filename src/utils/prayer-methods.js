const prayerMothods = 
[
  {
    "id": "jafari",
    "name": "Jafari (Shia Ithna-Ashari)",
    "name_sd": "جعفري (شيعه اثنا عشري)",
    "apiMethodId": 0,
    "description": "Shia Ithna-Ashari method",
    "description_sd": "شيعه اثنا عشري جو طريقو",
    "fajrAngle": 16,
    "ishaAngle": 14,
    "school": "jafari",
    "region": "Iran, Iraq"
  },
  {
    "id": "karachi",
    "name": "University of Islamic Sciences, Karachi",
    "name_sd": "يونيورسٽي آف اسلامڪ سائنسز، ڪراچي",
    "apiMethodId": 1,
    "description": "University of Islamic Sciences, Karachi method",
    "description_sd": "يونيورسٽي آف اسلامڪ سائنسز، ڪراچي جو طريقو",
    "fajrAngle": 18,
    "ishaAngle": 18,
    "school": "hanafi",
    "region": "Pakistan, India, Bangladesh"
  },
  {
    "id": "isna",
    "name": "Islamic Society of North America (ISNA)",
    "name_sd": "اسلامي سوسائٽي آف نارٿ آمريڪا (اسنا)",
    "apiMethodId": 2,
    "description": "Islamic Society of North America calculation method",
    "description_sd": "اسلامي سوسائٽي آف نارٿ آمريڪا جو حسابي طريقو",
    "fajrAngle": 15,
    "ishaAngle": 15,
    "school": "shafi",
    "region": "North America"
  },
  {
    "id": "mwl",
    "name": "Muslim World League",
    "name_sd": "مسلم ورلڊ ليگ",
    "apiMethodId": 3,
    "description": "Muslim World League calculation method",
    "description_sd": "مسلم ورلڊ ليگ جو حسابي طريقو",
    "fajrAngle": 18,
    "ishaAngle": 17,
    "school": "shafi",
    "region": "Europe, Far East, parts of US"
  },
  {
    "id": "mecca",
    "name": "Umm Al-Qura University, Mecca",
    "name_sd": "ام القري يونيورسٽي، مڪه",
    "apiMethodId": 4,
    "description": "Umm Al-Qura University, Mecca calculation method",
    "description_sd": "ام القري يونيورسٽي، مڪه جو حسابي طريقو",
    "fajrAngle": 18.5,
    "ishaFixed": "90 min",
    "school": "shafi",
    "region": "Saudi Arabia"
  },
  {
    "id": "egyptian",
    "name": "Egyptian General Authority of Survey",
    "name_sd": "مصري جنرل اٿارٽي آف سروي",
    "apiMethodId": 5,
    "description": "Egyptian General Authority of Survey calculation method",
    "description_sd": "مصري جنرل اٿارٽي آف سروي جو حسابي طريقو",
    "fajrAngle": 19.5,
    "ishaAngle": 17.5,
    "school": "shafi",
    "region": "Africa, Syria, Iraq, Lebanon, Malaysia, Parts of the USA"
  },
  {
    "id": "custom",
    "name": "Custom Setting",
    "name_sd": "ڪسٽم سيٽنگ",
    "apiMethodId": 6,
    "description": "Custom calculation method with user-defined parameters",
    "description_sd": "ڪسٽم حسابي طريقو يوزر جي مقرر ڪيل پيرا ميٽرن سان",
    "fajrAngle": 18,
    "ishaAngle": 18,
    "school": "hanafi",
    "region": "Global (Customizable)"
  },
  {
    "id": "tehran",
    "name": "Institute of Geophysics, University of Tehran",
    "name_sd": "انسٽيٽيوٽ آف جيو فزڪس، يونيورسٽي آف تهران",
    "apiMethodId": 7,
    "description": "Institute of Geophysics, University of Tehran calculation method",
    "description_sd": "انسٽيٽيوٽ آف جيو فزڪس، يونيورسٽي آف تهران جو حسابي طريقو",
    "fajrAngle": 17.7,
    "ishaAngle": 14,
    "school": "jafari",
    "region": "Iran"
  },
  {
    "id": "gulf",
    "name": "Gulf Region",
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
    "name": "Kuwait",
    "name_sd": "ڪويت",
    "apiMethodId": 9,
    "description": "Kuwait calculation method",
    "description_sd": "ڪويت جو حسابي طريقو",
    "fajrAngle": 18,
    "ishaAngle": 17.5,
    "school": "shafi",
    "region": "Kuwait"
  },
  {
    "id": "qatar",
    "name": "Qatar",
    "name_sd": "قطر",
    "apiMethodId": 10,
    "description": "Qatar calculation method",
    "description_sd": "قطر جو حسابي طريقو",
    "fajrAngle": 18,
    "ishaFixed": "90 min",
    "school": "shafi",
    "region": "Qatar"
  },
  {
    "id": "singapore",
    "name": "Majlis Ugama Islam Singapura, Singapore",
    "name_sd": "مجلس عاما اسلام سنگاپور، سنگاپور",
    "apiMethodId": 11,
    "description": "Majlis Ugama Islam Singapura calculation method",
    "description_sd": "مجلس عاما اسلام سنگاپور جو حسابي طريقو",
    "fajrAngle": 20,
    "ishaAngle": 18,
    "school": "shafi",
    "region": "Singapore, Malaysia, Brunei"
  },
  {
    "id": "france",
    "name": "Union Organization islamic de France",
    "name_sd": "يونين آرگنائيزيشن اسلامڪ ڊي فرانس",
    "apiMethodId": 12,
    "description": "Union Organization islamic de France calculation method",
    "description_sd": "يونين آرگنائيزيشن اسلامڪ ڊي فرانس جو حسابي طريقو",
    "fajrAngle": 12,
    "ishaAngle": 12,
    "school": "shafi",
    "region": "France"
  },
  {
    "id": "turkey",
    "name": "Diyanet İşleri Başkanlığı, Turkey",
    "name_sd": "ديانت اشليري باشڪانليگي، ترڪي",
    "apiMethodId": 13,
    "description": "Diyanet İşleri Başkanlığı calculation method",
    "description_sd": "ديانت اشليري باشڪانليگي جو حسابي طريقو",
    "fajrAngle": 18,
    "ishaAngle": 17,
    "school": "hanafi",
    "region": "Turkey"
  },
  {
    "id": "russia",
    "name": "Spiritual Administration of Muslims of Russia",
    "name_sd": "روس جي مسلمانن جي روحاني انتظاميه",
    "apiMethodId": 14,
    "description": "Spiritual Administration of Muslims of Russia calculation method",
    "description_sd": "روس جي مسلمانن جي روحاني انتظاميه جو حسابي طريقو",
    "fajrAngle": 16,
    "ishaAngle": 15,
    "school": "hanafi",
    "region": "Russia"
  }
];

const getPrayerMethods = () => {
  return prayerMothods;
}

export { getPrayerMethods };