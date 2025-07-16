import supabase from "../../../../supabase";

export async function followShop(shopId, userId) {
  // Zaten varsa tekrar aktif hale getir
  const { data, error: updateError } = await supabase
    .from('shop_subscriptions')
    .update({
      status: true,
      delete_status: false,
      update_at: new Date(),
    })
    .eq('shop_id', shopId)
    .eq('user_id', userId)
    .select()
    .maybeSingle();

  if (updateError) {
    console.warn('⚠️ Güncelleme başarısız, yeni kayıt deneniyor:', updateError.message);
  }

  // Eğer update ile bulunamazsa, yeni bir kayıt oluştur
  if (!data) {
    const { error: insertError } = await supabase.from('shop_subscriptions').insert([
      {
        shop_id: shopId,
        user_id: userId,
        status: true,
        delete_status: false,
      },
    ]);

    if (insertError) {
      console.error('❌ followShop insert error:', insertError.message);
      return false;
    }
  }

  return true;
}
