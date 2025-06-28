export function validatePhoneGoldForm({ phone, amount }) {
  if (!phone) return 'Telefon numarası boş olamaz.';
  if (!amount || isNaN(amount)) return 'Geçerli bir altın miktarı girin.';
  return null;
}
