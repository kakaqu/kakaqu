import supabase from "../../../../../supabase";

export async function getDailyTransferTotal(fromUserId) {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from('user_transfers')
    .select('amount')
    .eq('from_user_id', fromUserId)
    .eq('delete_status', false)
    .eq('status', true)
    .gte('created_at', todayStart.toISOString());

  if (error) {
    console.error('Failed to fetch dailyTransferTotal:', error.message);
    return 0;
  }

  // Toplamı hesapla
  const total = data.reduce((sum, row) => sum + Number(row.amount), 0);
  return total;
}