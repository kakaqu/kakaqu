import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  Pressable,
  Modal,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import SearchInput from '../../shared/components/forms/SearchInput';
import CustomTheme from '../../shared/styles/CustomThems';
import styles from './styles/topBarStyles';

const TopBar = ({
  title,
  showSearch = false,
  onSearch,
  showAdvancedSearch = false,
  onAdvancedSearchPress,
  notificationCount = 0,
  onNotificationPress,
  showMoreOptions = false,
  moreOptionsItems = [],
  onMoreOptionSelect,
  dismissSearchOnScroll = false,
  moreOptionsIcon = 'more-vert', // 👈 her ekran için özelleştirilebilir
  searchPlaceholder = '',
}) => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const [moreMenuVisible, setMoreMenuVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      setSearchText('');
      onSearch?.('');
      setShowSearchPopup(false);
      setMoreMenuVisible(false);
    }, [])
  );


  useEffect(() => {
    if (dismissSearchOnScroll) {
      setShowSearchPopup(false);
    }
  }, [dismissSearchOnScroll]);

  const handleSearchChange = (text) => {
    setSearchText(text);
    onSearch?.(text);
  };

  const renderIconButton = (icon, onPress, color = CustomTheme.colors.primary, size = 26) => (
    <TouchableOpacity onPress={onPress} style={styles.iconButton}>
      <MaterialIcons name={icon} size={size} color={color} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.rightItems}>
          {showSearch && renderIconButton('search', () => setShowSearchPopup(true))}
          {showAdvancedSearch && renderIconButton('filter-list', onAdvancedSearchPress, CustomTheme.colors.secondary)}
          {renderIconButton(
            notificationCount > 0 ? 'notifications' : 'notifications-none',
            onNotificationPress,
            notificationCount > 0 ? CustomTheme.colors.primary : '#aaa'
          )}
          {showMoreOptions && moreOptionsItems.length > 0 &&
            renderIconButton(moreOptionsIcon, () => setMoreMenuVisible(true), CustomTheme.colors.primary, 28)}
        </View>
      </View>

      {showSearchPopup && (
        <View style={styles.popupContainer}>
          <View style={styles.searchRow}>
            <SearchInput
              placeholder={searchPlaceholder || 'Ara...'}
              value={searchText}
              onChangeText={handleSearchChange}
              style={styles.searchInput}
              autoFocus
            />
            <TouchableOpacity
              onPress={() => {
                setSearchText('');
                onSearch?.('');
                setShowSearchPopup(false);
              }}
              style={styles.closeButton}
            >
              <MaterialIcons name="close" size={24} color="#999" />
            </TouchableOpacity>
          </View>
        </View>
      )}


      {/* 3 Nokta Menüsü */}
      <Modal
        visible={moreMenuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMoreMenuVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setMoreMenuVisible(false)}
        >
          <View style={styles.moreMenuContainer}>
            {moreOptionsItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => {
                  onMoreOptionSelect?.(item);
                  setMoreMenuVisible(false);
                }}
              >
                {item.icon && (
                  <Ionicons
                    name={item.icon}
                    size={22}
                    color={CustomTheme.colors.primary}
                    style={styles.menuItemIcon}
                  />
                )}
                <Text style={styles.menuItemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default TopBar;
