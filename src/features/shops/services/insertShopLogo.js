import supabase from '../../../../supabase';

export const insertShopLogo = async ({ shopId, logoUrl, now }) => {
  const { error } = await supabase.from('shop_logos').insert({
    shop_id: shopId,
    is_main: true,
    logo_url: logoUrl,
    created_at: now,
    update_at: now,
    status: true,
    delete_status: false,
  });

  if (error) throw error;
};
