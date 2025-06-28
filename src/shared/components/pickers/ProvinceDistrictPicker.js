import React from 'react';
import { View } from 'react-native';
import CustomComboBox from '../forms/CustomComboBox';

const ProvinceDistrictPicker = ({
  provinces = [],
  districts = [],
  selectedProvinceId,
  setSelectedProvinceId,
  selectedDistrictId,
  setSelectedDistrictId,
  fetchDistricts,
  submitted,
  t,
  validateProvince,
  validateDistrict,
}) => {
  return (
    <View style={{ flexDirection: 'row', gap: 10 }}>
      {/* İlçe ComboBox */}
      <View style={{ flex: 1 }}>
        <CustomComboBox
          label={t('user_register.district')}
          options={districts.map(d => ({ label: d.name, value: d.id }))}
          selectedValue={selectedDistrictId}
          setSelectedValue={setSelectedDistrictId}
          placeholder={t('user_register.province_placeholder')}
          disabled={!selectedProvinceId}
          error={
            submitted && !validateDistrict()
              ? t('validation.district')
              : ''
          }
        />
      </View>

      {/* Vilayet ComboBox */}
      <View style={{ flex: 1 }}>
        <CustomComboBox
          label={t('user_register.province')}
          options={provinces.map(p => ({ label: p.name, value: p.id }))}
          selectedValue={selectedProvinceId}
          setSelectedValue={(val) => {
            setSelectedProvinceId(val);
            fetchDistricts(val);
            setSelectedDistrictId(null); // önceki ilçe temizlensin
          }}
          placeholder={t('user_register.province_placeholder')}
          error={
            submitted && !validateProvince()
              ? t('validation.province')
              : ''
          }
        />
      </View>
    </View>
  );
};

export default ProvinceDistrictPicker;