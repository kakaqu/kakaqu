import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
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

const ShopCard = ({ shop, t, onShopStatusChange }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const iconRef = useRef(null);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user?.id);
  const userName = useSelector((state) => state.user?.name);

  const showMenu = () => {
    const screenHeight = Dimensions.get('window').height;
    const menuHeight = 150; // Menü yüksekliği tahmini (ya da sabit)
    
    iconRef.current?.measure((fx, fy, width, height, px, py) => {
      const spaceBelow = screenHeight - (py + height);
      const spaceAbove = py;

      let y;

      if (spaceBelow >= menuHeight) {
        // Menü aşağı sığar
        y = py + height;
      } else if (spaceAbove >= menuHeight) {
        // Menü yukarı sığar
        y = py - menuHeight;
      } else {
        // Hiçbirine tam sığmazsa, aşağıya koy ama taşabileceğini bil
        y = py + height;
      }

      setMenuPosition({ x: px, y });
      setMenuVisible(true);
    });
  };

  const handleBlockOrReport = (type) => {
    setMenuVisible(false);
    dispatch(
      showModal({
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
      })
    );
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
            });
            onShopStatusChange?.({
              shopId: shop.id,
              type: 'subscribe',
              isSubscribed: false,
            });
          }
        } else {
          const success = await followShop(shop.id, userId);
          if (success) {
            dispatchAlert(dispatch, {
              type: 'success',
              title: t('info.success'),
              message: t('shop_cart.followSuccess'),
            });
            onShopStatusChange?.({
              shopId: shop.id,
              type: 'subscribe',
              isSubscribed: true,
            });

            // ✅ Bildirim gönder (shop_subscribed)
            await insertNotification({
              userId: shop.user_id, // dükkan sahibi
              notificationTypeId: '678d9b98-b0fc-4691-a501-d7fc74fd6820',
              payload: {
                user: userName || 'Bir kullanıcı', // takip eden kişi
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
        });
      }
      return;
    }

    setMenuVisible(false);
  };


  return (
    <View style={styles.card}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: shop.logo }} style={styles.avatar} />
        <View
          style={[
            styles.verticalLine,
            {
              backgroundColor: shop.isSubscribed
                ? CustomThems.colors.primary
                : CustomThems.colors.secondary,
            },
          ]}
        />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <View style={styles.texts}>
            <Text style={styles.name}>{shop.name}</Text>
            <Text style={styles.category}>{shop.category}</Text>
            <Text style={styles.location}>
              <Ionicons name="location-sharp" size={14} color={CustomThems.colors.primary} />{' '}
              {shop.address?.provinceName}, {shop.address?.districtName}
            </Text>
          </View>
          <TouchableOpacity
            ref={iconRef}
            onPress={showMenu}
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

      <Modal visible={menuVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
          activeOpacity={1}
        >
          <View
            style={[
              styles.menuContainer,
              {
                position: 'absolute',
                top: menuPosition.y,
                left: menuPosition.x - 250,
              },
            ]}
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
                {option.icon?.type === 'Entypo' && (
                  <Entypo name={option.icon.name} size={18} color={CustomThems.colors.primary} />
                )}
                <Text style={styles.menuLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default ShopCard;
