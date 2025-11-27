import { getCurrentLanguage } from "./language";
const imamsList = {
  hanafi: {
    id: "hanafi",
    names: {
      en: "Imam Abu Hanifah (Hanafi)",
      ur: "امام ابو حنیفہ (حنفی)",
      sd: "امام ابو حنيفه (حنفي)",
    },
    school: "sunni",
    descriptions: {
      en: "Prevalent in Pakistan, India, Turkey, and Central Asia",
      ur: "پاکستان، ہندوستان، ترکی، وسطی ایشیا میں عام",
      sd: "پاڪستان، هندستان، ترڪي، وچ ايشيا ۾ عام",
    },
  },
  maliki: {
    id: "maliki",
    names: {
      ar: "امام مالڪ (مالڪي)",
      en: "Imam Malik (Maliki)",
      ur: "امام مالک (مالکی)",
      sd: "امام مالڪ (مالڪي)",
    },
    school: "sunni",
    descriptions: {
      en: "Common in North and West Africa",
      ur: "شمالی اور مغربی افریقہ میں عام",
      sd: "اتر ۽ اولهه آفريقا ۾ عام",
    },
  },
  shafii: {
    id: "shafii",
    names: {
      ar: "امام الشافعي (شافعي)",
      en: "Imam Shafi'i (Shafi'i)",
      ur: "امام شافعی (شافعی)",
      sd: "امام شافعي (شافعي)",
    },
    school: "sunni",
    descriptions: {
      en: "Prevalent in East Africa, Indonesia, Malaysia, Maldives",
      ur: "مشرقی افریقہ، انڈونیشیا، ملائیشیا، مالدیپ میں عام",
      sd: "اوڀر آفريقا، انڊونيشيا، ملائيشيا، مالديپ ۾ عام",
    },
  },
  hanbali: {
    id: "hanbali",
    names: {
      ar: "امام احمد بن حنبل (حنبلي)",
      en: "Imam Ahmad ibn Hanbal (Hanbali)",
      ur: "امام احمد بن حنبل (حنبلی)",
      sd: "امام احمد بن حنبل (حنبلي)",
    },
    school: "sunni",
    descriptions: {
      en: "Official in Saudi Arabia & Qatar",
      ur: "سعودی عرب اور قطر میں سرکاری",
      sd: "سعودي عرب ۽ قطر ۾ سرڪاري",
    },
  },
  jafari: {
    id: "jafari",
    names: {
      ar: "امام جعفر الصادق (جعفري)",
      en: "Imam Ja'far al-Sadiq (Jafari)",
      ur: "امام جعفر الصادق (جعفری)",
      sd: "امام جعفر الصادق (جعفري)",
    },
    school: "shia",
    descriptions: {
      en: "Followed by Twelver Shia Muslims (Pakistan, Iran, Iraq, Lebanon)",
      ur: "اثنا عشری شیعہ مسلمانوں کی پیروی (پاکستان، ایران، عراق، لبنان)",
      sd: "اٿن عشري شيعہ مسلمانن جي پيروي (پاڪستان، ايران، عراق، لبنان)",
    },
  },
};

const defaultImamForCountries = {
  "PK": 0, // Pakistan - Hanafi (1)
  "SA": 0, // Saudi Arabia - Shafi'i (0)
  "AE": 0, // UAE - Shafi'i (0)
  "EG": 0, // Egypt - Shafi'i (0)
  "ID": 0, // Indonesia - Shafi'i (0)
  "MY": 0, // Malaysia - Shafi'i (0)
};

const getImamList = () => {
  const currentLanguage = getCurrentLanguage();

  // return Object.values(imamsList).map(imam => ({
  //     label: imam.names[currentLanguage],
  //     value: imam.id
  // }));

  // for now return only 2 hanafi and shafii
  return [
    { label: imamsList.shafii.names[currentLanguage], value: "0" },
    { label: imamsList.hanafi.names[currentLanguage], value: "1" },
  ];
};

export { imamsList, getImamList, defaultImamForCountries };
