// 📁 validators/validateStep1.js
export const validateStep1 = (dto, t) => {
  const errors = {};

  // === Ad ===
  if (!dto.name || dto.name.trim().length < 3) {
    errors.name = t?.('validation.name_short_shop') || 'Mağaza adı en az 3 karakter olmalı.';
  }

  // === Açıklama ===
  if (!dto.description || dto.description.trim() === '') {
    errors.description = t?.('validation.description_required') || 'Mağaza açıklaması gereklidir.';
  } else if (dto.description.trim().length < 5) {
    errors.description = t?.('validation.description_short') || 'Mağaza açıklaması en az 5 karakter olmalı.';
  }

  // === Telefon ===
  const rawPhone = dto.mobile?.replace(/\D/g, '') || '';
  const isAllSameDigits = /^(\d)\1{8}$/.test(rawPhone);
  const isInvalidPrefix = !/^7\d{8}$/.test(rawPhone);
  const isInvalidLength = rawPhone.length !== 9;

  if (!dto.mobile || isInvalidLength) {
    errors.mobile = t?.('validation.phone') || 'Geçerli bir telefon numarası girin.';
  } else if (isAllSameDigits) {
    errors.mobile = t?.('validation.fake_phone') || 'Geçersiz numara girdiniz.';
  } else if (isInvalidPrefix) {
    errors.mobile = t?.('validation.invalid_prefix') || 'Telefon numarası 7 ile başlamalı.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
