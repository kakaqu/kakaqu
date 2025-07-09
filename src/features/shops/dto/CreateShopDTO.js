export class CreateShopDTO {
  constructor({
    name,
    description,
    avatar,
    categoryId,
    provinceId,
    districtId,
    addressLine = '',
    latitude = null,
    longitude = null,
  }) {
    this.name = name;
    this.description = description;
    this.avatar = avatar;
    this.categoryId = categoryId;
    this.provinceId = provinceId;
    this.districtId = districtId;
    this.addressLine = addressLine;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
