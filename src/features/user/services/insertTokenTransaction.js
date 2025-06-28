import supabase from '../../../../supabase';

export const insertTokenTransaction = async ({ userId, amount, typeId = 1, description = 'Kayıt hediyesi', referenceId = null, now }) => {
  const { error } = await supabase.from('token_transactions_log').insert({
    user_id: userId,
    transaction_type_id: typeId,
    reference_id: referenceId,
    amount, // dinamik miktar
    created_at: now,
    status: true,
    delete_status: false,
    description, // açıklama dışarıdan alınabilir
    update_at: now,
  });
  if (error) throw error;
};
