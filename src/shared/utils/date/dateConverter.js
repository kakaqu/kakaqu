import jalaali from 'jalaali-js';

// Sabit: Ay isimleri — yalnızca Peştuca
const AFGHAN_MONTHS = [
  "حَمَل", "ثَور", "جَوزا", "سَرَطان",
  "اَسَد", "سُنبُله", "میزان", "عَقرب",
  "قَوس", "جَدْی", "دَلو", "حوت"
];

// Çok dilli zaman metinleri
const TRANSLATIONS = {
  ps: {
    justNow: "همدا اوس",
    second: "ثانیه",
    minute: "دقیقه",
    hour: "ساعت",
    day: "ورځ",
    week: "اونۍ",
    ago: "مخکې",
  },
  fa: {
    justNow: "همین حالا",
    second: "ثانیه",
    minute: "دقیقه",
    hour: "ساعت",
    day: "روز",
    week: "هفته",
    ago: "پیش",
  },
  tr: {
    justNow: "az önce",
    second: "saniye",
    minute: "dakika",
    hour: "saat",
    day: "gün",
    week: "hafta",
    ago: "önce",
  },
  en: {
    justNow: "just now",
    second: "second",
    minute: "minute",
    hour: "hour",
    day: "day",
    week: "week",
    ago: "ago",
  },
  ar: {
    justNow: "الآن",
    second: "ثانية",
    minute: "دقيقة",
    hour: "ساعة",
    day: "يوم",
    week: "أسبوع",
    ago: "منذ",
  },
  tk: {
    justNow: "دررو",
    second: "ثانیه",
    minute: "دقیقه",
    hour: "ساعت",
    day: "گون",
    week: "هفته",
    ago: "اونگ",
  },
};

/**
 * Akıllı Afgan tarih formatlayıcı — çok dilli destekli
 * @param {string} isoDateString
 * @param {string} lang - "ps", "fa", "tr", "en", "ar", "tk"
 * @returns {string}
 */
export function convertToAfghanDate(isoDateString, lang = "fa") {
  const t = TRANSLATIONS[lang] || TRANSLATIONS["fa"];

  const now = new Date();
  const past = new Date(isoDateString);
  const diffMs = now - past;

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);

  const jDate = jalaali.toJalaali(past);
  const year = jDate.jy;
  const monthName = AFGHAN_MONTHS[jDate.jm - 1];
  const day = jDate.jd;

  // 1. 10 saniyeden az
  if (seconds < 10) return t.justNow;

  // 2. 2 haftadan kısa
  if (days < 14) {
    if (seconds < 60) return `${seconds} ${t.second} ${t.ago}`;
    if (minutes < 60) return `${minutes} ${t.minute} ${t.ago}`;
    if (hours < 24) return `${hours} ${t.hour} ${t.ago}`;
    if (days < 7) return `${days} ${t.day} ${t.ago}`;
    return `${weeks} ${t.week} ${t.ago}`;
  }

  // 3. 2 hafta ~ 3 ay
  if (months < 3) {
    return `${monthName} ${day}.`;
  }

  // 4. 3 aydan fazla
  return `${year} - ${monthName} - ${String(day).padStart(2, '0')}`;
}



// import jalaali from 'jalaali-js';

// // Afghan ay isimleri
// const AFGHAN_MONTHS = [
//   "حَمَل", "ثَور", "جَوزا", "سَرَطان",
//   "اَسَد", "سُنبُله", "میزان", "عَقرب",
//   "قَوس", "جَدْی", "دَلو", "حوت"
// ];


// /**
//  * ISO tarih formatını Afganistan Şemsi formatına çevirir: YYYY-[AY]-DD
//  * @param {string} isoDateString - Örn: "2025-07-08T03:41:38.508Z"
//  * @returns {string} - Örn: "1404-سَرَطان-17"
//  */
// export function convertToAfghanDate(isoDateString) {
//   const gDate = new Date(isoDateString);
//   const jDate = jalaali.toJalaali(gDate);

//   const year = jDate.jy;
//   const monthName = AFGHAN_MONTHS[jDate.jm - 1];
//   const day = String(jDate.jd).padStart(2, '0');

//   return `${year} - ${monthName} - ${day}`;
// }

/**
 * ISO tarihini Jalali formatta rakamlı gösterir: YYYY-MM-DD
 * @param {string} isoDateString
 * @returns {string} - Örn: "1404-04-17"
 */
export function convertToNumericJalali(isoDateString) {
  const gDate = new Date(isoDateString);
  const jDate = jalaali.toJalaali(gDate);

  const year = jDate.jy;
  const month = String(jDate.jm).padStart(2, '0');
  const day = String(jDate.jd).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * Jalali'den Gregorian'e dönüşüm
 * @param {number} jy - Jalali yıl
 * @param {number} jm - Jalali ay
 * @param {number} jd - Jalali gün
 * @returns {Date} - JavaScript Date objesi
 */
export function jalaliToGregorianDate(jy, jm, jd) {
  const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);
  return new Date(`${gy}-${String(gm).padStart(2, '0')}-${String(gd).padStart(2, '0')}`);
}

/**
 * Saat bilgisini 12 saatlik biçimde getirir: "04:45 PM"
 * @param {string} isoDateString
 * @returns {string}
 */
export function formatTime12Hour(isoDateString) {
  const date = new Date(isoDateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}
