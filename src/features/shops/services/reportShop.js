import supabase from "../../../../supabase";

// Bir dükkanı şikayet etme servisi
export const reportShop = async ({ userId, shopId, reason }) => {
  const { data, error } = await supabase
    .from('shop_reports')
    .insert([
      {
        user_id: userId,
        shop_id: shopId,
        subject: 'گرک یوق دررو',
        description: reason,
        status: false,
        delete_status: false,
        update_at: new Date().toISOString(),
      },
    ])
    .select();

  if (error) {
    throw error;
  }

  return data?.[0]; // opsiyonel: eklenen raporu döner
};
