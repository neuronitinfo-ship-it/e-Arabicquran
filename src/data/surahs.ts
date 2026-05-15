// Surahs with everyayah.com audio (free, no API key required).
// Reciter: Abdul Basit (Murattal). URL: https://everyayah.com/data/Abdul_Basit_Murattal_192kbps/SSSAAA.mp3
// Where SSSAAA = surah(3) + ayah(3), zero-padded.

const RECITER = "Abdul_Basit_Murattal_192kbps";

export function ayahAudioUrl(surah: number, ayah: number) {
  const s = String(surah).padStart(3, "0");
  const a = String(ayah).padStart(3, "0");
  return `https://everyayah.com/data/${RECITER}/${s}${a}.mp3`;
}

export interface Ayah {
  ar: string;
  bn: string;
  translit: string;
}

export interface Surah {
  number: number;
  arName: string;
  bnName: string;
  meaning: string;
  intro: string; // bangla
  focus: string; // tajwid focus area for this surah
  context: string; // Bengali বিষয়ে প্রেক্ষাপট / সংক্ষিপ্ত ব্যাখ্যা
  ayahs: Ayah[];
}

export const surahs: Surah[] = [
  {
    number: 1,
    arName: "الْفَاتِحَة",
    bnName: "আল-ফাতিহা",
    meaning: "সূচনা",
    intro: "নামাজের প্রতি রাকাতে পঠিত মূল সূরা — কুরআনের ‘উম্মুল কিতাব’।",
    focus: "মৌলিক হরকত (ফাতহা / কাসরা / দম্মা) ও মাদ্দ চেনা।",
    context: "ফাতিহা হলো সূচনা আর দিন শুরু করার দোয়া — বাংলা প্রেক্ষাপটে এটি বিশ্বাস, দোয়া ও দৃষ্টিভঙ্গির সংক্ষিপ্ত সংকলন।",
    ayahs: [
      { ar: "بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", translit: "Bismillāh ir-Raḥmān ir-Raḥīm", bn: "পরম করুণাময়, অসীম দয়ালু আল্লাহর নামে।" },
      { ar: "ٱلْحَمْدُ لِلَّٰهِ رَبِّ ٱلْعَٰلَمِينَ", translit: "Al-ḥamdu lillāhi rabb il-ʿālamīn", bn: "সমস্ত প্রশংসা আল্লাহর, যিনি সকল জগতের প্রতিপালক।" },
      { ar: "ٱلرَّحْمَٰنِ ٱلرَّحِيمِ", translit: "Ar-Raḥmān ir-Raḥīm", bn: "পরম করুণাময়, অসীম দয়ালু।" },
      { ar: "مَٰلِكِ يَوْمِ ٱلدِّينِ", translit: "Māliki yawm id-dīn", bn: "বিচার দিনের মালিক।" },
      { ar: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ", translit: "Iyyāka naʿbudu wa iyyāka nastaʿīn", bn: "আমরা শুধু তোমারই ইবাদত করি ও তোমারই সাহায্য চাই।" },
      { ar: "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ", translit: "Ihdinā ṣ-ṣirāṭ al-mustaqīm", bn: "আমাদেরকে সরল পথ দেখাও।" },
      { ar: "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ", translit: "Ṣirāṭ alladhīna anʿamta ʿalayhim ghayr il-maghḍūbi ʿalayhim wa lā ḍ-ḍāllīn", bn: "তাদের পথ, যাদের উপর তুমি অনুগ্রহ করেছ — যাদের উপর ক্রোধ পড়েনি, যারা পথভ্রষ্টও নয়।" },
    ],
  },
  {
    number: 112,
    arName: "الْإِخْلَاص",
    bnName: "আল-ইখলাস",
    meaning: "একনিষ্ঠতা",
    intro: "তাওহিদের সারসংক্ষেপ — কুরআনের এক-তৃতীয়াংশের সমান বলে হাদীসে উল্লেখ আছে।",
    focus: "শাদ্দা (দ্বিগুণ ব্যঞ্জন) ও সুকুনের অনুশীলন।",
    context: "আল-ইখলাস মনে করায়, আল্লাহ একমাত্র, তাঁর সাথে কারো তুলনা নেই — বাংলা ভাষায় এটা একনিষ্ঠতার শক্তিশালী শিক্ষা।",
    ayahs: [
      { ar: "قُلْ هُوَ ٱللَّهُ أَحَدٌ", translit: "Qul huwa Allāhu aḥad", bn: "বলো, তিনি আল্লাহ — একক।" },
      { ar: "ٱللَّهُ ٱلصَّمَدُ", translit: "Allāhu ṣ-ṣamad", bn: "আল্লাহ — অমুখাপেক্ষী, যাঁর উপর সবাই নির্ভরশীল।" },
      { ar: "لَمْ يَلِدْ وَلَمْ يُولَدْ", translit: "Lam yalid wa lam yūlad", bn: "তিনি কাউকে জন্ম দেননি, এবং তাঁকেও জন্ম দেওয়া হয়নি।" },
      { ar: "وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ", translit: "Wa lam yakun lahū kufuwan aḥad", bn: "এবং তাঁর সমকক্ষ কেউ নেই।" },
    ],
  },
  {
    number: 113,
    arName: "الْفَلَق",
    bnName: "আল-ফালাক",
    meaning: "প্রভাত",
    intro: "মন্দ থেকে আশ্রয় চেয়ে পড়া দুটি ‘মুআওবিযাতাইন’-এর প্রথমটি।",
    focus: "তানবীন (দ্বৈত হরকত) ও মাদ্দ-এর প্রয়োগ।",
    context: "আল-ফালাক পড়লে বোঝা যায়, আমরা জীবনের প্রতিটি অনিষ্ট ও অছল শক্তি থেকে আল্লাহর কাছে আশ্রয় চাই — বাংলা ব্যাখ্যা এতে স্থিরতা দেয়।",
    ayahs: [
      { ar: "قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ", translit: "Qul aʿūdhu bi rabb il-falaq", bn: "বলো, আমি প্রভাতের রবের আশ্রয় চাই।" },
      { ar: "مِن شَرِّ مَا خَلَقَ", translit: "Min sharri mā khalaq", bn: "যা তিনি সৃষ্টি করেছেন, তার অনিষ্ট থেকে।" },
      { ar: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ", translit: "Wa min sharri ghāsiqin idhā waqab", bn: "এবং অন্ধকার রাতের অনিষ্ট থেকে যখন তা ছেয়ে যায়।" },
      { ar: "وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ", translit: "Wa min sharri n-naffāthāti fī l-ʿuqad", bn: "এবং গিঁটে ফুঁ-দানকারিনীদের অনিষ্ট থেকে।" },
      { ar: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ", translit: "Wa min sharri ḥāsidin idhā ḥasad", bn: "এবং হিংসুকের অনিষ্ট থেকে যখন সে হিংসা করে।" },
    ],
  },
  {
    number: 114,
    arName: "النَّاس",
    bnName: "আন-নাস",
    meaning: "মানুষ",
    intro: "মানুষের অন্তরের ফিসফিসানি ওয়াসওয়াসা থেকে আশ্রয় প্রার্থনা।",
    focus: "একই পদ-শেষ পুনরাবৃত্তি (নাস) — তাল ও থামার অনুশীলন।",
    context: "আন-নাস আমাদের স্মরণ করায়, যে কুমন্ত্রণা আসে তা আল্লাহর থেকে মুক্তি চাওয়া — বাংলা প্রেক্ষাপটে আত্মরক্ষা ও আধ্যাত্মিক শান্তি।",
    ayahs: [
      { ar: "قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ", translit: "Qul aʿūdhu bi rabb in-nās", bn: "বলো, আমি মানুষের রবের আশ্রয় চাই।" },
      { ar: "مَلِكِ ٱلنَّاسِ", translit: "Malik in-nās", bn: "মানুষের অধিপতির।" },
      { ar: "إِلَٰهِ ٱلنَّاسِ", translit: "Ilāh in-nās", bn: "মানুষের ইলাহের।" },
      { ar: "مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ", translit: "Min sharri l-waswās il-khannās", bn: "ফিসফিসকারী, পশ্চাৎসরে যাওয়া (শয়তানের) অনিষ্ট থেকে।" },
      { ar: "ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ", translit: "Alladhī yuwaswisu fī ṣudūr in-nās", bn: "যে মানুষের অন্তরে কুমন্ত্রণা দেয়।" },
      { ar: "مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ", translit: "Min al-jinnati wa n-nās", bn: "জ্বীন ও মানুষের মধ্য থেকে।" },
    ],
  },
  {
    number: 108,
    arName: "الْكَوْثَر",
    bnName: "আল-কাওসার",
    meaning: "প্রাচুর্য",
    intro: "কুরআনের সবচেয়ে ছোট সূরা — মাত্র তিন আয়াত।",
    focus: "সংক্ষিপ্ত সূরা — উচ্চারণের স্পষ্টতা।",
    context: "আল-কাওসার বলছে, আল্লাহ যে প্রাচুর্য দেন, তার জন্য কৃতজ্ঞতা ও শোকরানা করা উচিৎ — কুরবানি ও নামাজের মাধ্যমে প্রভুকে খুশি রাখার শিক্ষা।",
    ayahs: [
      { ar: "إِنَّآ أَعْطَيْنَٰكَ ٱلْكَوْثَرَ", translit: "Innā aʿṭaynāka l-kawthar", bn: "নিশ্চয় আমরা তোমাকে কাওসার (প্রাচুর্য) দান করেছি।" },
      { ar: "فَصَلِّ لِرَبِّكَ وَٱنْحَرْ", translit: "Fa-ṣalli li-rabbika wa-nḥar", bn: "অতএব তুমি তোমার রবের জন্য সালাত আদায় করো এবং কুরবানি করো।" },
      { ar: "إِنَّ شَانِئَكَ هُوَ ٱلْأَبْتَرُ", translit: "Inna shāniʾaka huwa l-abtar", bn: "নিশ্চয় তোমার শত্রুই হবে নির্বংশ।" },
    ],
  },
  {
    number: 103,
    arName: "الْعَصْر",
    bnName: "আল-আসর",
    meaning: "মহাকাল",
    intro: "ইমাম শাফেয়ী বলেছেন: মানুষ যদি শুধু এ সূরাটি নিয়ে চিন্তা করত, তা-ই যথেষ্ট হতো।",
    focus: "ইস্তিসনা (ব্যতিক্রম) ও থামার বিরাম।",
    context: "আল-আসর সময়ের মূল্য ও প্রকৃত সফলতার কথা স্মরণ করায় — বাংলা ব্যাখ্যায় এটি প্রতিদিনের কাজ ও ধৈর্যের শিক্ষা দেয়।",
    ayahs: [
      { ar: "وَٱلْعَصْرِ", translit: "Wa l-ʿaṣr", bn: "মহাকালের শপথ।" },
      { ar: "إِنَّ ٱلْإِنسَٰنَ لَفِى خُسْرٍ", translit: "Inna l-insāna la-fī khusr", bn: "নিশ্চয় মানুষ ক্ষতির মধ্যে আছে।" },
      { ar: "إِلَّا ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّٰلِحَٰتِ وَتَوَاصَوْا۟ بِٱلْحَقِّ وَتَوَاصَوْا۟ بِٱلصَّبْرِ", translit: "Illā alladhīna āmanū wa ʿamilū ṣ-ṣāliḥāti wa tawāṣaw bi l-ḥaqqi wa tawāṣaw bi ṣ-ṣabr", bn: "তবে তারা ব্যতীত যারা ঈমান এনেছে, সৎকর্ম করেছে, পরস্পরকে সত্যের ও ধৈর্যের উপদেশ দিয়েছে।" },
    ],
  },
];

export function findSurah(num: number) {
  return surahs.find((s) => s.number === num);
}
