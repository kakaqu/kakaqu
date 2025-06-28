import supabase from '../../../../supabase';

const insertOnboardingTranslation = async ({
  onboardingId,
  langCode,
  title,
  description,
  details,
  now
}) => {
  const { error } = await supabase.from('onboarding_translation').insert([
    {
      onboarding_id: onboardingId,
      lang_code: langCode,
      title,
      description,
      details,
      created_at: now,
      status: true,
      delete_status: false,
    },
  ]);

  if (error) throw new Error('Çeviri tablosuna veri eklenemedi');
};

export default insertOnboardingTranslation;