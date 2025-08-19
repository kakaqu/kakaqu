import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { showLoading, hideLoading } from '../../../shared/slices/loadingSlice';
import Step1Form from '../components/Step1Form';
import Step2Form from '../components/Step2Form';
import { CreateShopDTO } from '../dto/CreateShopDTO';
import { registerShop } from '../actions/registerShop';
import { useShopForm } from '../hooks/useShopForm';
import { normalizePhone } from '../../../shared/utils/normalize/normalizePhone';
import { validateStep1 } from '../validators/validateStep1';
import { validateStep2 } from '../validators/validateStep2';
import supabase from '../../../../supabase';
import styles from '../styles/addShopStyles';
import * as Location from 'expo-location'; 

const AddShopScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userId = useSelector(state => state.user.id);
  const shop = useSelector(state => state.shop);

  const {
    step,
    setStep,
    submitted,
    setSubmitted,
    errors,
    setErrors,
  } = useShopForm();

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [addressLine, setAddressLine] = useState('');
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // 🔹 Vilayetleri çek
        const { data: provinceData } = await supabase
          .from('provinces')
          .select('id, name');
        setProvinces(provinceData || []);

        // 🔹 Konum izni iste
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.warn('📍 Konum izni reddedildi');
          return;
        }

        // 🔹 Konumu al
        const { coords } = await Location.getCurrentPositionAsync({});
        if (coords) {
          setLocation({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        }
      } catch (err) {
        console.error('Veri/konum alma hatası:', err);
      }
    };

    fetchInitialData();
  }, []);


  const fetchDistricts = async (provinceId) => {
    const { data } = await supabase
      .from('district')
      .select('id, name')
      .eq('province_id', provinceId);
    setDistricts(data || []);
  };

  const handleStep1Next = (dto) => {
    const result = validateStep1(dto, t);
    setSubmitted(true);
    setErrors(result.errors);
    if (result.isValid) {
      setStep(2);
      setSubmitted(false);
    }
  };

  const handleFinalSubmit = async (dto) => {
    const result = validateStep2(dto, t);
    setSubmitted(true);
    setErrors(result.errors);
    if (!result.isValid) return;

    const finalDto = new CreateShopDTO({
      ...dto,
      name: shop.name,
      description: shop.description,
      avatar: shop.avatar,
      mobile: normalizePhone(shop.mobile),
    });

    dispatch(showLoading());
    try {
      await registerShop({ dto: finalDto, dispatch, navigation, t, userId });
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {step === 1 ? (
            <Step1Form
              submitted={submitted}
              errors={errors}
              onNext={handleStep1Next}
            />
          ) : (
            <Step2Form
              submitted={submitted}
              errors={errors}
              addressLine={addressLine}
              setAddressLine={setAddressLine}
              location={location}
              setLocation={setLocation}
              provinces={provinces}
              districts={districts}
              fetchDistricts={fetchDistricts}
              onBack={() => setStep(1)}
              onNext={handleFinalSubmit}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddShopScreen;
