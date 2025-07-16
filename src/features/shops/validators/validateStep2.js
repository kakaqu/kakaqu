// 📁 validators/validateStep2.js
export const validateStep2 = (dto, t) => {
  const errors = {};

  // === Kategori ===
  if (!dto.categoryId) {
    errors.categoryId = t?.('validation.category_required') || 'Kategori seçimi zorunludur.';
  }

  // === İl / Vilayet ===
  if (!dto.provinceId) {
    errors.provinceId = t?.('validation.province') || 'Vilayet seçimi zorunludur.';
  }

  // === İlçe ===
  if (!dto.districtId) {
    errors.districtId = t?.('validation.district') || 'İlçe seçimi zorunludur.';
  }

  // === Adres ===
  if (!dto.addressLine || dto.addressLine.trim().length < 3) {
    errors.addressLine = t?.('validation.address_required') || 'Adres bilgisi giriniz.';
  }

  // === Konum ===
  if (dto.latitude == null || dto.longitude == null) {
    errors.location = t?.('validation.location_required') || 'Konum bilgisi seçilmelidir.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
