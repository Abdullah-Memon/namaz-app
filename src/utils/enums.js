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
      line1: "© 2025 عبدالماجد بھرگڑی انسٹی ٹیوٹ آف لینگویج انجنیئرنگ",
      line2: "محکمہ ثقافت، سیاحت، نوادرات و آرکائیوز، حکومت سندھ۔",
    },
    sd: {
      line1: "© 2025 عبدالماجد ڀرڳڙي انسٽيٽيوٽ آف لئنگئيج انجنيئرنگ ",
      line2: "ثقافت، سياحت، نوادرات ۽ آرڪائيوز کاتو، حڪومت سنڌ۔",
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
        title: "صحیح رُخ",
        description: "توهان جي موجودہ جڳهہ مطابق قبلي جي رُخ جو درست نموني ڪاٿو لڳايو ويو آھي",
      },
      footer2: {
        title: "پاڻمرادو دُرستگي",
        description:
          "پاڻمرادو طريقي سان ڊوائيس جو رُخ ۽ فرق درست ڪري ٿو",
      },
      footer3: {
        title: "واضح اشارو ",
        description:
          "قبلي ڏانهن رُخ درست ٿيڻ تي واضح طور اشارو ڏئي ٿو",
      },
    },
    ur: {
      footer1: {
        title: "درست سمت",
        description:
          "آپ کی درست جگہ استعمال کرتے ہوئے قبلہ کی درست سمت کا تعین کرتا ہے",
      },
      footer2: {
        title: "خودکار درستگی",
        description:
          "مقناطیسی انحراف اور ڈیوائس کی سمت کو خود بخود ٹھیک کرتا ہے",
      },
      footer3: {
        title: "بصری تاثرات",
        description:
          "جب آپ قبلہ کے عین مطابق ہوتے ہیں تو واضح  اشارے دکھاتا ہے",
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
      qibla: "قبلو",
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
      left: "کاٻي پاسي گهمايو",
      right: "ساڄي پاسي گهمايو",
      exactDirection: "درست رُخ",
      yourDirection: "توهان جو رُخ",
      facingDirection: "توھان جو رُخ قبلي ڏانهن آھي!",
      almostThere: "لڳ ڀڳ قبلي ڏانهن رُخ!",
    },
    ur: {
      left: "بائیں مڑیں",
      right: "دائیں مڑیں",
      exactDirection: "بالکل صحیح سمت",
      yourDirection: "آپ کی سمت",
      facingDirection: "آپ قبلہ کی سمت میں ہیں!",
      almostThere: "تقریباً قبلہ کی سمت!",
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
      currentTime: "موجودہ وقت",
      cityLabel: "شھر",
      searchPlaceholder: "ڳولا...",
      dateLabel: "تاريخ",
      eventLabel: "موقعو",
      celebrateByLabel: " ملهائڻ وارا",
      compassTitle: "قبلي جو رُخ",
      compassDescription:
        "پنھنجي ڊوائيس جي ڪمپاس يا آگمينٽڊ ريئلٽي وِيو استعمال ڪندي قبلي جو دُرست رُخ ڳوليو.",
      compassTraditionalTab: "ڪمپاس",
      compassARTab: "اَي آر ڪمپاس",
      nextPrayerLabel: "ايندڙ نماز",
      tasbeehCounterTitle: "تَسبِیحَ ڳَڻَڻِي",
      tasbeehCounterDescription:
        "ھڪ ڊجيٽل ڪائونٽر جيڪو توھان جي تَسبِيحَ جي ڳڻپَ کي محفوظ ڪرڻ ۾ مدد ڪري ٿو۔",
      tasbeehQuickTargetsTitle: "پنھنجو ھدف مقرر ڪريو",
      qiblaDirectionLabel: "قبلي جو رُخ",
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
      compassTraditionalTab: "کمپاس",
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
          "اَي آر ڪمپاس لاءِ ڪئميرا تائين رسائي ضروري آهي. مھرباني ڪري ڪئميرا جي اجازت ڏيو ۽ ٻيھر ڪوشش ڪريو.",
        generalError:
          "ڪئميرا تائين رسائي ممڪن ناهي. مھرباني ڪري ڪئميرا لاءِ اجازت ڏسو ۽ ٻيھر ڪوشش ڪريو.",
      },
      noDataFound: "ڪو بہ مواد نہ مليو",
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
