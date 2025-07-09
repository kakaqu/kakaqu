// import supabase from '../../../../supabase';

// export const insertBalance = async ({ userId, amount, now }) => {
//   const { error } = await supabase.from('user_balances').insert({
//     user_id: userId,
//     balance: amount, // dinamik jeton miktarı
//     created_at: now,
//     update_at: now,
//     status: true,
//     delete_status: false,
//   });
//   if (error) throw error;
// };


import supabase from '../../../../supabase';

export const insertBalance = async ({ userId, amount, now }) => {
  // Kullanıcının mevcut bakiyesi var mı kontrol et
  const { data: existing, error: fetchError } = await supabase
    .from('user_balances')
    .select('id, balance')
    .eq('user_id', userId)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    // PGRST116: record not found (yeni kullanıcı olabilir)
    throw fetchError;
  }

  if (existing) {
    // Kullanıcı varsa, güncelle
    const newBalance = (existing.balance || 0) + amount;
    const { error: updateError } = await supabase
      .from('user_balances')
      .update({ balance: newBalance, update_at: now })
      .eq('id', existing.id);

    if (updateError) throw updateError;
  } else {
    // Yoksa insert
    const { error: insertError } = await supabase.from('user_balances').insert({
      user_id: userId,
      balance: amount,
      created_at: now,
      update_at: now,
      status: true,
      delete_status: false,
    });

    if (insertError) throw insertError;
  }
};
