import React, { useState } from 'react';
import { 
  SafeAreaView, 
  View, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  ActivityIndicator, 
  KeyboardAvoidingView, 
  ScrollView, 
  Platform, 
  Alert 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomInput from '../../components/CustomInput';
import CustomTheme from '../../styles/CustomThems';
import CustomButton from '../../components/CustomButton';
import supabase from '../../../supabase';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';
import uuid from 'react-native-uuid';
import { Buffer } from 'buffer';

// importlar aynı kalıyor...

const AddOnboardingScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const uploadImageToSupabase = async (uri) => {
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 800 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.PNG }
    );

    const file = await FileSystem.readAsStringAsync(manipulatedImage.uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const uniqueId = uuid.v4();
    const fileName = `${Date.now() + uniqueId}.png`;
    const filePath = `onboarding_photos/${fileName}`;

    const response = await supabase.storage
      .from('busendenstorage')
      .upload(filePath, Buffer.from(file, 'base64'), {
        contentType: 'image/png',
        upsert: false,
      });

    if (response.error) throw new Error(response.error.message);

    const { data } = supabase.storage.from('busendenstorage').getPublicUrl(filePath);
    return data?.publicUrl;
  };

  const handleRegister = async () => {
    if (!title || !description || !details) {
      Alert.alert('Hata', 'Tüm alanları doldurmalısınız!');
      return;
    }

    if (!avatar) {
      Alert.alert('Hata', 'Lütfen bir görsel seçin!');
      return;
    }

    setLoading(true);

    try {
      const uploadedUrl = await uploadImageToSupabase(avatar);

      const { error } = await supabase.from('onboarding_tbl').insert([
        {
          title,
          description,
          details,
          image_url: uploadedUrl,
          status: true,
          delete_status: false,
        },
      ]);

      if (error) throw new Error('Veri eklenemedi');

      Alert.alert('Başarılı', 'Veri başarıyla kaydedildi.');
      setTitle('');
      setDescription('');
      setDetails('');
      setAvatar(null);
    } catch (err) {
      console.error('Hata:', err);
      Alert.alert('Hata', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'height' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="handled">
          <View style={styles.content}>
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={avatar ? { uri: avatar } : require('../../../assets/check_photos/1.png')}
                style={styles.avatar}
              />
            </TouchableOpacity>

            <CustomInput
              type="text"
              value={title}
              setValue={setTitle}
              placeholder="عنوان جدید"
              label="عنوان :"
            />
            <CustomInput
              type="text"
              value={description}
              setValue={setDescription}
              placeholder="توضیحات کوتاه"
              label="توضیحات :"
            />
            <CustomInput
              type="text"
              value={details}
              setValue={setDetails}
              placeholder="متن تشریح"
              label="تشریح :"
              multiline
              numberOfLines={5}
              inputStyle={{ minHeight: 100, textAlignVertical: 'top' }}
            />

            <View style={styles.buttonContainer}>
              {loading ? (
                <ActivityIndicator size="large" color={CustomTheme.colors.primary} />
              ) : (
                <CustomButton
                  buttonText="Register"
                  onPress={handleRegister}
                  style={styles.button}
                  textStyle={styles.buttonText}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// styles aynı şekilde kalabilir
export default AddOnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: CustomTheme.colors.white, // Add background color
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    backgroundColor: CustomTheme.colors.backgroundColor, // Add background color while loading
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
    minHeight: 50, // Fixed height to prevent layout shift
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: CustomTheme.colors.primary,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: CustomTheme.colors.white,
    fontSize: 16,
  },
  loadingIndicator: {
    position: 'absolute',
    alignSelf: 'center',
  },
});
