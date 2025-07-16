import supabase from '../../../../../supabase';

export async function getParentCategoryNameByCategoryId(categoryId, languageCode = 'fa') {
  if (!categoryId) {
    console.warn('⚠️ getParentCategoryNameByCategoryId: boş categoryId');
    return null;
  }

  const { data, error } = await supabase
    .from('parent_categories_translations')
    .select('name')
    .eq('parent_id', categoryId)
    .eq('language_code', languageCode)
    .maybeSingle();

  if (error) {
    console.error('❌ parent_categories_translations fetch error:', error.message);
    return null;
  }

  return data?.name || 'Kategori bilinmiyor';
}
