import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomInput from '../../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/CustomButton';
import { setName, setAddress, setAvatar, setPhoneNumber } from '../../redux/userSlice';
import supabase from '../../../supabase';
import CustomComboBox from '../../components/CustomComboBox';

const RegisterScreen = ({ navigation }) => {
  const { name, address, avatar, phoneNumber } = useSelector((state) => state.user);
  const [selectedProvinceId, setSelectedProvinceId] = useState(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);

  const dispatch = useDispatch();

  // Provinces tablosundaki verileri çek
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const { data, error } = await supabase
          .from('provinces')
          .select('id, name');

        if (error) {
          console.error('Supabase error:', error.message);
          throw error;
        }

        console.log('Provinces data:', data);
        setProvinces(data);
      } catch (error) {
        console.error('Error fetching provinces:', error.message);
      }
    };

    fetchProvinces();
  }, []);

  // İlçeleri çek
  const fetchDistricts = async (provinceId) => {
    if (!provinceId) return;

    try {
      const { data, error } = await supabase
        .from('districts')
        .select('id, name')
        .eq('province_id', provinceId);

      if (error) {
        console.error('Supabase error:', error.message);
        throw error;
      }

      console.log('Districts data:', data);
      setDistricts(data);
    } catch (error) {
      console.error('Error fetching districts:', error.message);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      dispatch(setAvatar(result.assets[0].uri));
    }
  };

  const handleRegister = async () => {
    if (!name || !phoneNumber || !avatar || !selectedProvinceId || !selectedDistrictId) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    setLoading(true);

    try {
      // Kullanıcıyı kaydet
      const userRef = await supabase
        .from('users')
        .insert([{ name, phoneNumber, avatar, province_id: selectedProvinceId, district_id: selectedDistrictId }])
        .select();

      if (userRef.error) {
        console.error('Supabase error:', userRef.error.message);
        throw userRef.error;
      }

      console.log('User added:', userRef.data);
      Alert.alert('Başarılı', 'Kayıt işlemi başarılı!');
    } catch (error) {
      console.error('Kayıt işlemi sırasında hata oluştu:', error.message);
      Alert.alert('Hata', 'Kayıt işlemi başarısız!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>

          {/* Avatar Seçimi */}
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={avatar ? { uri: avatar } : require('../../../assets/check_photos/1.png')}
              style={styles.avatar}
            />
          </TouchableOpacity>

          {/* Başlık */}
          <Text style={styles.title}>Kayıt Ol</Text>

          {/* İsim Girişi */}
          <CustomInput
            type="text"
            value={name}
            setValue={(text) => dispatch(setName(text))}
            placeholder="اسم مشتری:"
            style={styles.input}
          />

          {/* Telefon Girişi */}
          <CustomInput
            type="phone"
            value={phoneNumber}
            setValue={(text) => dispatch(setPhoneNumber(text))}
            placeholder="مبایل:"
            style={styles.input}
          />

          {/* İl Seçimi */}
          <CustomComboBox
            options={provinces.map((province) => ({ label: province.name, value: province.id }))}
            selectedValue={selectedProvinceId}
            setSelectedValue={(value) => {
              setSelectedProvinceId(value);
              fetchDistricts(value);
            }}
            placeholder="انتخاب ولایت"
            style={styles.combobox}
          />

          {/* İlçe Seçimi */}
          <CustomComboBox
            options={districts.map((district) => ({ label: district.name, value: district.id }))}
            selectedValue={selectedDistrictId}
            setSelectedValue={setSelectedDistrictId}
            placeholder="انتخاب منطقه"
            style={styles.combobox}
          />

          {/* Kayıt Butonu */}
          {loading ? (
            <ActivityIndicator size="large" color="#007bff" />
          ) : (
            <CustomButton
              style={styles.loginButton}
              buttonText={'ثبت کنید'}
              onPress={handleRegister}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  contentContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    marginVertical: 20,
    height: 150,
    width: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 20,
    fontFamily: 'Arial', // Arapça yazı tipi ekleyin
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 40,
    backgroundColor: '#ddd',
  },
  input: {
    width: '100%',
    marginBottom: 20,
    textAlign: 'right', // RTL için
    writingDirection: 'rtl', // RTL için
  },
  combobox: {
    width: '100%',
    marginBottom: 20,
    textAlign: 'right', // RTL için
    writingDirection: 'rtl', // RTL için
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: 'center',
    width: '100%',
  },
});

export default RegisterScreen;