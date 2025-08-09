import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';

export const shopOptions = (t, isSubscriber) => [
  {
    key: 'preview',
    label: t('shopCard.previewAsVisitor'), // "Ziyaretçi Gibi Gör"
    icon: { name: 'eye-outline', type: 'Ionicons' },
  },
  {
    key: 'follow',
    label: isSubscriber ? t('shopCard.following') : t('shopCard.follow'),
    icon: {
      name: isSubscriber ? 'heart' : 'heart-outline',
      type: 'Ionicons',
    },
  },
  {
    key: 'message',
    label: t('shopCard.message'),
    icon: { name: 'chatbubble-ellipses-outline', type: 'Ionicons' },
  },
  {
    key: 'comment',
    label: t('shopCard.comment'),
    icon: { name: 'chatbox-ellipses-outline', type: 'Ionicons' },
  },
  {
    key: 'rate',
    label: t('shopCard.rate'),
    icon: { name: 'star-outline', type: 'Ionicons' },
  },
  {
    key: 'share',
    label: t('shopCard.share'),
    icon: { name: 'share-social-outline', type: 'Ionicons' },
  },
  {
    key: 'report',
    label: t('shopCard.report'),
    icon: { name: 'report', type: 'MaterialIcons' },
  },
  {
    key: 'block',
    label: t('shopCard.block'),
    icon: { name: 'block', type: 'MaterialIcons' },
  },
];


const ShopDashboardMenu = ({ isSubscriber, onSelectOption }) => {
  const [visible, setVisible] = useState(false);
  const { t } = useTranslation();
  const options = shopOptions(t, isSubscriber);

  const renderIcon = (icon) => {
    if (icon.type === 'Ionicons') {
      return <Ionicons name={icon.name} size={20} color="#333" />;
    } else if (icon.type === 'MaterialIcons') {
      return <MaterialIcons name={icon.name} size={20} color="#333" />;
    }
    return null;
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Ionicons name="ellipsis-vertical" size={22} color="#444" />
      </TouchableOpacity>

      <Modal transparent visible={visible} animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setVisible(false)}
          activeOpacity={1}
        >
          <View style={styles.menuContainer}>
            {options.map((item) => (
              <TouchableOpacity
                key={item.key}
                style={styles.menuItem}
                onPress={() => {
                  setVisible(false);
                  onSelectOption?.(item.key);
                }}
              >
                {renderIcon(item.icon)}
                <Text style={styles.menuLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingTop: 60,
    paddingRight: 10,
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 180,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  menuLabel: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
});

export default ShopDashboardMenu;
