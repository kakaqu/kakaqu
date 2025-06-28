import supabase from "../../../../supabase";


const insertOnboarding = async ({ imageUrl, status, deleteStatus, now }) => {
  const { data, error } = await supabase
    .from('onboarding')
    .insert([
      {
        image_url: imageUrl,
        status,
        delete_status: deleteStatus,
        created_at: now,
        updated_at: now,
      },
    ])
    .select()
    .single();

  if (error || !data) throw new Error('Onboarding tablosuna veri eklenemedi');

  return data.id;
};

export default insertOnboarding;