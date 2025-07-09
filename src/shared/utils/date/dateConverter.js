import jalaali from 'jalaali-js';

// Afghan ay isimleri
const AFGHAN_MONTHS = [
  "حَمَل", "ثَور", "جَوزا", "سَرَطان",
  "اَسَد", "سُنبُله", "میزان", "عَقرب",
  "قَوس", "جَدْی", "دَلو", "حوت"
];

/**
 * ISO tarih formatını Afganistan Şemsi formatına çevirir: YYYY-[AY]-DD
 * @param {string} isoDateString - Örn: "2025-07-08T03:41:38.508Z"
 * @returns {string} - Örn: "1404-سَرَطان-17"
 */
export function convertToAfghanDate(isoDateString) {
  const gDate = new Date(isoDateString);
  const jDate = jalaali.toJalaali(gDate);

  const year = jDate.jy;
  const monthName = AFGHAN_MONTHS[jDate.jm - 1];
  const day = String(jDate.jd).padStart(2, '0');

  return `${year} - ${monthName} - ${day}`;
}

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
