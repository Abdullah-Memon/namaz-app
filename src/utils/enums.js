import Compass from "../components/compass";
import Tasbeeh from "../components/tasbeeh";
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
  CountryLabel: {
    en: "Country",
    sd: "ملڪ",
    ur: "ملک",
  },
  CityLabel: {
    en: "City",
    sd: "شهر",
    ur: "شہر",
  },
  LanguageLabel: {
    en: "Language",
    sd: "ٻولي",
    ur: "زبان",
  },
  ImamLabel: {
    en: "Imam",
    sd: "امام",
    ur: "امام",
  },
  SearchPlaceholder: {
    en: "Search...",
    sd: "ڳولا...",
    ur: "تلاش کریں...",
  },
  DateLabel: {
    en: "Date",
    sd: "تاريخ",
    ur: "تاریخ",
  },
  TimeLabel: {
    en: "Time",
    sd: "وقت",
    ur: "وقت",
  },
  NoDataFound: {
    en: "No data found",
    sd: "ڪو مواد نه مليو",
    ur: "کوئی مواد نہیں ملا",
  },
  EventLabel: {
    en: "Occasion of",
    sd: "موقعو",
    ur: "موقع",
  },
  CelebrateByLabel: {
    en: "Celebrate by",
    sd: " ملهائڻ وارا",
    ur: " منانے والا",
  },
  FooterText: {
    en: {
      line1: "© 2025 Abdul Majid Bhurgri Institute of Language Engineering",
      line2:
        "Culture, Tourism, Antiquities & Archives Department, Government of Sindh.",
    },
    ur: {
      line1: "© 2025 عبدالمجید بھرگری انسٹی ٹیوٹ آف لینگویج انجینئرنگ",
      line2: "ثقافت، سیاحت، آثار قدیمہ اور آرکائیوز ڈیپارٹمنٹ، حکومت سندھ۔",
    },
    sd: {
      line1: "© 2025 عبدالمجيد ڀرڳڙي انسٽيٽيوٽ آف لينگويج انجنيئرنگ",
      line2: "ثقافت، سياحت، آثار قديمه ۽ آرڪائيوز ڊپارٽمينٽ، حڪومت سنڌ۔",
    },
  },
  CompassTitle: {
    en: "Qibla Direction",
    sd: "قبلي جو رخ",
    ur: "قبلہ سمت",
  },
  CompassDescription: {
    en: "Find the accurate direction of Qibla using your device's compass or augmented reality view.",
    sd: "پنهنجي ڊوائيس جي ڪمپاس يا وڌايل حقيقت واري نظر استعمال ڪندي قبلي جو صحيح رخ ڳوليو.",
    ur: "اپنے ڈیوائس کے کمپاس یا آگمینٹڈ ریئلٹی ویو کا استعمال کرتے ہوئے قبلہ کی درست سمت تلاش کریں۔",
  },
  CompassTraditionalTab: {
    en: "Traditional Compass",
    sd: "روايتي ڪمپاس",
    ur: "روایتی کمپاس",
  },
  CompassARTab: {
    en: "AR Compass",
    sd: "اي آر ڪمپاس",
    ur: "اے آر کمپاس",
  },
  CompassExtraText: {
    en: {
      footer1: {
        title: "Accurate Direction",
        description:
          "Precisely calculated Qibla direction using your exact location",
      },
      footer2: {
        title: "Auto-Calibration",
        description:
          "Automatically adjusts for magnetic declination and device orientation",
      },
      footer3: {
        title: "Visual Feedback",
        description:
          "Clear visual indicators when you're perfectly aligned with Qibla",
      },
    },
    sd: {
      footer1: {
        title: "صحیح رخ",
        description: "توهان جي صحيح جڳھ استعمال ڪندي قبلي جو صحيح رخ ڳوليو",
      },
      footer2: {
        title: "خودڪار ڪيليبرشن",
        description:
          "مقناطيسي انحراف ۽ ڊوائيس جي رخ لاءِ پاڻمرادو ترتيب ڏئي ٿو",
      },
      footer3: {
        title: "بصري فيڊ بيڪ",
        description:
          "صاف بصري اشارا جڏهن توهان قبلي سان مڪمل طور تي هموار آهيو",
      },
    },
    ur: {
      footer1: {
        title: "درست سمت",
        description:
          "آپ کی درست جگہ استعمال کرتے ہوئے قبلہ کی درست سمت تلاش کریں",
      },
      footer2: {
        title: "خودکار کیلیبریشن",
        description:
          "مقناطیسی انحراف اور ڈیوائس کی سمت کے لیے خود بخود ایڈجسٹ کرتا ہے",
      },
      footer3: {
        title: "بصری تاثرات",
        description:
          "واضح بصری اشارے جب آپ قبلہ کے ساتھ مکمل طور پر سیدھ میں ہوتے ہیں",
      },
    },
  },
  QiblaDirectionLabel: {
    en: "Qibla Direction",
    sd: "قبلي جو رخ",
    ur: "قبلہ سمت",
  },

  TasbeehCounterTitle: {
    en: "Tasbeeh Counter",
    sd: "تسبیح ڪائونٽر",
    ur: "تسبیح کاؤنٹر",
  },
  TasbeehCounterDescription: {
    en: "A digital counter to help you keep track of your tasbeeh counts.",
    sd: "هڪ ڊجيٽل ڪائونٽر جيڪو توهان جي تسبیح ڳڻپ کي ٽريڪ ڪرڻ ۾ مدد ڪري ٿو.",
    ur: "ایک ڈیجیٹل کاؤنٹر جو آپ کی تسبیح گنتی کو ٹریک کرنے میں مدد کرتا ہے۔",
  },

  NavigationLabels: {
    en:{
      home: "Home",
      qibla: "Qibla",
      tasbeeh: "Tasbeeh",
    },
    sd:{
      home: "گهر",
      qibla: "قبلي",
      tasbeeh: "تسبیح",
    },
    ur:{
      home: "گھر",
      qibla: "قبلہ",
      tasbeeh: "تسبیح",
    }
  },

  TasbeehQuickTargetsTitle:{
    en: "Set your Goal",
    sd: "پنھنجو مقصد مقرر ڪريو",
    ur: "اپنا ہدف مقرر کریں",
  }
};
const getTranslation = (key) => {
  const lang = getCurrentLanguage();
  return dictionary[key] ? dictionary[key][lang] || dictionary[key]["en"] : key;
};

export { getTranslation };
