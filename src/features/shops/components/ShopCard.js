import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  Linking,
} from 'react-native';
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import CustomThems from '../../../shared/styles/CustomThems';
import styles from '../styles/shopCardStyles';
import { shopOptions } from './shopOptions';

import { hideModal, showModal } from '../../../shared/slices/globalModalSlice';
import { dispatchAlert } from '../../../shared/utils/alerts/alertUtils';

import { reportShop } from '../services/reportShop';
import { blockShop } from '../services/blockShop';
import { followShop } from '../services/followShop';
import { unfollowShop } from '../services/unfollowShop';
import { insertNotification } from '../../notifications/services/insertNotification';
import CancelButton from '../../../shared/components/buttons/CancelButton';
import { useNavigation } from '@react-navigation/native';



const ShopCard = ({ shop, t, onShopStatusChange, isExpanded, onToggleExpand }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const iconRef = useRef(null);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user?.id);
  const userName = useSelector((state) => state.user?.name);
  const navigation = useNavigation();

  const showMenu = () => {
    const screenHeight = Dimensions.get('window').height;
    const menuHeight = 150;

    iconRef.current?.measure((fx, fy, width, height, px, py) => {
      const spaceBelow = screenHeight - (py + height);
      const spaceAbove = py;

      let y;
      if (spaceBelow >= menuHeight) y = py + height;
      else if (spaceAbove >= menuHeight) y = py - menuHeight;
      else y = py + height;

      setMenuPosition({ x: px, y });
      setMenuVisible(true);
    });
  };

  const handleBlockOrReport = (type) => {
    setMenuVisible(false);
    dispatch(showModal({
      content: 'SHOP_REASON_MODAL',
      props: {
        type,
        shop,
        onSubmit: async (reason) => {
          try {
            if (type === 'block') {
              await blockShop(userId, shop.id, reason);
              dispatchAlert(dispatch, {
                type: 'success',
                title: t('info.success'),
                message: t('shop_cart.blockSuccess'),
                submitText: t('form.ok'),
                onSubmit: () => dispatch(hideModal()),
              });
              onShopStatusChange?.({ shopId: shop.id, type: 'block' });
            }
            if (type === 'report') {
              await reportShop({ userId, shopId: shop.id, reason });
              dispatchAlert(dispatch, {
                type: 'success',
                title: t('info.success'),
                message: t('shop_cart.reportSuccess'),
                submitText: t('form.ok'),
                onSubmit: () => dispatch(hideModal()),
              });
            }
          } catch (err) {
            console.error(err);
            dispatchAlert(dispatch, {
              type: 'error',
              title: t('info.error'),
              message: t('shop_cart.error'),
              submitText: t('form.ok'),
              onSubmit: () => dispatch(hideModal()),
            });
          }
        },
      },
    }));
  };

  const handleOptionPress = async (option) => {
    if (option.key === 'block') return handleBlockOrReport('block');
    if (option.key === 'report') return handleBlockOrReport('report');

    if (option.key === 'follow') {
      setMenuVisible(false);
      try {
        if (shop.isSubscribed) {
          const success = await unfollowShop(shop.id, userId);
          if (success) {
            dispatchAlert(dispatch, {
              type: 'success',
              title: t('info.success'),
              message: t('shop_cart.unfollowSuccess'),
              submitText: t('form.ok'),
            });
            onShopStatusChange?.({ shopId: shop.id, type: 'subscribe', isSubscribed: false });
          }
        } else {
          const success = await followShop(shop.id, userId);
          if (success) {
            dispatchAlert(dispatch, {
              type: 'success',
              title: t('info.success'),
              message: t('shop_cart.followSuccess'),
              submitText: t('form.ok'),
            });
            onShopStatusChange?.({ shopId: shop.id, type: 'subscribe', isSubscribed: true });

            await insertNotification({
              userId: shop.user_id,
              notificationTypeId: '678d9b98-b0fc-4691-a501-d7fc74fd6820',
              payload: {
                user: userName || 'Bir kullanıcı',
                userId: userId,
                shop: shop.name || 'Dükkan',
              },
            });
          }
        }
      } catch (err) {
        console.error('❌ follow/unfollow error:', err);
        dispatchAlert(dispatch, {
          type: 'error',
          title: t('info.error'),
          message: t('shop_cart.error'),
          submitText: t('form.ok'),
        });
      }
      return;
    }

    if (option.key === 'viewProfile') {
      setMenuVisible(false);
      navigation.navigate('ShopDashboard', { shopId: shop.id });
      return;
    }
    setMenuVisible(false);
  };

  const openInMap = () => {
    const { latitude, longitude } = shop.address || {};
    if (latitude && longitude) {
      const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
      Linking.openURL(url);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={() => onToggleExpand(shop.id)}
      style={[styles.card, isExpanded && { borderWidth: 1, borderColor: CustomThems.colors.primary }]}
    >
      {/* Üst Satır */}
      <View style={styles.topRow}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: shop.logo }} style={styles.avatar} />
          <View style={[styles.verticalLine, {
            backgroundColor: shop.isSubscribed
              ? CustomThems.colors.primary
              : CustomThems.colors.secondary,
          }]} />
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.headerRow}>
            <View style={styles.texts}>
              <Text style={styles.name}>{shop.name}</Text>
              <Text style={styles.category}>{shop.category}</Text>
              {!isExpanded && (
                <Text style={styles.location}>
                  <Ionicons name="location-sharp" size={14} color={CustomThems.colors.primary} />{' '}
                  {shop.address?.provinceName}, {shop.address?.districtName}
                </Text>
              )}
            </View>
            <TouchableOpacity
              ref={iconRef}
              onPress={(e) => {
                e.stopPropagation();
                showMenu();
              }}
              style={styles.menuIcon}
              activeOpacity={0.7}
            >
              <Entypo name="dots-three-vertical" size={16} color={CustomThems.colors.darkGray} />
            </TouchableOpacity>
          </View>

          <View style={styles.stats}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{shop.commentCount}</Text>
              <Text style={styles.statLabel}>{t('shop_cart.Comment')}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{shop.subscriberCount}</Text>
              <Text style={styles.statLabel}>{t('shop_cart.Followers')}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{shop.rating}</Text>
              <Text style={styles.statLabel}>{t('shop_cart.Rating')}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Genişletilmiş İçerik */}
      {isExpanded && (
        <View style={styles.expandedContent}>

          {shop.description && (
            <>
              <View style={styles.descriptionContainer}>
                <Text style={styles.description}>
                  {shop.description?.length > 200
                    ? `${shop.description.slice(0, 200)}...`
                    : shop.description}
                </Text>
              </View>
              <View style={styles.separator} />
            </>
          )}

            {(shop.address?.latitude && shop.address?.longitude) && (
              <>
                <View style={styles.phoneRow}>
                  <Ionicons name="map-outline" size={20} color={CustomThems.colors.primary} />
                  <Text style={styles.phone} onPress={openInMap} >{t('shop_cart.viewOnMap')}</Text>
                </View>
                <View style={styles.separator} />
              </>
            )}

          {shop.mobile && (
            <>
              <View style={styles.phoneRow}>
                <Ionicons name="call" size={20} color={CustomThems.colors.primary} />
                <Text style={styles.phone}>{shop.mobile}</Text>
              </View>
              <View style={styles.separator} />
            </>
          )}

          <>
            <Text style={styles.locationDetail}>
              <Ionicons name="location-sharp" size={16} color={CustomThems.colors.primary} />
              {' '}
              {shop.address?.provinceName}, {shop.address?.districtName}, {shop.address?.line}
            </Text>
            <View style={styles.separator} />
            </>

            <View style={{ flex: 0.4 }}>
              <CancelButton
                onPress={() => handleOptionPress({ key: 'viewProfile' })}
                buttonText={t('shop_options.viewProfile')}
              />
            </View>


        </View>
      )}


      {/* Menü */}
      <Modal visible={menuVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
          activeOpacity={1}
        >
          <View style={[styles.menuContainer, {
            position: 'absolute',
            top: menuPosition.y,
            left: menuPosition.x - 250,
          }]}
          >
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>{shop.name}</Text>
            </View>
            {shopOptions(t, shop.isSubscribed).map((option) => (
              <TouchableOpacity
                key={option.key}
                style={styles.menuItem}
                onPress={() => handleOptionPress(option)}
                activeOpacity={0.7}
              >
                {option.icon?.type === 'Ionicons' && (
                  <Ionicons name={option.icon.name} size={18} color={CustomThems.colors.primary} />
                )}
                {option.icon?.type === 'MaterialIcons' && (
                  <MaterialIcons name={option.icon.name} size={18} color={CustomThems.colors.primary} />
                )}
                <Text style={styles.menuLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </TouchableOpacity>
  );
};

export default ShopCard;
