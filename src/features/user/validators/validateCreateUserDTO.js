export const validateCreateUserDTO = (dto, t) => {
  const errors = {};

  if (!dto.name || dto.name.length < 3) {
    errors.name = t?.('validation.name_short') || 'İsim en az 3 karakter olmalı.';
  }
  if (!dto.phoneNumber || dto.phoneNumber.length < 9) {
    errors.phoneNumber = t?.('validation.phone_invalid') || 'Geçerli bir telefon numarası girin.';
  }
  if (!dto.provinceId) {
    errors.provinceId = t?.('validation.province_required') || 'Vilayet seçimi zorunludur.';
  }
  if (!dto.districtId) {
    errors.districtId = t?.('validation.district_required') || 'İlçe seçimi zorunludur.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
