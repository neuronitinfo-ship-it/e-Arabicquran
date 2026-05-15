// 28 Arabic letters with Bengali names, transliteration, and isolated/initial/medial/final forms
export interface ArabicLetter {
  name: string;        // Arabic name e.g. "ألف"
  bnName: string;      // Bengali transliteration e.g. "আলিফ"
  translit: string;    // Latin e.g. "Alif"
  isolated: string;
  initial: string;
  medial: string;
  final: string;
  sound: string;       // Bengali sound description
  example: { ar: string; bn: string; translit: string };
}

export const letters: ArabicLetter[] = [
  { name: "ألف", bnName: "আলিফ", translit: "Alif", isolated: "ا", initial: "ا", medial: "ـا", final: "ـا", sound: "আ-কারের মতো (লম্বা স্বর)", example: { ar: "أَب", bn: "বাবা", translit: "ab" } },
  { name: "باء", bnName: "বা", translit: "Ba", isolated: "ب", initial: "بـ", medial: "ـبـ", final: "ـب", sound: "বাংলার ‘ব’", example: { ar: "بَيْت", bn: "ঘর", translit: "bayt" } },
  { name: "تاء", bnName: "তা", translit: "Ta", isolated: "ت", initial: "تـ", medial: "ـتـ", final: "ـت", sound: "বাংলার ‘ত’", example: { ar: "تِين", bn: "ডুমুর", translit: "tin" } },
  { name: "ثاء", bnName: "সা", translit: "Tha", isolated: "ث", initial: "ثـ", medial: "ـثـ", final: "ـث", sound: "জিভ দাঁতের ফাঁকে — ইংরেজির ‘th’", example: { ar: "ثَلَاثَة", bn: "তিন", translit: "thalātha" } },
  { name: "جيم", bnName: "জিম", translit: "Jīm", isolated: "ج", initial: "جـ", medial: "ـجـ", final: "ـج", sound: "বাংলার ‘জ’", example: { ar: "جَمَل", bn: "উট", translit: "jamal" } },
  { name: "حاء", bnName: "হা (ভারী)", translit: "Ḥā", isolated: "ح", initial: "حـ", medial: "ـحـ", final: "ـح", sound: "গলার গভীর থেকে ‘হ’", example: { ar: "حَجّ", bn: "হজ্জ", translit: "ḥajj" } },
  { name: "خاء", bnName: "খা", translit: "Khā", isolated: "خ", initial: "خـ", medial: "ـخـ", final: "ـخ", sound: "বাংলার ‘খ’ এর মতো ঘষা", example: { ar: "خُبْز", bn: "রুটি", translit: "khubz" } },
  { name: "دال", bnName: "দাল", translit: "Dāl", isolated: "د", initial: "د", medial: "ـد", final: "ـد", sound: "বাংলার ‘দ’", example: { ar: "دَار", bn: "বাড়ি", translit: "dār" } },
  { name: "ذال", bnName: "যাল", translit: "Dhāl", isolated: "ذ", initial: "ذ", medial: "ـذ", final: "ـذ", sound: "ইংরেজির ‘this’ এর ‘th’", example: { ar: "ذَهَب", bn: "সোনা", translit: "dhahab" } },
  { name: "راء", bnName: "রা", translit: "Rā", isolated: "ر", initial: "ر", medial: "ـر", final: "ـر", sound: "বাংলার ‘র’", example: { ar: "رَبّ", bn: "প্রভু", translit: "rabb" } },
  { name: "زاي", bnName: "যা", translit: "Zāy", isolated: "ز", initial: "ز", medial: "ـز", final: "ـز", sound: "বাংলার ‘য’ (z শব্দ)", example: { ar: "زَيْت", bn: "তেল", translit: "zayt" } },
  { name: "سين", bnName: "সিন", translit: "Sīn", isolated: "س", initial: "سـ", medial: "ـسـ", final: "ـس", sound: "বাংলার ‘স’", example: { ar: "سَلَام", bn: "শান্তি", translit: "salām" } },
  { name: "شين", bnName: "শিন", translit: "Shīn", isolated: "ش", initial: "شـ", medial: "ـشـ", final: "ـش", sound: "বাংলার ‘শ’", example: { ar: "شَمْس", bn: "সূর্য", translit: "shams" } },
  { name: "صاد", bnName: "সোয়াদ", translit: "Ṣād", isolated: "ص", initial: "صـ", medial: "ـصـ", final: "ـص", sound: "ভারী ‘স’ — মুখ ভর্তি করে", example: { ar: "صَلَاة", bn: "নামাজ", translit: "ṣalāh" } },
  { name: "ضاد", bnName: "দোয়াদ", translit: "Ḍād", isolated: "ض", initial: "ضـ", medial: "ـضـ", final: "ـض", sound: "ভারী ‘দ’ — জিভ চাপ দিয়ে", example: { ar: "ضَوْء", bn: "আলো", translit: "ḍawʾ" } },
  { name: "طاء", bnName: "তোয়া", translit: "Ṭā", isolated: "ط", initial: "طـ", medial: "ـطـ", final: "ـط", sound: "ভারী ‘ত’", example: { ar: "طَيْر", bn: "পাখি", translit: "ṭayr" } },
  { name: "ظاء", bnName: "যোয়া", translit: "Ẓā", isolated: "ظ", initial: "ظـ", medial: "ـظـ", final: "ـظ", sound: "ভারী ‘য’ (ذ এর ভারী রূপ)", example: { ar: "ظِلّ", bn: "ছায়া", translit: "ẓill" } },
  { name: "عين", bnName: "আইন", translit: "ʿAyn", isolated: "ع", initial: "عـ", medial: "ـعـ", final: "ـع", sound: "গলার মাঝখান থেকে চাপা ‘আ’", example: { ar: "عَيْن", bn: "চোখ", translit: "ʿayn" } },
  { name: "غين", bnName: "গাইন", translit: "Ghayn", isolated: "غ", initial: "غـ", medial: "ـغـ", final: "ـغ", sound: "গলায় ‘গ’ (গার্গল করার মতো)", example: { ar: "غَيْم", bn: "মেঘ", translit: "ghaym" } },
  { name: "فاء", bnName: "ফা", translit: "Fā", isolated: "ف", initial: "فـ", medial: "ـفـ", final: "ـف", sound: "বাংলার ‘ফ’", example: { ar: "فِيل", bn: "হাতি", translit: "fīl" } },
  { name: "قاف", bnName: "ক্বাফ", translit: "Qāf", isolated: "ق", initial: "قـ", medial: "ـقـ", final: "ـق", sound: "গলার পিছন থেকে ‘ক’", example: { ar: "قَلْب", bn: "হৃদয়", translit: "qalb" } },
  { name: "كاف", bnName: "কাফ", translit: "Kāf", isolated: "ك", initial: "كـ", medial: "ـكـ", final: "ـك", sound: "বাংলার ‘ক’", example: { ar: "كِتَاب", bn: "বই", translit: "kitāb" } },
  { name: "لام", bnName: "লাম", translit: "Lām", isolated: "ل", initial: "لـ", medial: "ـلـ", final: "ـل", sound: "বাংলার ‘ল’", example: { ar: "لَيْل", bn: "রাত", translit: "layl" } },
  { name: "ميم", bnName: "মিম", translit: "Mīm", isolated: "م", initial: "مـ", medial: "ـمـ", final: "ـم", sound: "বাংলার ‘ম’", example: { ar: "مَاء", bn: "পানি", translit: "māʾ" } },
  { name: "نون", bnName: "নুন", translit: "Nūn", isolated: "ن", initial: "نـ", medial: "ـنـ", final: "ـن", sound: "বাংলার ‘ন’", example: { ar: "نُور", bn: "আলো", translit: "nūr" } },
  { name: "هاء", bnName: "হা", translit: "Hā", isolated: "ه", initial: "هـ", medial: "ـهـ", final: "ـه", sound: "বাংলার সাধারণ ‘হ’", example: { ar: "هُدَى", bn: "হেদায়েত", translit: "hudā" } },
  { name: "واو", bnName: "ওয়াও", translit: "Wāw", isolated: "و", initial: "و", medial: "ـو", final: "ـو", sound: "ইংরেজির ‘w’ / ‘ঊ’", example: { ar: "وَرْد", bn: "গোলাপ", translit: "ward" } },
  { name: "ياء", bnName: "ইয়া", translit: "Yā", isolated: "ي", initial: "يـ", medial: "ـيـ", final: "ـي", sound: "বাংলার ‘য়’ / ‘ঈ’", example: { ar: "يَد", bn: "হাত", translit: "yad" } },
];

export interface QuranWord {
  ar: string;
  translit: string;
  bn: string;
  count: number;
  note?: string;
}

// Most repeated meaningful words in Al-Qur'an (selection)
export const quranWords: QuranWord[] = [
  { ar: "ٱللَّٰه", translit: "Allāh", bn: "আল্লাহ — একমাত্র উপাস্য", count: 2699 },
  { ar: "رَبّ", translit: "Rabb", bn: "রব / প্রভু / প্রতিপালক", count: 970 },
  { ar: "قَالَ", translit: "qāla", bn: "সে বলল", count: 529 },
  { ar: "يَوْم", translit: "yawm", bn: "দিন", count: 405 },
  { ar: "كُلّ", translit: "kull", bn: "প্রত্যেক / সব", count: 358 },
  { ar: "نَاس", translit: "nās", bn: "মানুষ", count: 241 },
  { ar: "كِتَاب", translit: "kitāb", bn: "কিতাব / বই", count: 230 },
  { ar: "أَرْض", translit: "arḍ", bn: "পৃথিবী / জমিন", count: 461 },
  { ar: "سَمَاء", translit: "samāʾ", bn: "আকাশ", count: 310 },
  { ar: "عِلْم", translit: "ʿilm", bn: "জ্ঞান", count: 105 },
  { ar: "إِيمَان", translit: "īmān", bn: "ঈমান / বিশ্বাস", count: 45 },
  { ar: "صَلَاة", translit: "ṣalāh", bn: "নামাজ", count: 67 },
  { ar: "رَحْمَة", translit: "raḥmah", bn: "রহমত / দয়া", count: 79 },
  { ar: "نَفْس", translit: "nafs", bn: "প্রাণ / নিজ", count: 295 },
  { ar: "قَلْب", translit: "qalb", bn: "হৃদয়", count: 132 },
  { ar: "نُور", translit: "nūr", bn: "আলো / নূর", count: 43 },
  { ar: "حَقّ", translit: "ḥaqq", bn: "সত্য / অধিকার", count: 247 },
  { ar: "خَيْر", translit: "khayr", bn: "কল্যাণ / উত্তম", count: 186 },
  { ar: "جَنَّة", translit: "jannah", bn: "জান্নাত / বাগান", count: 147 },
  { ar: "نَار", translit: "nār", bn: "আগুন / জাহান্নাম", count: 145 },
  { ar: "مَاء", translit: "māʾ", bn: "পানি", count: 63 },
  { ar: "هُدَى", translit: "hudā", bn: "হেদায়েত / সঠিক পথ", count: 79 },
];
