import { setName, setAvatar, setAddress, setPhoneNumber } from '../slices/userSlice';
import { setGold } from '../slices/userBalanceSlice';
import supabase from '../../../../supabase';

export const loadUserData = (userId) => async (dispatch) => {
  try {
    await loadBasicInfo(userId, dispatch);
    await loadAvatar(userId, dispatch);
    await loadAddress(userId, dispatch);
    await loadGold(userId, dispatch);
  } catch (e) {
    // console.error('loadUserData Hatası:', e.message);
  }
};

const loadBasicInfo = async (userId, dispatch) => {
  const { data, error } = await supabase
    .from('users')
    .select('name, mobile')
    .eq('id', userId)
    .single();

  if (error) throw error;

  dispatch(setName(data.name));
  dispatch(setPhoneNumber(data.mobile || ''));
};

const loadAvatar = async (userId, dispatch) => {
  const { data, error } = await supabase
    .from('user_photos')
    .select('image_url')
    .eq('user_id', userId)
    .eq('is_main', true)
    .eq('delete_status', false)
    .maybeSingle();

  if (error) {
    // console.warn('Profil fotoğrafı alınamadı:', error.message);
  }

  dispatch(setAvatar(data?.image_url || ''));
};

const loadAddress = async (userId, dispatch) => {
  const { data, error } = await supabase
    .from('user_addresses')
    .select(`
      address,
      province:province_id (name),
      district:district_id (name)
    `)
    .eq('user_id', userId)
    .eq('is_main', true)
    .eq('delete_status', false)
    .maybeSingle();

  if (error) {
    // console.warn('Adres alınamadı:', error.message);
  }

  let fullAddress = 'Adres eklenmemiş';
  if (data) {
    const provinceName = data.province?.name || '';
    const districtName = data.district?.name || '';
    const addressText = data.address || '';
    fullAddress = `${provinceName} / ${districtName}  ${addressText}`;
  }

  dispatch(setAddress(fullAddress));
};

const loadGold = async (userId, dispatch) => {
  const { data, error } = await supabase
    .from('user_balances')
    .select('balance')
    .eq('user_id', userId)
    .eq('delete_status', false)
    .single();

  if (error) throw error;

  dispatch(setGold(data.balance));
};
