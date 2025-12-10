import { getCurrentLanguage } from "./language";

const dictionary = {
  AppName: {
    en: "Namaz",
    sd: "نماز",
    ur: "نماز",
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

  NavigationLabels: {
    en: {
      home: "Prayer",
      qibla: "Qibla",
      tasbeeh: "Tasbeeh",
    },
    sd: {
      home: "نماز",
      qibla: "قبلي",
      tasbeeh: "تسبیح",
    },
    ur: {
      home: "نماز",
      qibla: "قبلہ",
      tasbeeh: "تسبیح",
    },
  },

  Directions: {
    en: {
      left: "Turn Left",
      right: "Turn Right",
      extactDirection: "Exact Direction",
      yourDirection: "Your Direction",
      facingDirection: "You are facing qibla!",
      almostThere: "Almost There!",
    },
    sd: {
      left: "کاٻي طرف موڙيو",
      right: "ساڄي طرف موڙيو",
      exactDirection: "بلڪل صحيح رخ",
      yourDirection: "توهان جو رخ",
      facingDirection: "توهان قبلي ڏانهن منهن ڏئي رهيا آهيو!",
      almostThere: "تقريبن پهچي ويا آهيو!",
    },
    ur: {
      left: "بائیں مڑیں",
      right: "دائیں مڑیں",
      exactDirection: "بالکل صحیح سمت",
      yourDirection: "آپ کی سمت",
      facingDirection: "آپ قبلہ کی طرف مڑ رہے ہیں!",
      almostThere: "تقریباً پہنچ گئے ہیں!",
    },
  },

  ButtonTexts: {
    en: {
      reset: "Reset",
      set: "Set",
      exit: "Exit",
      refresh: "Refresh",
    },
    sd: {
      reset: "ري سيٽ ڪريو",
      set: "سيٽ ڪريو",
      exit: "بند ڪريو",
      refresh: "ري فريش ڪريو",
    },
    ur: {
      reset: "ری سیٹ کریں",
      set: "سیٹ کریں",
      exit: "بند کریں",
      refresh: "ری فریش کریں",
    },
  },

  LabelTexts: {
    en: {
      currentTime: "Current Time",
      cityLabel: "City",
      searchPlaceholder: "Search...",
      dateLabel: "Date",
      eventLabel: "Occasion of",
      celebrateByLabel: "Celebrate by",
      compassTitle: "Qibla Direction",
      compassDescription:
        "Find the accurate direction of Qibla using your device's compass or augmented reality view.",
      compassTraditionalTab: "Traditional Compass",
      compassARTab: "AR Compass",
      nextPrayerLabel: "Next Prayer",
      tasbeehCounterTitle: "Tasbeeh Counter",
      tasbeehCounterDescription:
        "A digital counter to help you keep track of your tasbeeh counts.",
      tasbeehQuickTargetsTitle: "Set your Goal",
      qiblaDirectionLabel: "Qibla Direction",
    },

    sd: {
      currentTime: "موجوده وقت",
      cityLabel: "شهر",
      searchPlaceholder: "ڳولا...",
      dateLabel: "تاريخ",
      eventLabel: "موقعو",
      celebrateByLabel: " ملهائڻ وارا",
      compassTitle: "قبلي جو رخ",
      compassDescription:
        "پنهنجي ڊوائيس جي ڪمپاس يا وڌايل حقيقت واري نظر استعمال ڪندي قبلي جي صحيح رخ ڳوليو.",
      compassTraditionalTab: "روايتي ڪمپاس",
      compassARTab: "اي آر ڪمپاس",
      nextPrayerLabel: "اڳيون نماز",
      tasbeehCounterTitle: "تسبیح کاؤنٹر",
      tasbeehCounterDescription:
        "ایک ڈیجیٹل کاؤنٹر جو آپ کی تسبیح گنتی کو ٹریک کرنے میں مدد کرتا ہے۔",
      tasbeehQuickTargetsTitle: "اپنا ہدف مقرر کریں",
      qiblaDirectionLabel: "قبلہ سمت",
    },

    ur: {
      currentTime: "موجودہ وقت",
      cityLabel: "شہر",
      searchPlaceholder: "تلاش کریں...",
      dateLabel: "تاریخ",
      eventLabel: "موقع",
      celebrateByLabel: " منانے والا",
      compassTitle: "قبلہ سمت",
      compassDescription:
        "اپنے ڈیوائس کے کمپاس یا آگمینٹڈ ریئلٹی ویو کا استعمال کرتے ہوئے قبلہ کی درست سمت تلاش کریں۔",
      compassTraditionalTab: "روایتی کمپاس",
      compassARTab: "اے آر کمپاس",
      nextPrayerLabel: "اگلی نماز",
      tasbeehCounterTitle: "تسبیح کاؤنٹر",
      tasbeehCounterDescription:
        "ایک ڈیجیٹل کاؤنٹر جو آپ کی تسبیح گنتی کو ٹریک کرنے میں مدد کرتا ہے۔",
      tasbeehQuickTargetsTitle: "اپنا ہدف مقرر کریں",
      qiblaDirectionLabel: "قبلہ سمت",
    },
  },

  Errors: {
    en: {
      camera: {
        accessDenied:
          "Camera access denied. Please allow camera permissions and try again.",
        generalError:
          "Unable to access camera. Please check permissions and try again.",
      },
      noDataFound: "No data found",
    },
    sd: {
      camera: {
        accessDenied:
          "اي آر ڪمپاس لاءِ ڪئميرا تائين رسائي ضروري آهي. مهرباني ڪري ڪئميرا جي اجازت ڏيو ۽ ٻيهر ڪوشش ڪريو.",
        generalError:
          "ڪئميرا تائين رسائي ممڪن ناهي. مهرباني ڪري اجازت چيڪ ڪريو ۽ ٻيهر ڪوشش ڪريو.",
      },
      noDataFound: "ڪو مواد نه مليو",
    },
    ur: {
      camera: {
        accessDenied:
          "اے آر کمپاس کے لیے کیمرہ تک رسائی ضروری ہے۔ براہ کرم کیمرہ کی اجازت دیں اور دوبارہ کوشش کریں۔",
        generalError:
          "کیمرہ تک رسائی ممکن نہیں ہے۔ براہ کرم اجازت چیک کریں اور دوبارہ کوشش کریں.",
      },
      noDataFound: "کوئی مواد نہیں ملا",
    },
  },
};
const getTranslation = (key) => {
  const lang = getCurrentLanguage();
  return dictionary[key] ? dictionary[key][lang] || dictionary[key]["en"] : key;
};

export { getTranslation };
