// import supabase from '../../../../supabase';

// export const fetchOnboardingScreens = async () => {
//   const { data, error } = await supabase
//     .from("onboarding_tbl")
//     .select("*")
//     .eq("status", true)
//     .eq("delete_status", false);

//   if (error) throw error;

//   return data.map((item) => ({
//     ...item,
//     details: typeof item.details === 'string'
//       ? item.details.split('\n').filter(line => line.trim() !== '')
//       : [],
//   }));
// };

import supabase from '../../../../supabase';

export const fetchOnboardingScreens = async (langCode = 'fa') => {
  const { data, error } = await supabase
    .from('onboarding')
    .select(`
      id,
      image_url,
      onboarding_translation (
        lang_code,
        title,
        description,
        details
      )
    `)
    .eq('status', true)
    .eq('delete_status', false);

  if (error) throw error;

  const localizedData = data
    .map((item) => {
      const translation = item.onboarding_translation.find(
        (t) => t.lang_code === langCode
      );

      return {
        id: item.id,
        image_url: item.image_url,
        title: translation?.title || '',
        description: translation?.description || '',
        details: typeof translation?.details === 'string'
          ? translation.details.split('\n').filter((line) => line.trim() !== '')
          : [],
      };
    });

  return localizedData;
};
