// 📁 components/AddShop/Step2Form.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CategoryPickerSingle from '../../../shared/components/pickers/CategoryPickerSingle';
import ProvinceDistrictPicker from '../../../shared/components/pickers/ProvinceDistrictPicker';
import CustomInput from '../../../shared/components/forms/CustomInput';
import CustomButton from '../../../shared/components/buttons/CustomButton';
import { MapView, Marker } from '../../../shared/utils/map/MapWrapper';
import {
  setCategoryId,
  setProvinceId,
  setDistrictId,
} from '../slices/shopSlice';
import styles from '../styles/addShopStyles';

const Step2Form = ({
  submitted,
  errors,
  addressLine,
  setAddressLine,
  location,
  setLocation,
  provinces,
  districts,
  fetchDistricts,
  onBack,
  onNext,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const shop = useSelector(state => state.shop);

  const handleSubmit = () => {
    const dto = {
      categoryId: shop.categoryId,
      provinceId: shop.provinceId,
      districtId: shop.districtId,
      addressLine,
      latitude: location.latitude,
      longitude: location.longitude,
    };
    onNext(dto); // ❗ validasyon dışarıda yapılacak
  };

  return (
    <View style={{ marginTop: 40 }}>
      
      <CategoryPickerSingle
        selectedCategoryId={shop.categoryId}
        setSelectedCategoryId={(id) => dispatch(setCategoryId(id))}
        submitted={submitted}
      />

      <ProvinceDistrictPicker
        provinces={provinces}
        districts={districts}
        selectedProvinceId={shop.provinceId}
        setSelectedProvinceId={(id) => dispatch(setProvinceId(id))}
        selectedDistrictId={shop.districtId}
        setSelectedDistrictId={(id) => dispatch(setDistrictId(id))}
        fetchDistricts={fetchDistricts}
        submitted={submitted}
        t={t}
        validateProvince={() => shop.provinceId !== null}
        validateDistrict={() => shop.districtId !== null}
      />

      <CustomInput
        value={addressLine}
        setValue={setAddressLine}
        label={t('user_register.address')}
        placeholder={t('user_register.address_placeholder')}
        iconName="location-pin"
        error={submitted ? errors?.addressLine : ''}
      />

      <Text style={styles.mapLabel}>
        {t('shop_register.choose_location') || 'Konum Seçin'}
      </Text>

      <MapView
        style={styles.map}
        region={
          location.latitude && location.longitude
            ? {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }
            : {
                latitude: 34.52813,
                longitude: 69.17233,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }
        }
        onPress={(e) => setLocation(e.nativeEvent.coordinate)}
      >
        {location.latitude && location.longitude && (
          <Marker coordinate={location} />
        )}
      </MapView>

      {submitted && errors?.location && (
        <Text style={styles.errorText}>{errors.location}</Text>
      )}

      <CustomButton
        buttonText={t('user_register.submit_button')}
        onPress={handleSubmit}
      />

      <TouchableOpacity onPress={onBack}>
        <Text style={styles.backText}>{t('form.back') || '<< Geri Dön'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Step2Form;
