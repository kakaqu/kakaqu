import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, Image, TouchableOpacity
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as ImagePicker from 'expo-image-picker';

import styles from '../styles/addUserStyles';
import CustomInput from '../../../shared/components/forms/CustomInput';
import CustomButton from '../../../shared/components/buttons/CustomButton';
import ProvinceDistrictPicker from '../../../shared/components/pickers/ProvinceDistrictPicker';

import { setName, setPhoneNumber, setAvatar } from '../slices/userSlice';
import { CreateUserDTO } from '../dto/CreateUserDTO';
import { registerUser } from '../actions/registerUser';
import { validateCreateUserDTO } from '../validators/validateCreateUserDTO';
import supabase from '../../../../supabase';
import { showLoading, hideLoading } from '../../../shared/slices/loadingSlice';

const AddUserPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { name, avatar, phoneNumber } = useSelector((state) => state.user);
  const selectedLanguage = useSelector((state) => state.language.selected);

  const [submitted, setSubmitted] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    supabase.from('provinces').select('id, name').then(({ data }) => setProvinces(data || []));
  }, []);

  const fetchDistricts = async (provinceId) => {
    const { data } = await supabase.from('district').select('id, name').eq('province_id', provinceId);
    setDistricts(data || []);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) dispatch(setAvatar(result.assets[0].uri));
  };

  const handleSubmit = async () => {
    setSubmitted(true);

    const dto = new CreateUserDTO({
      name,
      phoneNumber,
      avatar,
      provinceId: selectedProvinceId,
      districtId: selectedDistrictId,
      languageId: selectedLanguage?.id,
    });

    const result = validateCreateUserDTO(dto, t);
    setErrors(result.errors);

    if (!result.isValid) {
      console.warn('Validation errors:', result.errors);
      return;
    }

    dispatch(showLoading());
    await registerUser({ dto, dispatch, navigation, t });
    dispatch(hideLoading());
  };

  const validateProvince = () => selectedProvinceId !== null;
  const validateDistrict = () => selectedDistrictId !== null;

  const handleNameChange = (text) => {
    dispatch(setName(text));
    if (errors.name) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.name;
        return updated;
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={avatar ? { uri: avatar } : require('../../../assets/photo/user_avatar.png')}
              style={styles.avatar}
            />
          </TouchableOpacity>

          <CustomInput
            value={name}
            setValue={handleNameChange}
            label={t('user_register.full_name')}
            placeholder={t('user_register.full_name_placeholder')}
            iconName="person"
            error={submitted ? errors?.name : ''}
          />

          <CustomInput
            value={phoneNumber}
            setValue={(text) => dispatch(setPhoneNumber(text))}
            label={t('fields.phone')}
            placeholder={t('fields.phone')}
            iconName="phone"
            editable={false}
          />

          <ProvinceDistrictPicker
            provinces={provinces}
            districts={districts}
            selectedProvinceId={selectedProvinceId}
            setSelectedProvinceId={setSelectedProvinceId}
            selectedDistrictId={selectedDistrictId}
            setSelectedDistrictId={setSelectedDistrictId}
            fetchDistricts={fetchDistricts}
            submitted={submitted}
            t={t}
            validateProvince={validateProvince}
            validateDistrict={validateDistrict}
          />

          <CustomButton 
            buttonText={t('user_register.submit_button')} 
            onPress={handleSubmit}           
            type="primary"
            iconName="person-add-outline"
            iconLibrary="Ionicons"
            style={styles.button}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AddUserPage;
