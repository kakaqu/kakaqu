import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import CustomThems from '../../styles/CustomThems';
import styles from '../../../features/shops/styles/ShopCard/shopCardMenuStyles';


const CommentMenu = ({ visible, position, comment, currentUserId, isOwner, t, onClose, onOptionPress, getOptions }) => {
  if (!visible) return null;

  const screen = Dimensions.get('window');
  const menuWidth = 250;
  const menuHeight = 300;

  // Pozisyonu ayarla (ekrandan dışarı taşarsa ortala)
  let top = position.y;
  let left = position.x;

  if (top + menuHeight > screen.height) {
    top = screen.height - menuHeight - 10;
  }

  if (left + menuWidth > screen.width) {
    left = screen.width - menuWidth - 10;
  }

  if (top < 0) top = 10;
  if (left < 0) left = 10;

  const options = getOptions({ comment, currentUserId, isOwner, t });

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity
        style={styles.modalOverlay}
        onPress={onClose}
        activeOpacity={1}
      >
        <View
          style={[
            styles.menuContainer,
            {
              position: 'absolute',
              top,
              left,
              width: menuWidth,
            },
          ]}
        >
          <View style={styles.menuHeader}>
            <Text style={styles.menuTitle}>{comment?.user?.name || "Kullanıcı"}</Text>
          </View>

          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.menuItem}
              onPress={() => onOptionPress(option)}
              activeOpacity={0.7}
            >
              {option.icon && option.icon(CustomThems.colors.primary, 20)}
              <Text style={styles.menuLabel}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default CommentMenu;
