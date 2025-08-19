import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"; // 📍 Google Maps desteği

import CategoryPickerSingle from "../../../shared/components/pickers/CategoryPickerSingle";
import ProvinceDistrictPicker from "../../../shared/components/pickers/ProvinceDistrictPicker";
import CustomInput from "../../../shared/components/forms/CustomInput";
import CustomButton from "../../../shared/components/buttons/CustomButton";
import { setCategoryId, setProvinceId, setDistrictId } from "../slices/shopSlice";
import styles from "../styles/step2FormStyles";

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
  const shop = useSelector((state) => state.shop);

  // 📍 Cihazın konumunu otomatik al
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Konum izni verilmedi, varsayılan konum gösteriliyor.");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    })();
  }, []);

  const handleSubmit = () => {
    onNext({
      categoryId: shop.categoryId,
      provinceId: shop.provinceId,
      districtId: shop.districtId,
      addressLine,
      latitude: location.latitude,
      longitude: location.longitude,
    });
  };

  return (
    <View style={styles.container}>
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
        validateProvince={() => !!shop.provinceId}
        validateDistrict={() => !!shop.districtId}
      />

      <CustomInput
        value={addressLine}
        setValue={setAddressLine}
        label={t("user_register.address")}
        placeholder={t("user_register.address_placeholder")}
        iconName="location-pin"
        error={submitted ? errors?.addressLine : ""}
      />

      <Text style={styles.mapLabel}>
        {t("shop_register.choose_location")}
      </Text>

      <MapView
        provider={PROVIDER_GOOGLE} // 📍 Google Maps kullan
        style={styles.map}
        region={{
          latitude: location.latitude || 34.52813,
          longitude: location.longitude || 69.17233,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
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
        style={styles.submitButton}
        buttonText={t("user_register.submit_button")}
        onPress={handleSubmit}
        type="primary"
        iconName="add-shopping-cart"
        iconLibrary="MaterialIcons"
      />

      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>
          {t("form.back")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Step2Form;
