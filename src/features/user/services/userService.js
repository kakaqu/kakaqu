import supabase from '../../../../supabase';

export async function findUserByMobile(phone) {
  try {
    // 1. Kullanıcıyı getir
    const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('mobile', phone)
        .eq('status', true)
        .eq('delete_status', false)
        .order('created_at', { ascending: false }) // en son oluşturulan
        .limit(1);

    if (error && error.code !== 'PGRST116') throw error;

    const user = users?.[0] ?? null;
    if (!user) return null;

    const { data: image } = await supabase
      .from('user_photos')
      .select('image_url')
      .eq('user_id', user.id)
      .eq('is_main', true)
      .eq('delete_status', false)
      .maybeSingle();

    return {
      ...user,
      avatar: image?.image_url ?? null,
    };

  } catch (err) {
    console.error('Kullanıcı ve avatar sorgusu hatası:', err);
    return null;
  }
}

// ✅ Kullanıcının mevcut bakiyesini getirir
export async function fetchUserBalance(userId) {
  const { data, error } = await supabase
    .from("user_balances")
    .select("balance")
    .eq("user_id", userId)
    .single();

  if (error) throw new Error("Bakiye alınamadı.");
  return data?.balance || 0;
}

// ✅ Kullanıcının bugün ne kadar altın gönderdiğini hesaplar
export async function fetchDailySentTotal(userId) {
  const { data, error } = await supabase
    .from("user_transfers")
    .select("amount")
    .eq("from_user_id", userId)
    .gte("created_at", new Date().toISOString().slice(0, 10)) // bugünün tarihi
    .then((res) => {
      if (res.error) throw new Error("Günlük gönderim alınamadı.");
      return res.data.reduce((total, row) => total + (row.amount || 0), 0);
    });

  return data;
}
