import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import CustomComboBox from '../forms/CustomComboBox';
import supabase from '../../../../supabase';
import { useTranslation } from 'react-i18next';

const CategoryPickerSingle = ({
  selectedCategoryId,
  setSelectedCategoryId,
  submitted = false,
  errorText = null,
  disabled = false,
  label,
  placeholder,
}) => {
  const [categories, setCategories] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('product_categories')
      .select('id, name')
      .eq('delete_status', false)
      .eq('status', true)
      .order('sort_order', { ascending: true });

    if (!error) setCategories(data || []);
  };

  return (
    <View>
      <CustomComboBox
        label={label || t('shop_register.category')}
        options={categories.map(cat => ({
          label: cat.name,
          value: cat.id,
        }))}
        selectedValue={selectedCategoryId}
        setSelectedValue={setSelectedCategoryId}
        placeholder={placeholder || t('shop_register.category_placeholder')}
        disabled={disabled}
        error={
          submitted && !selectedCategoryId
            ? errorText || t('validation.category_required')
            : ''
        }
      />
    </View>
  );
};

export default CategoryPickerSingle;
