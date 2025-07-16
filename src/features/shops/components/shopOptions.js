export const shopOptions = (t, isSubscriber) => [
  {
    key: 'viewProfile',
    label: t('shop_options.viewProfile'),
    icon: { name: 'person-circle-outline', type: 'Ionicons' },
  },
  {
    key: 'follow',
    label: isSubscriber ? t('shop_options.following') : t('shop_options.follow'),
    icon: {
      name: isSubscriber ? 'heart' : 'heart-outline',
      type: 'Ionicons',
    },
  },
  { key: 'share', label: t('shop_options.share'), icon: { name: 'share-social-outline', type: 'Ionicons' } },
  { key: 'report', label: t('shop_options.report'), icon: { name: 'report', type: 'MaterialIcons' } },
  { key: 'block', label: t('shop_options.block'), icon: { name: 'block', type: 'MaterialIcons' } },
];
