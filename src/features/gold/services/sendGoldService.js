// export async function sendGoldByPhone({ fromUserId, phone, amount }) {
//   return fetch('/api/send-gold/phone', {
//     method: 'POST',
//     body: JSON.stringify({ fromUserId, phone, amount }),
//   });
// }

// export async function sendGoldByQr({ fromUserId, targetUserId, amount }) {
//   return fetch('/api/send-gold/qr', {
//     method: 'POST',
//     body: JSON.stringify({ fromUserId, targetUserId, amount }),
//   });
// }


import supabase from '../../../../supabase';
import { insertTokenTransaction } from '../../user/services/insertTokenTransaction';
export const sendGoldService = async ({ fromUserId, toUserId, amount, description }) => {
  const now = new Date().toISOString();

  const { data: transfer, error } = await supabase
    .from('user_transfers')
    .insert([
      {
        from_user_id: fromUserId,
        to_user_id: toUserId,
        amount,
        description,
        created_at: now,
        update_at: now,
        status: true,
        delete_status: false,
      },
    ])
    .select()
    .single();

  if (error) throw new Error('Altın gönderme başarısız: ' + error.message);

  await insertTokenTransaction({
    userId: fromUserId,
    amount,
    typeId: 3, // kullanıcıya altın gönder
    description,
    referenceId: transfer.id,
    now,
  });

  await insertTokenTransaction({
    userId: toUserId,
    amount,
    typeId: 4, // kullanıcıdan altın alındı
    description,
    referenceId: transfer.id,
    now,
  });

  return transfer;
};

