import supabase from '../../../../supabase';

export const insertBalance = async ({ userId, amount, now }) => {
  const { error } = await supabase.from('user_balances').insert({
    user_id: userId,
    balance: amount, // dinamik jeton miktarı
    created_at: now,
    update_at: now,
    status: true,
    delete_status: false,
  });
  if (error) throw error;
};
