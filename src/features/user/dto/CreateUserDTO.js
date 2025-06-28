export class CreateUserDTO {
  constructor({ name, phoneNumber, avatar, provinceId, districtId, languageId, address = '', tokenAmount = 150 }) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.avatar = avatar;
    this.provinceId = provinceId;
    this.districtId = districtId;
    this.languageId = languageId;
    this.address = address;
    this.tokenAmount = tokenAmount; // kullanıcıya verilecek jeton miktarı (default 150)
  }
}
