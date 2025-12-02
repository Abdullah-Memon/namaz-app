import { getCurrentLanguage } from "../../utils/language";

const locations = [
  {
    "country": {
      "en": "Pakistan",
      "ur": "پاکستان",
      "sd": "پاڪستان"
    },
    "countryCode": "PK",
    "cities": [
      
      // Punjab (36 districts)
      // { "id": "PK-ATK", "city": { "en": "Attock", "ur": "اٹک", "sd": "اٽڪ" }, "cityCode": "ATK", "lat": 33.7660, "lng": 72.3605, "elevation": 350, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-BHW", "city": { "en": "Bahawalnagar", "ur": "بہاولنگر", "sd": "بهاولنگر" }, "cityCode": "BHW", "lat": 29.9984, "lng": 73.2527, "elevation": 158, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-BHP", "city": { "en": "Bahawalpur", "ur": "بہاولپور", "sd": "بهاولپور" }, "cityCode": "BHP", "lat": 29.3957, "lng": 71.6721, "elevation": 118, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-BHK", "city": { "en": "Bhakkar", "ur": "بھکر", "sd": "ڀڪر" }, "cityCode": "BHK", "lat": 31.6146, "lng": 71.0658, "elevation": 165, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-CHK", "city": { "en": "Chakwal", "ur": "چکوال", "sd": "چڪوال" }, "cityCode": "CHK", "lat": 32.9300, "lng": 72.8500, "elevation": 498, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-DGK", "city": { "en": "Dera Ghazi Khan", "ur": "ڈیرہ غازی خان", "sd": "ڊيره غازي خان" }, "cityCode": "DGK", "lat": 30.0325, "lng": 70.6403, "elevation": 123, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-FSL", "city": { "en": "Faisalabad", "ur": "فیصل آباد", "sd": "فيصل آباد" }, "cityCode": "LYP", "lat": 31.4180, "lng": 73.0790, "elevation": 186, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-GUJ", "city": { "en": "Gujranwala", "ur": "گوجرانوالہ", "sd": "گوجرانوالہ" }, "cityCode": "GRT", "lat": 32.1877, "lng": 74.1945, "elevation": 226, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-GUJ", "city": { "en": "Gujrat", "ur": "گجرات", "sd": "گجرات" }, "cityCode": "GRT", "lat": 32.5736, "lng": 74.0790, "elevation": 230, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-HAF", "city": { "en": "Hafizabad", "ur": "حافظ آباد", "sd": "حافظ آباد" }, "cityCode": "HAF", "lat": 32.0709, "lng": 73.6880, "elevation": 211, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-JHL", "city": { "en": "Jhang", "ur": "جھنگ", "sd": "جهنگ" }, "cityCode": "JHL", "lat": 31.2691, "lng": 72.3167, "elevation": 158, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-JHM", "city": { "en": "Jhelum", "ur": "جہلم", "sd": "جهلم" }, "cityCode": "JHM", "lat": 32.9405, "lng": 73.7257, "elevation": 233, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-KSR", "city": { "en": "Kasur", "ur": "قصور", "sd": "قصور" }, "cityCode": "KSR", "lat": 31.1167, "lng": 74.4500, "elevation": 199, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-KHN", "city": { "en": "Khanewal", "ur": "خانیوال", "sd": "خانيوال" }, "cityCode": "KHN", "lat": 30.3036, "lng": 71.9321, "elevation": 128, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-KHW", "city": { "en": "Khushab", "ur": "خوشاب", "sd": "خوشاب" }, "cityCode": "KHW", "lat": 32.2989, "lng": 72.3489, "elevation": 186, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-LAY", "city": { "en": "Layyah", "ur": "لیہ", "sd": "ليہ" }, "cityCode": "LAY", "lat": 30.9611, "lng": 70.9390, "elevation": 143, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-LDW", "city": { "en": "Lodhran", "ur": "لودھراں", "sd": "لودھراں" }, "cityCode": "LDW", "lat": 29.5380, "lng": 71.6333, "elevation": 118, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-MBD", "city": { "en": "Mandi Bahauddin", "ur": "منڈی بہاؤالدین", "sd": "منڊي بهاؤالدين" }, "cityCode": "MBD", "lat": 32.5870, "lng": 73.4910, "elevation": 204, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-MFT", "city": { "en": "Muzaffargarh", "ur": "مظفر گڑھ", "sd": "مظفرگڙھ" }, "cityCode": "MFT", "lat": 30.0703, "lng": 71.1933, "elevation": 123, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-MLT", "city": { "en": "Multan", "ur": "ملتان", "sd": "ملتان" }, "cityCode": "MUX", "lat": 30.1575, "lng": 71.5249, "elevation": 122, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-NKB", "city": { "en": "Nankana Sahib", "ur": "ننکانہ صاحب", "sd": "ننڪانه صاحب" }, "cityCode": "NKB", "lat": 31.4490, "lng": 73.7060, "elevation": 187, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-NWL", "city": { "en": "Narowal", "ur": "نارووال", "sd": "نارووال" }, "cityCode": "NWL", "lat": 32.1020, "lng": 74.8730, "elevation": 222, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-OKA", "city": { "en": "Okara", "ur": "اوکاڑہ", "sd": "اوڪاڙه" }, "cityCode": "OKA", "lat": 30.8090, "lng": 73.4480, "elevation": 175, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-PKP", "city": { "en": "Pakpattan", "ur": "پاکپتن", "sd": "پاڪپتن" }, "cityCode": "PKP", "lat": 30.3500, "lng": 73.3833, "elevation": 162, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-RYK", "city": { "en": "Rahim Yar Khan", "ur": "رحیم یار خان", "sd": "رحيم يار خان" }, "cityCode": "RYK", "lat": 28.4207, "lng": 70.2987, "elevation": 83, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-RJP", "city": { "en": "Rajanpur", "ur": "راجن پور", "sd": "راڄنپور" }, "cityCode": "RJP", "lat": 29.1040, "lng": 70.3300, "elevation": 96, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-RWP", "city": { "en": "Rawalpindi", "ur": "راولپنڈی", "sd": "راولپنڊي" }, "cityCode": "ISB", "lat": 33.5651, "lng": 73.0169, "elevation": 508, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-SGD", "city": { "en": "Sargodha", "ur": "سرگودھا", "sd": "سرگودھا" }, "cityCode": "SGD", "lat": 32.0836, "lng": 72.6711, "elevation": 190, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-SWL", "city": { "en": "Sheikhupura", "ur": "شیخوپورہ", "sd": "شيخوپوره" }, "cityCode": "SWL", "lat": 31.7167, "lng": 73.9850, "elevation": 204, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-SKT", "city": { "en": "Sialkot", "ur": "سیالکوٹ", "sd": "سيالڪوٽ" }, "cityCode": "SKT", "lat": 32.4945, "lng": 74.5229, "elevation": 256, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-TTS", "city": { "en": "Toba Tek Singh", "ur": "ٹوبہ ٹیک سنگھ", "sd": "ٽوبھ ٽيڪ سنگھ" }, "cityCode": "TTS", "lat": 30.9700, "lng": 72.4830, "elevation": 171, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-VRI", "city": { "en": "Vehari", "ur": "وہاڑی", "sd": "وهاري" }, "cityCode": "VRI", "lat": 30.0453, "lng": 72.3485, "elevation": 140, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },

      // Sindh (30 districts)
      { "id": "PK-HDD", "city": { "en": "Hyderabad", "ur": "حیدرآباد", "sd": "حيدرآباد" }, "cityCode": "HDD", "lat": 25.3960, "lng": 68.3776, "elevation": 23, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      { "id": "PK-JCD", "city": { "en": "Jacobabad", "ur": "جیکب آباد", "sd": "جاڪب آباد" }, "cityCode": "JCD", "lat": 28.2811, "lng": 68.4376, "elevation": 60, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      { "id": "PK-KAM", "city": { "en": "Kamber Shahdadkot", "ur": "قمبر شہدادکوٹ", "sd": "قمبر شهدادڪوٽ" }, "cityCode": "KAM", "lat": 27.5870, "lng": 67.9980, "elevation": 52, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      { "id": "PK-KSH", "city": { "en": "Kashmore", "ur": "کش مور", "sd": "ڪشمور" }, "cityCode": "KSH", "lat": 28.4330, "lng": 69.5830, "elevation": 70, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      { "id": "PK-KHI", "city": { "en": "Karachi", "ur": "کراچی ", "sd": "ڪراچي " }, "cityCode": "KHC", "lat": 24.9400, "lng": 67.0500, "elevation": 15, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-KHI-E", "city": { "en": "Karachi East", "ur": "کراچی مشرقی", "sd": "ڪراچي اوڀر" }, "cityCode": "KHE", "lat": 24.8667, "lng": 67.0667, "elevation": 18, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-KHI-S", "city": { "en": "Karachi South", "ur": "کراچی جنوبی", "sd": "ڪراچي ڏکڻ" }, "cityCode": "KHS", "lat": 24.8500, "lng": 67.0200, "elevation": 10, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-KHI-W", "city": { "en": "Karachi West", "ur": "کراچی غربی", "sd": "ڪراچي اولهه" }, "cityCode": "KHW", "lat": 24.9500, "lng": 66.9700, "elevation": 30, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-KOR", "city": { "en": "Korangi", "ur": "کورنگی", "sd": "ڪورنگي" }, "cityCode": "KOR", "lat": 24.8333, "lng": 67.1333, "elevation": 15, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-MLR", "city": { "en": "Malir", "ur": "ملیر", "sd": "ملير" }, "cityCode": "MLR", "lat": 24.9500, "lng": 67.2000, "elevation": 40, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-KHI-K", "city": { "en": "Keamari", "ur": "کیماڑی", "sd": "ڪياماڙي" }, "cityCode": "KMR", "lat": 24.8200, "lng": 66.9700, "elevation": 5, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      { "id": "PK-LRK", "city": { "en": "Larkana", "ur": "لاڑکانہ", "sd": "لاڙڪاڻو" }, "cityCode": "LRK", "lat": 27.5589, "lng": 68.2133, "elevation": 53, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      { "id": "PK-MTI", "city": { "en": "Matiari", "ur": "مٹیاری", "sd": "مٽياري" }, "cityCode": "MTI", "lat": 25.6000, "lng": 68.4500, "elevation": 20, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      { "id": "PK-MIR", "city": { "en": "Mirpur Khas", "ur": "میرپور خاص", "sd": "ميرپور خاص" }, "cityCode": "MIR", "lat": 25.5269, "lng": 69.0142, "elevation": 23, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      { "id": "PK-NSH", "city": { "en": "Naushahro Feroze", "ur": "نوشہرو فیروز", "sd": "نوشهرو فیروز" }, "cityCode": "NSH", "lat": 26.8400, "lng": 68.1200, "elevation": 38, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      { "id": "PK-QMB", "city": { "en": "Qambar Shahdadkot", "ur": "قمبر شہدادکوٹ", "sd": "قمبر شهدادڪوٽ" }, "cityCode": "QMB", "lat": 27.5870, "lng": 67.9980, "elevation": 52, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      { "id": "PK-SBA", "city": { "en": "Shaheed Benazirabad (Nawabshah)", "ur": "شہید بے نظیر آباد", "sd": "شهيد بينظير آباد" }, "cityCode": "SBA", "lat": 26.2442, "lng": 68.4057, "elevation": 30, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      { "id": "PK-SKJ", "city": { "en": "Shikarpur", "ur": "شکارپور", "sd": "شڪارپور" }, "cityCode": "SKJ", "lat": 27.9556, "lng": 68.6378, "elevation": 65, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      { "id": "PK-SUK", "city": { "en": "Sukkur", "ur": "سکھر", "sd": "سکر" }, "cityCode": "SKZ", "lat": 27.7052, "lng": 68.8574, "elevation": 67, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      { "id": "PK-TND", "city": { "en": "Tando Allahyar", "ur": "ٹنڈو الہ یار", "sd": "ٽنڊو الهيار" }, "cityCode": "TND", "lat": 25.4620, "lng": 68.7170, "elevation": 20, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      { "id": "PK-TMK", "city": { "en": "Tando Muhammad Khan", "ur": "ٹنڈو محمد خان", "sd": "ٽنڊو محمد خان" }, "cityCode": "TMK", "lat": 25.1230, "lng": 68.5370, "elevation": 18, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      { "id": "PK-THR", "city": { "en": "Tharparkar", "ur": "تھرپارکر", "sd": "ٿرپارڪر" }, "cityCode": "THR", "lat": 24.7500, "lng": 69.8333, "elevation": 10, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      { "id": "PK-UMP", "city": { "en": "Umerkot", "ur": "عمر کوٹ", "sd": "عمرڪوٽ" }, "cityCode": "UMP", "lat": 25.3630, "lng": 69.7360, "elevation": 15, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      { "id": "PK-SJH", "city": { "en": "Sanghar", "ur": "سانگھڑ", "sd": "سانگھڙ" }, "cityCode": "SJH", "lat": 26.0460, "lng": 68.9480, "elevation": 25, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      { "id": "PK-THA", "city": { "en": "Thatta", "ur": "ٹھٹہ", "sd": "ٺٽو" }, "cityCode": "THA", "lat": 24.7470, "lng": 67.9230, "elevation": 10, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      { "id": "PK-BDN", "city": { "en": "Badin", "ur": "بدین", "sd": "بدن" }, "cityCode": "BDN", "lat": 24.6560, "lng": 68.8380, "elevation": 10, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      { "id": "PK-DAD", "city": { "en": "Dadu", "ur": "دادو", "sd": "دادو" }, "cityCode": "DAD", "lat": 26.7304, "lng": 67.7750, "elevation": 40, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      { "id": "PK-JAM", "city": { "en": "Jamshoro", "ur": "جامشورو", "sd": "جامشورو" }, "cityCode": "JAM", "lat": 25.4300, "lng": 68.2800, "elevation": 25, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      { "id": "PK-SUJ", "city": { "en": "Sujawal", "ur": "سجاول", "sd": "سجاول" }, "cityCode": "SUJ", "lat": 24.6000, "lng": 68.0833, "elevation": 10, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },

      // Khyber Pakhtunkhwa (38 districts)
      // { "id": "PK-PSW", "city": { "en": "Peshawar", "ur": "پشاور", "sd": "پشاور" }, "cityCode": "PEW", "lat": 34.0150, "lng": 71.5249, "elevation": 359, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-ABD", "city": { "en": "Abbottabad", "ur": "ایبٹ آباد", "sd": "ايبٽ آباد" }, "cityCode": "ABD", "lat": 34.1550, "lng": 73.2190, "elevation": 1260, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-BNU", "city": { "en": "Bannu", "ur": "بنوں", "sd": "بنو" }, "cityCode": "BNU", "lat": 32.9890, "lng": 70.6050, "elevation": 371, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-BAT", "city": { "en": "Battagram", "ur": "بٹگرام", "sd": "بٽگرام" }, "cityCode": "BAT", "lat": 34.6800, "lng": 73.0330, "elevation": 1038, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-BUN", "city": { "en": "Buner", "ur": "بونیر", "sd": "بونير" }, "cityCode": "BUN", "lat": 34.4400, "lng": 72.4900, "elevation": 750, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-CHR", "city": { "en": "Charsadda", "ur": "چارسدہ", "sd": "چارشده" }, "cityCode": "CHR", "lat": 34.1500, "lng": 71.7333, "elevation": 300, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-DIR-L", "city": { "en": "Lower Dir", "ur": "لوئر دیر", "sd": "لوئر دير" }, "cityCode": "DIRL", "lat": 34.8500, "lng": 71.8500, "elevation": 800, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-DIR-U", "city": { "en": "Upper Dir", "ur": "اپر دیر", "sd": "اپر دير" }, "cityCode": "DIRU", "lat": 35.2000, "lng": 71.8000, "elevation": 1400, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-DIK", "city": { "en": "Dera Ismail Khan", "ur": "ڈیرہ اسماعیل خان", "sd": "ڊيره اسماعيل خان" }, "cityCode": "DIK", "lat": 31.8330, "lng": 70.9000, "elevation": 171, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-HGU", "city": { "en": "Hangu", "ur": "ہنگو", "sd": "هنگو" }, "cityCode": "HGU", "lat": 33.5280, "lng": 71.0600, "elevation": 860, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-HRP", "city": { "en": "Haripur", "ur": "ہری پور", "sd": "هري پور" }, "cityCode": "HRP", "lat": 33.9990, "lng": 72.9340, "elevation": 520, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-KAR", "city": { "en": "Karak", "ur": "کرک", "sd": "ڪرڪ" }, "cityCode": "KAR", "lat": 33.1100, "lng": 71.0800, "elevation": 570, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-KOH", "city": { "en": "Kohat", "ur": "کوہاٹ", "sd": "ڪوهاٽ" }, "cityCode": "KOH", "lat": 33.5830, "lng": 71.4330, "elevation": 512, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-KUR", "city": { "en": "Kurram", "ur": "کرم", "sd": "ڪرم" }, "cityCode": "KUR", "lat": 33.7500, "lng": 70.2500, "elevation": 850, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-LAK", "city": { "en": "Lakki Marwat", "ur": "لکی مروت", "sd": "لڪي ماروت" }, "cityCode": "LAK", "lat": 32.6000, "lng": 70.9170, "elevation": 290, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-MAL", "city": { "en": "Malakand", "ur": "مالاکنڈ", "sd": "مالاڪنڊ" }, "cityCode": "MAL", "lat": 34.5500, "lng": 71.9330, "elevation": 750, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-MAN", "city": { "en": "Mansehra", "ur": "مانسہرہ", "sd": "مانسهره" }, "cityCode": "MAN", "lat": 34.3330, "lng": 73.2000, "elevation": 1088, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-MARD", "city": { "en": "Mardan", "ur": "مردان", "sd": "مردان" }, "cityCode": "MARD", "lat": 34.2000, "lng": 72.0333, "elevation": 310, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-NOW", "city": { "en": "Nowshera", "ur": "نوشہرہ", "sd": "نوشهره" }, "cityCode": "NOW", "lat": 34.0100, "lng": 71.9800, "elevation": 300, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-SWD", "city": { "en": "Swat", "ur": "سوات", "sd": "سوات" }, "cityCode": "SWD", "lat": 35.2227, "lng": 72.4258, "elevation": 987, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-TNK", "city": { "en": "Tank", "ur": "ٹانک", "sd": "ٽانڪ" }, "cityCode": "TNK", "lat": 32.2200, "lng": 70.3800, "elevation": 260, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-TRS", "city": { "en": "Torghar", "ur": "تورغر", "sd": "تورغر" }, "cityCode": "TRS", "lat": 34.6130, "lng": 72.9800, "elevation": 1400, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },

      // Balochistan (35 districts)
      // { "id": "PK-QUA", "city": { "en": "Quetta", "ur": "کوئٹہ", "sd": "ڪوئٽه" }, "cityCode": "QUA", "lat": 30.1833, "lng": 67.0000, "elevation": 1680, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-ZHOB", "city": { "en": "Zhob", "ur": "ژوب", "sd": "ژوب" }, "cityCode": "ZHOB", "lat": 31.3411, "lng": 69.4489, "elevation": 1430, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-GWD", "city": { "en": "Gwadar", "ur": "گوادر", "sd": "گوادر" }, "cityCode": "GWD", "lat": 25.1266, "lng": 62.3225, "elevation": 10, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-KHI-L", "city": { "en": "Lasbela", "ur": "لاسبیلا", "sd": "لاسبيلا" }, "cityCode": "LSB", "lat": 25.7500, "lng": 66.6000, "elevation": 100, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-KEC", "city": { "en": "Kech (Turbat)", "ur": "کیچ", "sd": "ڪيچ" }, "cityCode": "KEC", "lat": 26.0042, "lng": 63.0486, "elevation": 135, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-AWR", "city": { "en": "Awaran", "ur": "آواران", "sd": "آواران" }, "cityCode": "AWR", "lat": 26.4500, "lng": 65.2333, "elevation": 450, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-KHU", "city": { "en": "Khuzdar", "ur": "خضدار", "sd": "خضدار" }, "cityCode": "KHU", "lat": 27.8000, "lng": 66.6167, "elevation": 1230, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-KAL", "city": { "en": "Kalat", "ur": "قلات", "sd": "قلات" }, "cityCode": "KAL", "lat": 29.0333, "lng": 66.5833, "elevation": 2000, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-MUS", "city": { "en": "Musakhel", "ur": "موسٰی خیل", "sd": "موسي خيل" }, "cityCode": "MUS", "lat": 30.8667, "lng": 69.8167, "elevation": 1300, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-NUSH", "city": { "en": "Nushki", "ur": "نوشکی", "sd": "نوشڪي" }, "cityCode": "NUSH", "lat": 29.5500, "lng": 66.0167, "elevation": 990, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-SIBI", "city": { "en": "Sibi", "ur": "سبی", "sd": "سبي" }, "cityCode": "SIBI", "lat": 29.5500, "lng": 67.8833, "elevation": 135, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-JAF", "city": { "en": "Jaffarabad", "ur": "جعفر آباد", "sd": "جعفر آباد" }, "cityCode": "JAF", "lat": 28.3000, "lng": 68.2000, "elevation": 60, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-NAS", "city": { "en": "Nasirabad", "ur": "نصیر آباد", "sd": "نصير آباد" }, "cityCode": "NAS", "lat": 28.5500, "lng": 68.0167, "elevation": 65, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-JHAL", "city": { "en": "Jhal Magsi", "ur": "جھل مگسی", "sd": "جهل مگسي" }, "cityCode": "JHAL", "lat": 28.2833, "lng": 67.5333, "elevation": 80, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-BOL", "city": { "en": "Bolan (Kachhi)", "ur": "بولان", "sd": "بولان" }, "cityCode": "BOL", "lat": 29.4500, "lng": 67.7500, "elevation": 110, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },

      // Islamabad Capital Territory
      // { "id": "PK-ISB", "city": { "en": "Islamabad", "ur": "اسلام آباد", "sd": "اسلام آباد" }, "cityCode": "ISB", "lat": 33.6844, "lng": 73.0479, "elevation": 540, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },

      // Gilgit-Baltistan (14 districts)
      // { "id": "PK-GLT", "city": { "en": "Gilgit", "ur": "گلگت", "sd": "گلگت" }, "cityCode": "GLT", "lat": 35.9208, "lng": 74.3141, "elevation": 1500, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-SKD", "city": { "en": "Skardu", "ur": "سکردو", "sd": "سڪردو" }, "cityCode": "SKD", "lat": 35.2971, "lng": 75.6333, "elevation": 2230, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },

      // Azad Kashmir (10 districts)
      // { "id": "PK-MZD", "city": { "en": "Muzaffarabad", "ur": "مظفر آباد", "sd": "مظفر آباد" }, "cityCode": "MZD", "lat": 34.3597, "lng": 73.4711, "elevation": 737, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" },
      // { "id": "PK-MIR", "city": { "en": "Mirpur", "ur": "میرپور", "sd": "ميرپور" }, "cityCode": "MIR", "lat": 33.1472, "lng": 73.7513, "elevation": 459, "timezone": "UTC+5", "timezoneName": "Asia/Karachi", "method": "University of Islamic Sciences, Karachi" }
    ]
  }
];

const defaultCountry = "PK";
const defaultCity = "KHI";

const getCountryList = () => {
  return locations.map(location => ({
    label: location.country[getCurrentLanguage()],
    value: location.countryCode
  }));
}

const getCitysByCountryCode = (countryCode) => {
  const country = locations.find(location => location.countryCode === countryCode);
  return country ? country.cities.map(city => ({
    label: city.city[getCurrentLanguage()],
    value: city.cityCode
  })) : [];
}

const getCityByCityCode = (cityCode) => {
  if (!cityCode) return null;
  
  for (const location of locations) {
    const city = location.cities.find(city => city.cityCode === cityCode);
    if (city) {
      return city;
    }
  }
  return null;
}

export {getCountryList, getCitysByCountryCode, getCityByCityCode, defaultCountry, defaultCity };