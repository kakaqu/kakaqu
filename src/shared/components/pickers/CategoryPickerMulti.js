import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import CustomComboBox from '../forms/CustomComboBox';
import supabase from '../../../../supabase';
import { useTranslation } from 'react-i18next';

const CategoryPickerMulti = ({
  selectedParentId,
  setSelectedParentId,
  selectedCategoryId,
  setSelectedCategoryId,
  selectedSubcategoryId,
  setSelectedSubcategoryId,
  submitted = false,
}) => {
  const { t } = useTranslation();
  const [parents, setParents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  // fetch parents
  useEffect(() => {
    supabase
      .from('parent_categories')
      .select('id, name')
      .eq('delete_status', false)
      .eq('status', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => setParents(data || []));
  }, []);

  // fetch categories when parent changes
  useEffect(() => {
    if (!selectedParentId) {
      setCategories([]);
      return;
    }

    supabase
      .from('product_categories')
      .select('id, name')
      .eq('delete_status', false)
      .eq('status', true)
      .eq('parent_id', selectedParentId)
      .order('sort_order', { ascending: true })
      .then(({ data }) => setCategories(data || []));
  }, [selectedParentId]);

  // fetch subcategories when category changes
  useEffect(() => {
    if (!selectedCategoryId) {
      setSubcategories([]);
      return;
    }

    supabase
      .from('product_subcategories')
      .select('id, name')
      .eq('delete_status', false)
      .eq('status', true)
      .eq('category_id', selectedCategoryId)
      .order('sort_order', { ascending: true })
      .then(({ data }) => setSubcategories(data || []));
  }, [selectedCategoryId]);

  return (
    <View style={{ gap: 10 }}>
      {/* Üst Kategori */}
      <CustomComboBox
        label={t('product.parent_category')}
        options={parents.map(p => ({ label: p.name, value: p.id }))}
        selectedValue={selectedParentId}
        setSelectedValue={(val) => {
          setSelectedParentId(val);
          setSelectedCategoryId(null);
          setSelectedSubcategoryId(null);
        }}
        placeholder={t('product.select_parent')}
        error={
          submitted && !selectedParentId
            ? t('validation.parent_required')
            : ''
        }
      />

      {/* Kategori */}
      <CustomComboBox
        label={t('product.category')}
        options={categories.map(c => ({ label: c.name, value: c.id }))}
        selectedValue={selectedCategoryId}
        setSelectedValue={(val) => {
          setSelectedCategoryId(val);
          setSelectedSubcategoryId(null);
        }}
        disabled={!selectedParentId}
        placeholder={t('product.select_category')}
        error={
          submitted && !selectedCategoryId
            ? t('validation.category_required')
            : ''
        }
      />

      {/* Alt Kategori */}
      <CustomComboBox
        label={t('product.subcategory')}
        options={subcategories.map(s => ({ label: s.name, value: s.id }))}
        selectedValue={selectedSubcategoryId}
        setSelectedValue={setSelectedSubcategoryId}
        disabled={!selectedCategoryId}
        placeholder={t('product.select_subcategory')}
        error={
          submitted && !selectedSubcategoryId
            ? t('validation.subcategory_required')
            : ''
        }
      />
    </View>
  );
};

export default CategoryPickerMulti;
