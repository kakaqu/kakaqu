export const validateCreateShopDTO = (dto, t) => {
  const errors = {};

  if (!dto.name || dto.name.length < 3) {
    errors.name = t?.('validation.name_short') || 'Dükkan adı en az 3 karakter olmalı.';
  }
  if (!dto.categoryId) {
    errors.categoryId = t?.('validation.category_required') || 'Kategori seçimi zorunludur.';
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
