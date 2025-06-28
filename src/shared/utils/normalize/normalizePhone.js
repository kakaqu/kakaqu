export function normalizePhone(phone) {
  if (!phone || typeof phone !== 'string') return '';

  // Tüm boşluk, parantez, tire, nokta vs. karakterleri temizle → sadece rakamlar kalsın
  const digits = phone.replace(/\D/g, '');

  let cleaned = '';

  if (digits.startsWith('0')) {
    // 0788... → 788...
    cleaned = digits.slice(1);
  } else if (digits.startsWith('93')) {
    // 93788788788 → 788788788
    cleaned = digits.slice(2);
  } else if (digits.startsWith('7')) {
    // 788... → zaten doğru
    cleaned = digits;
  } else {
    // Beklenmeyen durum → tümünü ekle
    cleaned = digits;
  }

  // Son olarak +93 prefix ekle
  return '+93' + cleaned;
}
