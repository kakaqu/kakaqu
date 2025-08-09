import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import styles from '../../styles/ShopCard/shopCardMenuStyles';
import { shopOptions } from '../shopOptions';
import CustomThems from '../../../../shared/styles/CustomThems';

const ShopCardMenu = ({ visible, position, shop, t, onClose, onOptionPress }) => {
  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity
        style={styles.modalOverlay}
        onPress={onClose}
        activeOpacity={1}
      >
        <View style={[styles.menuContainer, {
          position: 'absolute',
          top: position.y,
          left: position.x - 250,
        }]}>
          <View style={styles.menuHeader}>
            <Text style={styles.menuTitle}>{shop.name}</Text>
          </View>

          {shopOptions(t, shop.isSubscribed).map((option) => (
            <TouchableOpacity
              key={option.key}
              style={styles.menuItem}
              onPress={() => onOptionPress(option)}
              activeOpacity={0.7}
            >
              {option.icon?.type === 'Ionicons' && (
                <Ionicons
                  name={option.icon.name}
                  size={18}
                  color={CustomThems.colors.primary}
                />
              )}
              {option.icon?.type === 'MaterialIcons' && (
                <MaterialIcons
                  name={option.icon.name}
                  size={18}
                  color={CustomThems.colors.primary}
                />
              )}
              <Text style={styles.menuLabel}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ShopCardMenu;
