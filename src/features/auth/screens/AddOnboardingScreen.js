import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import CustomInput from '../../../shared/components/forms/CustomInput';
import CustomButton from '../../../shared/components/buttons/CustomButton';
import CustomTheme from '../../../shared/styles/CustomThems';
import styles from '../styles/AddOnboardingStyles';

import { registerOnboarding } from '../actions/registerOnboarding';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

const AddOnboardingScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !details) {
      Alert.alert(t('info.error'), t('messages.required_fields'));
      return;
    }

    setLoading(true);

    try {
      await registerOnboarding({
        dto: {
          title,
          description,
          details,
          avatar,
          langCode: i18n.language || 'fa', // varsayılan 'fa'
        },
        dispatch,
        navigation,
        t,
      });

      // Form sıfırla
      setTitle('');
      setDescription('');
      setDetails('');
      setAvatar(null);
    } catch (err) {
      console.error('Kayıt hatası:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={
                  avatar
                    ? { uri: avatar }
                    : require("../../../assets/photo/photo_avatar.png")
                }
                style={styles.avatar}
              />
            </TouchableOpacity>

            <CustomInput
              label={t("onboarding.title")}
              placeholder={t("placeholders.title")}
              value={title}
              setValue={setTitle}
              iconName="edit"
            />
            <CustomInput
              label={t("onboarding.description")}
              placeholder={t("placeholders.description")}
              value={description}
              setValue={setDescription}
              iconName="notes"
            />
            <CustomInput
              label={t("onboarding.details")}
              placeholder={t("placeholders.details")}
              value={details}
              setValue={setDetails}
              multiline
              numberOfLines={5}
              inputStyle={{ minHeight: 100, textAlignVertical: "top" }}
              iconName="description"
            />

            <View style={styles.buttonContainer}>
              {loading ? (
                <ActivityIndicator
                  size="large"
                  color={CustomTheme.colors.primary}
                />
              ) : (
                <CustomButton
                  style={styles.button}
                  buttonText={t("buttons.save")}
                  type="primary_outline"
                  iconName="document-scanner"
                  iconLibrary="MaterialIcons"
                  onPress={handleSubmit}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddOnboardingScreen;
