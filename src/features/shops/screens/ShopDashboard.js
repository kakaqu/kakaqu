import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getShopById } from '../services/get/getShopById';
import { followShop } from '../services/blockShop';
import { unfollowShop } from '../services/unfollowShop';
import getLanguageCode from '../../../shared/services/getLanguageCode';

import ShopCardStats from '../components/ShopCard/ShopCardStats';
import ShopDetail from '../components/ShopCard/ShopDetail';
import ShopDashboardMenu from '../components/ShopDashboardMenu';
import FollowButton from '../../../shared/components/buttons/FollowButton';
import MessageButton from '../../../shared/components/buttons/MessageButton';
import ShopStatsModal from '../modals/ShopStatsModal';

import CustomTheme from '../../../shared/styles/CustomThems';
import CustomButton from '../../../shared/components/buttons/CustomButton';

const ShopDashboard = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { shopId } = route.params;

  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showStatsModal, setShowStatsModal] = useState(false);

  const userId = useSelector((state) => state.user?.id);
  const languageId = useSelector((state) => state.user?.languageId);
  const languageCode = getLanguageCode(languageId);
  const { t } = useTranslation();

  useEffect(() => {
    const loadShop = async () => {
      setLoading(true);
      const result = await getShopById(shopId, userId, languageCode);
      setShop(result);
      setLoading(false);
    };
    loadShop();
  }, [shopId]);

  const handleFollow = async () => {
    if (!userId) return Alert.alert(t('shop.login_required'));
    try {
      await followShop(shopId, userId);
      setShop({
        ...shop,
        isSubscribed: true,
        subscriberCount: (shop.subscriberCount || 0) + 1,
      });
      Alert.alert(t('shop.follow_success'));
    } catch {
      Alert.alert(t('shop.follow_error'));
    }
  };

  const handleUnfollow = async () => {
    if (!userId) return Alert.alert(t('shop.login_required'));
    try {
      await unfollowShop(shopId, userId);
      setShop({
        ...shop,
        isSubscribed: false,
        subscriberCount: (shop.subscriberCount || 1) - 1,
      });
      Alert.alert(t('shop.unfollow_success'));
    } catch {
      Alert.alert(t('shop.unfollow_error'));
    }
  };

  const handleMessage = () => {
    if (!userId) return Alert.alert(t('shop.login_required'));
    navigation.navigate('ChatScreen', { shopId, shopName: shop.name });
  };

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  if (!shop) {
    return (
      <View style={styles.centered}>
        <Text>{t('shop.not_found')}</Text>
      </View>
    );
  }

  const ListHeader = () => (
    <>
      {shop.cover ? (
        <Image source={{ uri: shop.cover }} style={styles.coverImage} />
      ) : (
        <View style={[styles.coverImage, styles.coverPlaceholder]}>
          <Text style={styles.placeholderText}>{t('shop.no_cover')}</Text>
        </View>
      )}

      <View style={styles.topSection}>
        <Image source={{ uri: shop.logo }} style={styles.logoImage} />
        <View style={styles.infoSection}>
          <Text style={styles.shopName}>{shop.name}</Text>
          <Text style={styles.shopCategory}>{shop.category}</Text>
        </View>
        <View style={styles.menuWrapper}>
          <ShopDashboardMenu
            isSubscriber={shop.isSubscribed}
            onSelectOption={(key) => {
              if (key === 'follow') shop.isSubscribed ? handleUnfollow() : handleFollow();
              if (key === 'message') handleMessage();
              if (['comment', 'rate', 'share', 'report', 'block'].includes(key))
                Alert.alert(t(`shopCard.${key}`));
            }}
          />
        </View>
      </View>

      <View style={styles.actionRow}>
        {/* Takip Et / Takiptesin Butonu */}
        <View style={styles.buttonWrapper}>
          <CustomButton
            buttonText={t(
              shop.isSubscribed ? "shop.following" : "shop.follow",
              shop.isSubscribed ? "Takiptesin" : "Takip Et"
            )}
            iconName={shop.isSubscribed ? "user-check" : "user-plus"}
            type={shop.isSubscribed ? "primary_outline" : "primary"}
            iconLibrary="Feather"
            onPress={shop.isSubscribed ? handleUnfollow : handleFollow}
          />
        </View>

        {/* Mesaj Butonu */}
        <View style={styles.buttonWrapperLast}>
          <CustomButton
            buttonText={t("shop.message", "Mesaj Yaz")}
            type="primary_outline"
            iconName="message-circle"
            iconLibrary="Feather"
            onPress={handleMessage}
          />
        </View>
      </View>


      <View style={styles.card}>
        <TouchableOpacity onPress={() => setShowStatsModal(true)}>
          <ShopCardStats shop={shop} t={t} />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <ShopDetail shop={shop} t={t} />
      </View>

    </>
  );
  

  return (
    <View style={styles.container}>
      <FlatList data={[]} keyExtractor={() => 'dummy'} ListHeaderComponent={<ListHeader />} />
      <ShopStatsModal
        visible={showStatsModal}
        onClose={() => setShowStatsModal(false)}
        shopId={shopId}
        t={t}
        isOwner={!!shop?.user_id && shop.user_id === userId}
        isSubscribed={shop.isSubscribed}
        shopName={shop.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomTheme.colors.white,
  },
  coverImage: {
    width: '100%',
    height: 150,
  },
  coverPlaceholder: {
    backgroundColor: CustomTheme.colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: CustomTheme.colors.darkGray,
    fontSize: 13,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    marginTop: -30,
  },
  logoImage: {
    width: 90,
    height: 90,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: CustomTheme.colors.white,
    backgroundColor: CustomTheme.colors.lightGray,
  },
  infoSection: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
    marginTop: 40,
  },
  shopName: {
    fontSize: 20,
    fontWeight: '600',
    color: CustomTheme.colors.primary,
  },
  shopCategory: {
    fontSize: 14,
    color: CustomTheme.colors.darkGray,
    marginTop: 2,
  },
  menuWrapper: {
    paddingTop: 48,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  buttonWrapper: {
    flex: 1,
    marginRight: 8,
  },
  buttonWrapperLast: {
    flex: 1,
    marginRight: 0,
  },
  card: {
    backgroundColor: CustomTheme.colors.white,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShopDashboard;
