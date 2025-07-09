import supabase from '../../../../supabase';

export const updateIsOnboarded = async (userId) => {
  const { error } = await supabase
    .from('users')
    .update({ is_onboarded: true })
    .eq('id', userId);

  if (error) {
    console.error('Onboarding güncellenemedi:', error.message);
    throw new Error('onboarding_update_failed');
  }
};
