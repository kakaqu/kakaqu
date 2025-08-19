import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  UIManager,
  findNodeHandle,
  RefreshControl,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Entypo, Feather } from "@expo/vector-icons";
import { fetchShopFollowers } from "../../services/get/fetchShopFollowers";
import { blockUser } from "../../services/blockUser";
import { unfollowShop } from "../../services/unfollowShop";
import { followShop } from "../../services/followShop";
import { isSubscribed } from "../../services/get/isSubscribed";
import { convertToAfghanDate } from "../../../../shared/utils/date/dateConverter";
import getLanguageCode from "../../../../shared/services/getLanguageCode";
import CustomTheme from "../../../../shared/styles/CustomThems";
import { getSubscriberMenuOptions } from "../menu/getSubscriberMenuOptions";
import { dispatchAlert } from "../../../../shared/utils/alerts/alertUtils";
import CustomButton from "../../../../shared/components/buttons/CustomButton";
import styles from "../../styles/ShopSubscriberStyles";

const DEFAULT_MENU_WIDTH = 240;
const DEFAULT_MENU_HEIGHT = 260;

const ShopSubscriberList = ({ shopId, limit = 10, isOwner }) => {
  const { t } = useTranslation();
  const languageId = useSelector((state) => state.user?.languageId);
  const userId = useSelector((state) => state.user?.id);
  const userName = useSelector((state) => state.user?.name);
  const userAvatar = useSelector((state) => state.user?.avatar);
  const languageCode = getLanguageCode(languageId);
  const dispatch = useDispatch();

  const currentUser = {
    id: userId,
    name: userName,
    avatar: userAvatar,
    followedAt: new Date().toISOString(),
  };

  // data + paging
  const [followers, setFollowers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // loading states
  const [initialLoading, setInitialLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Menu state
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedFollower, setSelectedFollower] = useState(null);

  const iconRefs = useRef({});

  // subscription state
  const [subscribed, setSubscribed] = useState(false);

  // İlk açılışta takip durumunu kontrol et
  useEffect(() => {
    if (!userId || !shopId) return;
    (async () => {
      try {
        const result = await isSubscribed(shopId, userId);
        setSubscribed(result);
      } catch (err) {
        console.error("isSubscribed hata:", err);
      }
    })();
  }, [shopId, userId]);

  // Takipçileri yükle
  useEffect(() => {
    setHasMore(true);
    loadFollowers(0);
  }, [shopId]);

  async function loadFollowers(pageToLoad = 0) {
    if ((pageToLoad === 0 && refreshing) || (pageToLoad > 0 && moreLoading)) return;

    if (pageToLoad === 0) {
      if (!refreshing) setInitialLoading(true);
    } else {
      setMoreLoading(true);
    }

    try {
      const newFollowers = await fetchShopFollowers({ shopId, page: pageToLoad, limit });

      if (newFollowers.length < limit) setHasMore(false);

      if (pageToLoad === 0) {
        setFollowers(newFollowers);
      } else {
        setFollowers((prev) => [...prev, ...newFollowers]);
      }

      setCurrentPage(pageToLoad);
    } catch (error) {
      console.error("Takipçiler yüklenirken hata:", error);
    } finally {
      if (pageToLoad === 0) {
        setInitialLoading(false);
        setRefreshing(false);
      } else {
        setMoreLoading(false);
      }
    }
  }

  // Refresh
  const onRefresh = () => {
    if (refreshing) return;
    setRefreshing(true);
    setHasMore(true);
    loadFollowers(0);
  };

  // Avatar render
  const renderAvatar = (name, avatarUrl) => {
    if (avatarUrl) {
      return <Image source={{ uri: avatarUrl }} style={styles.avatar} />;
    }
    const initial = name?.charAt(0)?.toUpperCase() || "?";
    return (
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarInitial}>{initial}</Text>
      </View>
    );
  };

  // Menü aç
  const openMenu = useCallback((item) => {
    const ref = iconRefs.current[item.id];
    if (!ref) return;
    const handle = findNodeHandle(ref);
    if (!handle) return;

    UIManager.measureInWindow(handle, (x, y, width, height) => {
      const screen = Dimensions.get("window");
      const menuWidth = DEFAULT_MENU_WIDTH;
      const menuHeight = DEFAULT_MENU_HEIGHT;

      const spaceBelow = screen.height - (y + height);
      const spaceAbove = y;

      let top;
      if (spaceBelow >= menuHeight) {
        top = y;
      } else if (spaceAbove >= menuHeight) {
        top = y - menuHeight;
      } else {
        top = Math.max(5, y - menuHeight / 2);
      }

      let left = x - menuWidth;
      if (left < 10) left = 10;
      if (left + menuWidth > screen.width - 10) {
        left = screen.width - menuWidth - 10;
      }

      setMenuPosition({ x: left, y: top });
      setSelectedFollower(item);
      setMenuVisible(true);
    });
  }, []);

  // Menü işlemleri
  const handleOptionPress = useCallback(
    async (option) => {
      setMenuVisible(false);
      if (!selectedFollower) return;

      switch (option) {
        case "view_profile":
          console.log("Profili gör:", selectedFollower.id);
          break;

        case "report":
          dispatchAlert(dispatch, {
            mode: "toast",
            type: "warning",
            title: t("info.success"),
            message: t("shop_comment.user_reported"),            
            submitText: t("form.ok"),
          });
          break;

        case "block_user":
          try {
            await blockUser({ shopId, userId: selectedFollower.id, reason: "spam" });
            setFollowers((prev) => prev.filter((f) => f.id !== selectedFollower.id));
            dispatchAlert(dispatch, {
              mode: "toast",
              type: "success",
              title: t("info.success"),
              message: t("shop_subscriber.user_blocked"),              
              submitText: t("form.ok"),
            });
          } catch (error) {
            console.error("Block failed", error);
            dispatchAlert(dispatch, {
              mode: "toast",
              type: "error",
              title: t("info.error"),
              message: t("shop_cart.error"),              
              submitText: t("form.ok"),
            });
          }
          break;

        default:
          console.warn("Bilinmeyen seçenek:", option);
      }
    },
    [dispatch, selectedFollower, shopId, t]
  );

  // Takip / Takibi bırak
  const handleFollow = async () => {
    try {
      await followShop(shopId, userId);
      setSubscribed(true);
      setFollowers((prev) => [currentUser, ...prev]);
      dispatchAlert(dispatch, {
        mode: "alert",
        type: "success",
        title: t("info.success"),
        message: t("shop_cart.followSuccess"),        
        submitText: t("form.ok"),
      });
    } catch (error) {
      console.error("Takip et hata:", error);
      dispatchAlert(dispatch, {
        mode: "toast",
        type: "error",
        title: t("info.error"),
        message: t("shop_cart.error"),
        submitText: t("form.ok"),
      });
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollowShop(shopId, userId);
      setFollowers((prev) => prev.filter((f) => f.id !== userId));
      setSubscribed(false);
      dispatchAlert(dispatch, {
        mode: "alert",
        type: "success",
        title: t("info.success"),
        message: t("shop_cart.unfollowSuccess"),        
        submitText: t("form.ok"),
      });
    } catch (error) {
      console.error("Takibi bırak hata:", error);
      dispatchAlert(dispatch, {
        mode: "toast",
        type: "error",
        title: t("info.error"),
        message: t("shop_cart.error"),        
        submitText: t("form.ok"),
      });
    }
  };

  const menuOptions = getSubscriberMenuOptions({ t, isOwner });


  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.subscriberContainer}>
        {renderAvatar(item.name, item.avatar)}
        <View style={styles.subscriberContent}>
          <View style={styles.headerRow}>
            <Text style={styles.userName}>{item.name}</Text>
            {isOwner && (
              <Text style={styles.followDate}>
                {item.followedAt ? convertToAfghanDate(item.followedAt, languageCode) : ""}
              </Text>
            )}
          </View>
        </View>

        <TouchableOpacity
          ref={(ref) => (iconRefs.current[item.id] = ref)}
          onPress={() => openMenu(item)}
          style={{ padding: 6 }}
          accessible
          accessibilityRole="button"
          accessibilityLabel={t("shop_subscriber.menu_button") || "Aç"}
        >
          <Entypo name="dots-three-vertical" size={16} color="gray" />
        </TouchableOpacity>
      </View>
    ),
    [isOwner, languageCode, openMenu, t]
  );

  if (initialLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={CustomTheme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>{t("shop_subscriber.followers") || "Takipçiler"}</Text>

        <FlatList
          data={followers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          refreshing={refreshing}
          onRefresh={onRefresh}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[CustomTheme.colors.primary]}
              tintColor={CustomTheme.colors.primary}
            />
          }
          onEndReached={() => {
            if (hasMore && !moreLoading) loadFollowers(currentPage + 1);
          }}
          onEndReachedThreshold={0.3}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          ListFooterComponent={
            <>
              {moreLoading && (
                <ActivityIndicator
                  style={{ marginVertical: 15 }}
                  size="small"
                  color={CustomTheme.colors.primary}
                />
              )}

              {!moreLoading && followers.length > 0 && (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: CustomTheme.colors.darkGray,
                    textAlign: "center",
                    paddingVertical: 12,
                  }}
                >
                  {t("shop_subscriber.last_followers") || "Son takipçiler"}
                </Text>
              )}
            </>
          }
          ListEmptyComponent={
            <View style={styles.empty}>
              <Feather name="users" size={64} color={CustomTheme.colors.secondary} />
              <Text style={styles.emptyText}>
                {t("shop_subscriber.no_followers") || "Henüz takipçi yok"}
              </Text>
            </View>
          }
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>

      {/* Follow/Unfollow Button */}
      <View style={styles.inputContainer}>
        <CustomButton
          buttonText={
            subscribed
              ? t("shop_options.following", "Takiptesin")
              : t("shop_options.follow", "Takip Et")
          }
          iconName={subscribed ? "user-check" : "user-plus"}
          type={subscribed ? "primary_outline" : "primary"}
          iconLibrary="Feather"
          onPress={subscribed ? handleUnfollow : handleFollow}
        />
      </View>

      {/* Menü Modal */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <TouchableWithoutFeedback>
            <View style={[styles.menuContainer, { top: menuPosition.y, left: menuPosition.x }]}>
              <View style={styles.menuHeader}>
                <Text style={styles.menuTitle}>
                  {selectedFollower?.name || "Kullanıcı"}
                </Text>
              </View>

              {menuOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.menuItem}
                  onPress={() => handleOptionPress(option.id)}
                >
                  {option.icon && option.icon(CustomTheme.colors.primary, 20)}
                  <Text style={styles.menuLabel}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default ShopSubscriberList;
