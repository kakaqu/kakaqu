import React, { useState, useRef } from 'react';
import {
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import styles from '../styles/shopCardStyles';
import CustomThems from '../../../shared/styles/CustomThems';
import { hideModal, showModal } from '../../../shared/slices/globalModalSlice';
import { dispatchAlert } from '../../../shared/utils/alerts/alertUtils';
import { insertNotification } from '../../notifications/services/insertNotification';

import ShopCardHeader from './ShopCard/ShopCardHeader';
import ShopDetail from './ShopCard/ShopDetail';
import ShopCardMenu from './ShopCard/ShopCardMenu';


import { reportShop } from '../services/reportShop';
import { blockShop } from '../services/blockShop';
import { followShop } from '../services/followShop';
import { unfollowShop } from '../services/unfollowShop';
import CancelButton from '../../../shared/components/buttons/CancelButton';
import CustomButton from '../../../shared/components/buttons/CustomButton';


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
            } else {
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

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={() => onToggleExpand(shop.id)}
      style={[
        styles.card,
        isExpanded && {
          borderWidth: 1,
          borderColor: CustomThems.colors.primary,
        },
      ]}
    >
      <ShopCardHeader
        shop={shop}
        t={t}
        isExpanded={isExpanded}
        iconRef={iconRef}
        onMenuPress={(e) => {
          e.stopPropagation();
          showMenu();
        }}
      />

      {/* <ShopCardStats shop={shop} t={t} /> */}

      {isExpanded && (
        <>
          <ShopDetail shop={shop} t={t} />
          <View style={{ flex: 0.4, width: "100%" }}>

            <CustomButton
              buttonText={t("shop_options.viewProfile", "profili gör")}
              type="lightGray"
              iconName="user"
              iconLibrary="Feather"
              onPress={() => handleOptionPress({ key: "viewProfile" })}
            />
          </View>
        </>
      )}

      <ShopCardMenu
        visible={menuVisible}
        position={menuPosition}
        shop={shop}
        t={t}
        onClose={() => setMenuVisible(false)}
        onOptionPress={handleOptionPress}
      />
    </TouchableOpacity>
  );
};

export default ShopCard;
