import supabase from "../../../../supabase";

// ✅ user_transfers tablosuna kayıt ekler
export async function insertUserTransfer({ fromUserId, toUserId, amount, description }) {
  const { data, error } = await supabase
    .from("user_transfers")
    .insert([
      {
        from_user_id: fromUserId,
        to_user_id: toUserId,
        amount,
        description,
        status: true,
        delete_status: false,
        created_at: new Date().toISOString(),
        update_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw new Error("Altın transferi kaydedilemedi.");
  return data;
}
