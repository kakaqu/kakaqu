import supabase from '../../../../supabase'

export const insertNotification = async ({ userId, notificationTypeId, payload }) => {
  const { error } = await supabase.from('system_notifications').insert({
    user_id: userId,
    notification_type_id: notificationTypeId,
    is_read: false,
    created_at: new Date().toISOString(),
    payload, // JSON: { sender: "Ahmet", amount: 500 }
  });

  if (error) throw error;
};
