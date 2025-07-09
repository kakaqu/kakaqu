import { createAsyncThunk } from '@reduxjs/toolkit';
import supabase from '../../../../../supabase';

// Yardımcı: Kullanıcı adlarını ID'ye göre eşle
const mapUserNames = (users) =>
  Object.fromEntries(users.map((u) => [u.id, u.name]));

/**
 * Kullanıcının son işlemlerini getirir:
 * - Transferler (giden ve gelen)
 * - Sistem işlemleri (sadece bağımsız işlemler)
 */
export const getLastTransactions = createAsyncThunk(
  'transactions/getLastTransactions',
  async ({ userId, languageId, t }, thunkAPI) => {
    try {
      const gold = t('wallet.gold_unit');

      /** 🔹 1. Kullanıcı transferlerini getir (gelen + giden) */
      const { data: transfersRaw, error: transferError } = await supabase
        .from('user_transfers')
        .select('*')
        .or(`from_user_id.eq.${userId},to_user_id.eq.${userId}`);

      if (transferError) throw transferError;

      /** 🔹 2. Kullanıcı adlarını çek (kimden/kime) */
      const userIds = Array.from(
        new Set(transfersRaw.flatMap((tx) => [tx.from_user_id, tx.to_user_id]))
      );

      const { data: users, error: userError } = await supabase
        .from('users')
        .select('id, name')
        .in('id', userIds);

      if (userError) throw userError;

      const userMap = mapUserNames(users);

      /** 🔹 3. Transfer işlemlerini formatla */
      const transfers = transfersRaw.map((item) => {
        const isIncoming = item.to_user_id === userId;
        const otherUserName = isIncoming
          ? userMap[item.from_user_id]
          : userMap[item.to_user_id];

        const description = isIncoming
          ? t('transactions.received_from', {
              name: otherUserName,
              amount: item.amount,
              gold,
            })
          : t('transactions.sent_to', {
              name: otherUserName,
              amount: item.amount,
              gold,
            });

        return {
          id: `transfer-${item.id}`,
          type: isIncoming ? 'in' : 'out',
          amount: item.amount,
          description,
          date: item.created_at,
        };
      });

      /** 🔹 4. Sistem işlemlerini getir (transfer kaynaklı olanlar hariç) */
      const { data: tokenLogs, error: tokenError } = await supabase
        .from('token_transactions_log')
        .select('id, user_id, amount, description, transaction_type_id, created_at')
        .eq('user_id', userId)
        .in('transaction_type_id', [1, 2, 4])
        .is('reference_id', null); // Transfer kaynaklı işlemler hariç

      if (tokenError) throw tokenError;

      /** 🔹 5. Sistem işlem çevirilerini getir */
      const { data: translations, error: transError } = await supabase
        .from('token_transaction_types_translations')
        .select('transaction_type_id, name')
        .eq('language_id', languageId);

      if (transError) throw transError;

      const typeNameMap = Object.fromEntries(
        translations.map((row) => [row.transaction_type_id, row.name])
      );

      /** 🔹 6. Sistem işlemlerini formatla */
      const tokens = tokenLogs.map((item) => {
        const fallbackName = typeNameMap[item.transaction_type_id];
        const description =
          item.description?.trim() || fallbackName || t('transactions.system_transaction');

        return {
          id: `token-${item.id}`,
          type: 'system',
          amount: item.amount,
          description,
          date: item.created_at,
        };
      });

      /** 🔹 7. İşlemleri birleştir, tarihe göre sırala */
      const combined = [...transfers, ...tokens].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      /** 🔹 8. Tekrarları ayıkla (güvenli kıyas) */
      const seen = new Set();
      const unique = combined.filter((item) => {
        const key = `${item.type}-${item.amount}-${new Date(item.date).toISOString()}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

      /** 🔹 9. Son 20 işlem */
      return unique.slice(0, 5);
    } catch (error) {
      console.error('getLastTransactions error:', error);
      return thunkAPI.rejectWithValue(t('transactions.error_fetching_history'));
    }
  }
);
