import { getCurrentLanguage } from "./language";

const eventTypes = {
  celebration: "Celebration",
  worship: "Worship",
  sad: "Sad",
  fasting: "Fasting",
  pilgrimage: "Pilgrimage",
  commemoration: "Commemoration",
};

const observedBy = {
  allMuslims: "All Muslims",
  shia: "Shia",
  sunni: "Sunni",
  shiaPrimarily: "Shia (primarily)",
  sunniPrimarily: "Sunni (primarily)",
  shiaAndSomeSunni: "Shia + many Sunni",
};

const events = [
  {
    id: 1,
    date: { startDate: { month: 1, day: 1 }, endDate: { month: 1, day: 1 } },
    event: {
      en: "Islamic New Year",
      ur: "اسلامی نیا سال",
      sd: "اسلامي نئون سال",
    },
    description: {
      en: "The first day of Muharram, marking the beginning of the new Islamic lunar year.",
      ur: "محرم الحرام کا پہلا دن، اسلامی قمری سال کا آغاز۔",
      sd: "محرم الحرام جو پهريون ڏينهن، اسلامي قمري سال جي شروعات.",
    },
    observed_by: observedBy.allMuslims,
    type: eventTypes.commemoration,
  },
  {
    id: 2,
    date: { startDate: { month: 1, day: 10 }, endDate: { month: 1, day: 10 } },
    event: { en: "Ashura", ur: "عاشورہ", sd: "عاشورو" },
    description: {
      en: "Day of martyrdom of Imam Husayn (a.s.) in Karbala (Shia: intense mourning). Sunni: recommended fasting in gratitude for Prophet Musa (a.s.).",
      ur: "کربلا میں امام حسینؑ کی شہادت کا دن (شیعہ: شدید غم). اہل سنت: حضرت موسیٰؑ کی نجات کی یاد میں مستحب روزہ۔",
      sd: "ڪربلا ۾ امام حسين عليه السلام جي شهادت جو ڏينهن (شيعہ: شديد غم). اهل سنت: حضرت موسى عليه السلام جي نجات جي ياد ۾ مستحب روزو.",
    },
    observed_by: observedBy.allMuslims,
    type: eventTypes.sad,
  },
  {
    id: 3,
    date: { startDate: { month: 2, day: 20 }, endDate: { month: 2, day: 20 } },
    event: { en: "Arba'een", ur: "اربعین", sd: "اربعين" },
    description: {
      en: "40th day after Ashura. World's largest annual pilgrimage to Karbala in memory of Imam Husayn (a.s.).",
      ur: "عاشورہ کے 40ویں دن۔ امام حسینؑ کی یاد میں کربلا کا سب سے بڑا سالانہ زیارتی اجتماع۔",
      sd: "عاشورا کان 40هين ڏينهن. امام حسين عليه السلام جي ياد ۾ ڪربلا جو سڀ کان وڏو ساليانو زيارتي اجتماع.",
    },
    observed_by: observedBy.shia,
    type: eventTypes.pilgrimage,
  },
  {
    id: 4,
    date: { startDate: { month: 3, day: 12 }, endDate: { month: 3, day: 12 } },
    event: {
      en: "Eid Milad un-Nabi",
      ur: "عید میلاد النبیؐ",
      sd: "عيد ميلاد النبي ﷺ",
    },
    description: {
      en: "Commemoration of the birth and death of Prophet Muhammad ﷺ (Sunni majority date).",
      ur: "نبی اکرمؐ کی ولادت اور وصال کی یاد (اہل سنت کی اکثریتی تاریخ)۔",
      sd: "نبي ڪريم صلي الله عليه وسلم جي ولادت ۽ وصال جي ياد (اهل سنت جي اڪثريت واري تاريخ).",
    },
    observed_by: observedBy.sunniPrimarily,
    type: eventTypes.celebration,
  },
  {
    id: 5,
    date: { startDate: { month: 3, day: 17 }, endDate: { month: 3, day: 17 } },
    event: {
      en: "Mawlid an-Nabi & Imam Ja'far Sadiq (a.s.)",
      ur: "میلاد النبیؐ و امام جعفر صادقؑ",
      sd: "ميلاد النبي ۽ امام جعفر صادق عليه السلام",
    },
    description: {
      en: "Birth of Prophet Muhammad ﷺ and 6th Imam Ja'far al-Sadiq (a.s.) according to Shia tradition.",
      ur: "شیعہ روایت کے مطابق نبی اکرمؐ اور امام جعفر صادقؑ کی ولادت۔",
      sd: "شيعہ روايت مطابق نبي ڪريم صلي الله عليه وسلم ۽ امام جعفر صادق عليه السلام جي ولادت.",
    },
    observed_by: observedBy.shia,
    type: eventTypes.celebration,
  },
  {
    id: 6,
    date: { startDate: { month: 7, day: 13 }, endDate: { month: 7, day: 13 } },
    event: {
      en: "Birth of Imam Ali (a.s.)",
      ur: "ولادت امام علیؑ",
      sd: "ولادت امام علي عليه السلام",
    },
    description: {
      en: "Birth anniversary of Imam Ali ibn Abi Talib (a.s.) inside the Kaaba.",
      ur: "خانہ کعبہ میں امام علی ابن ابی طالبؑ کی ولادت۔",
      sd: "خانہ ڪعبہ ۾ امام علي ابن ابي طالب عليه السلام جي ولادت.",
    },
    observed_by: observedBy.shiaAndSomeSunni,
    type: eventTypes.celebration,
  },
  {
    id: 7,
    date: { startDate: { month: 7, day: 27 }, endDate: { month: 7, day: 27 } },
    event: { en: "Laylat al-Mi'raj", ur: "شب معراج", sd: "شب معراج" },
    description: {
      en: "Night Journey (Isra) and Ascension (Mi'raj) of Prophet Muhammad ﷺ.",
      ur: "نبی اکرمؐ کا سفر اسراء و معراج۔",
      sd: "نبي ڪريم صلي الله عليه وسلم جو سفر اسراء ۽ معراج.",
    },
    observed_by: observedBy.allMuslims,
    type: eventTypes.worship,
  },
  {
    id: 8,
    date: { startDate: { month: 8, day: 15 }, endDate: { month: 8, day: 15 } },
    event: {
      en: "Birth of Imam Mahdi (a.j.)",
      ur: "ولادت امام مہدیؑ",
      sd: "ولادت امام مہدي عليه السلام",
    },
    description: {
      en: "Birth of the 12th Imam, Muhammad al-Mahdi (a.j.), the Awaited Savior. Also known as Shab-e-Barat.",
      ur: "بارہویں امام حضرت محمد المہدی صاحب الزمانؑ کی ولادت (شب برات)۔",
      sd: "ٻارهين امام حضرت محمد المہدي صاحب الزمان عليه السلام جي ولادت (شب برات).",
    },
    observed_by: observedBy.shiaPrimarily,
    type: eventTypes.celebration,
  },
  {
    id: 9,
    date: { startDate: { month: 9, day: 1 }, endDate: { month: 9, day: 30 } },
    event: { en: "Month of Ramadan", ur: "ماہ رمضان", sd: "رمضان جو مهينو" },
    description: {
      en: "Holy month of fasting from dawn to sunset. Includes Laylat al-Qadr (Night of Power).",
      ur: "رمضان المبارک – طلوع آفتاب سے غروب آفتاب تک روزے۔ شب قدر شامل۔",
      sd: "رمضان المبارڪ – سج لهڻ کان سج لهڻ تائين روزا. شب قدر شامل.",
    },
    observed_by: observedBy.allMuslims,
    type: eventTypes.fasting,
  },
  {
    id: 10,
    date: { startDate: { month: 9, day: 21 }, endDate: { month: 9, day: 21 } },
    event: {
      en: "Martyrdom of Imam Ali (a.s.)",
      ur: "شہادت امام علیؑ",
      sd: "شہادت امام علي عليه السلام",
    },
    description: {
      en: "Martyrdom anniversary of Imam Ali (a.s.) in the Mosque of Kufa.",
      ur: "مسجد کوفہ میں امام علیؑ کی شہادت۔",
      sd: "مسجد ڪوفہ ۾ امام علي عليه السلام جي شهادت.",
    },
    observed_by: observedBy.shia,
    type: eventTypes.sad,
  },
  {
    id: 11,
    date: { startDate: { month: 10, day: 1 }, endDate: { month: 10, day: 1 } },
    event: { en: "Eid al-Fitr", ur: "عید الفطر", sd: "عيد الفطر" },
    description: {
      en: "Festival of breaking the fast after Ramadan.",
      ur: "رمضان کے روزوں کے بعد عید الفرح و خوشی۔",
      sd: "رمضان جي روزن کان پوءِ خوشي جو عيد.",
    },
    observed_by: observedBy.allMuslims,
    type: eventTypes.celebration,
  },
  {
    id: 12,
    date: { startDate: { month: 12, day: 9 }, endDate: { month: 12, day: 9 } },
    event: { en: "Day of Arafah", ur: "یوم عرفہ", sd: "يوم عرفه" },
    description: {
      en: "Most important day of Hajj. Fasting highly recommended for non-pilgrims.",
      ur: "حج کا سب سے اہم دن۔ غیر حاجیوں کے لیے روزہ مستحب۔",
      sd: "حج جو سڀ کان اهم ڏينهن. غير حاجين لاءِ روزو مستحب.",
    },
    observed_by: observedBy.allMuslims,
    type: eventTypes.worship,
  },
  {
    id: 13,
    date: {
      startDate: { month: 12, day: 10 },
      endDate: { month: 12, day: 10 },
    },
    event: { en: "Eid al-Adha", ur: "عید الاضحیٰ", sd: "عيد الاضحیٰ" },
    description: {
      en: "Festival of Sacrifice commemorating Prophet Ibrahim's (a.s.) willingness to sacrifice his son.",
      ur: "حضرت ابراہیمؑ کی قربانی کی یاد میں عید۔",
      sd: "حضرت ابراهيم عليه السلام جي قرباني جي ياد ۾ عيد.",
    },
    observed_by: observedBy.allMuslims,
    type: eventTypes.celebration,
  },
  {
    id: 14,
    date: {
      startDate: { month: 12, day: 18 },
      endDate: { month: 12, day: 18 },
    },
    event: { en: "Eid al-Ghadeer", ur: "عید غدیر", sd: "عيد غدير" },
    description: {
      en: "Commemoration of the appointment of Imam Ali (a.s.) as successor at Ghadir Khumm.",
      ur: "غدیر خم میں امام علیؑ کو جانشین مقرر کرنے کی یاد۔ شیعوں کی سب سے بڑی عید۔",
      sd: "غدير خم ۾ امام علي عليه السلام کي جانشين مقرر ڪرڻ جي ياد. شيعن جي سڀ کان وڏي عيد.",
    },
    observed_by: observedBy.shia,
    type: eventTypes.celebration,
  },
];

const getEvents = (month) => {
  const lang = getCurrentLanguage();

  if (month) {
    return events
      .filter((event) => event.date.startDate.month === month)
      .map((event) => ({
        id: event.id,
        name: event.event[lang],
        islamic_date: event.date,
        description: event.description ? event.description[lang] : "",
        type: event.type,
        observed_by: event.observed_by,
      }));
  } else {
    return events.map((event) => ({
      id: event.id,
      name: event.event[lang],
      islamic_date: event.date,
      description: event.description ? event.description[lang] : "",
      type: event.type,
      observed_by: event.observed_by,
    }));
  }
};

export { getEvents };
