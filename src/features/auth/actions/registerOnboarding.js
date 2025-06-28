import { dispatchAlert } from "../../../shared/utils/upload/alertUtils";
import uploadImageToSupabase from "../../../shared/utils/upload/uploadImageToSupabase";
import insertOnboarding from "../services/insertOnboarding";
import insertOnboardingTranslation from "../services/insertOnboardingTranslation";



export const registerOnboarding = async ({ dto, dispatch, navigation, t }) => {
  const now = new Date().toISOString();

  try {
    const uploadedUrl = dto.avatar
      ? await uploadImageToSupabase(dto.avatar, 'onboarding_photos')
      : null;

    // Ana tabloya kayıt
    const onboardingId = await insertOnboarding({
      imageUrl: uploadedUrl,
      status: true,
      deleteStatus: false,
      now,
    });

    // Çeviri tablosuna kayıt
    await insertOnboardingTranslation({
      onboardingId,
      langCode: dto.langCode,
      title: dto.title,
      description: dto.description,
      details: dto.details,
      now
    });

    dispatchAlert(dispatch, {
      type: 'success',
      title: t('info.submit'),
      message: t('messages.success'),
      submitText: 'Tamam',
      onSubmit: () => navigation.goBack(),
    });
  } catch (err) {
    console.error('Onboarding Kayıt Hatası:', err);
    dispatchAlert(dispatch, {
      type: 'error',
      title: t('info.error'),
      message: t('messages.error'),
      submitText: 'Tamam',
    });
    throw err;
  }
};