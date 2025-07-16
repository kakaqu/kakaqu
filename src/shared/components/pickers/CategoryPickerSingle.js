import React, { useEffect, useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import CustomComboBox from '../forms/CustomComboBox';
import supabase from '../../../../supabase';
import getLanguageCode from '../../services/getLanguageCode';
import styles from '../../../features/shops/styles/categoryPickerSingleStyles';

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
  const [fetchError, setFetchError] = useState(null);

  const { t } = useTranslation();
  const languageId = useSelector((state) => state.user.languageId);
  const languageCode = useMemo(() => getLanguageCode(languageId), [languageId]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('parent_categories_translations')
        .select(`
          parent_id,
          name,
          parent_categories (
            id,
            sort_order,
            status,
            delete_status
          )
        `)
        .eq('language_code', languageCode)
        .eq('parent_categories.status', true)
        .eq('parent_categories.delete_status', false);

      if (error) {
        console.error('Kategori verisi alınamadı:', error);
        setFetchError(t('error.fetch_categories'));
        setCategories([]);
        return;
      }

      const sorted = (data || [])
        .sort(
          (a, b) =>
            (a.parent_categories?.sort_order ?? 0) -
            (b.parent_categories?.sort_order ?? 0)
        )
        .map((cat) => ({
          label: cat.name,
          value: cat.parent_id,
        }));

      setCategories(sorted);
    };

    fetchCategories();
  }, [languageCode, t]);

  return (
    <View style={styles.container}>
      <CustomComboBox
        label={label || t('shop_register.category')}
        options={categories}
        selectedValue={selectedCategoryId}
        setSelectedValue={setSelectedCategoryId}
        placeholder={placeholder || t('user_register.province_placeholder')}
        disabled={disabled}
        error={
          submitted && !selectedCategoryId
            ? errorText || t('validation.category_required')
            : ''
        }
      />
      {fetchError && (
        <Text style={styles.errorText}>{fetchError}</Text>
      )}
    </View>
  );
};

export default CategoryPickerSingle;
