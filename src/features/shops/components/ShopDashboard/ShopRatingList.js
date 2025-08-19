import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  RefreshControl,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  UIManager,
  findNodeHandle,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons, Entypo, Feather } from "@expo/vector-icons";
import { fetchShopRatings } from "../../services/get/fetchShopRatings";
import { dispatchAlert } from "../../../../shared/utils/alerts/alertUtils";
import { convertToAfghanDate } from "../../../../shared/utils/date/dateConverter";
import getLanguageCode from "../../../../shared/services/getLanguageCode";
import RatingModal from "../../modals/RatingModal";
import CustomTheme from "../../../../shared/styles/CustomThems";
import styles from "../../styles/ShopRatingStyles";
import { getSubscriberMenuOptions } from "../menu/getSubscriberMenuOptions";
import CustomButton from "../../../../shared/components/buttons/CustomButton";
import { blockUser } from "../../services/blockUser";
import { updateOrAddRating } from "../../services/updateOrAddRating";
import { getUserRating } from "../../services/get/getUserRating";

const DEFAULT_MENU_WIDTH = 240;
const DEFAULT_MENU_HEIGHT = 260;

const ShopRatingList = ({ shopId, limit = 10, isOwner }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user?.id);
  const userName = useSelector((state) => state.user?.name);
  const userAvatar = useSelector((state) => state.user?.avatar);

  const languageId = useSelector((state) => state.user?.languageId);
  const languageCode = getLanguageCode(languageId);

  // Data & paging
  const [ratings, setRatings] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // UI states
  const [initialLoading, setInitialLoading] = useState(true);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Menu
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedRating, setSelectedRating] = useState(null);
  const iconRefs = useRef({});

  // Rating modal
  const [modalVisible, setModalVisible] = useState(false);
  const [userRating, setUserRating] = useState(null);

  // Tek çağrı koruması (yenileme/ilk yükleme/daha fazla)
  const loadingRef = useRef(false);

  const menuOptions = getSubscriberMenuOptions({ t, isOwner });

  const mapIncoming = useCallback((arr) => {
    return (Array.isArray(arr) ? arr : []).map((it) => ({
      id: it.id,
      rating: it.rating ?? 0,
      created_at: it.created_at,
      comment: it.comment ?? "",
      user: {
        id: it.user?.id || "",
        name: it.user?.name || "—",
        avatar: it.user?.avatar || null,
      },
    }));
  }, []);

  const loadRatings = useCallback(
    async (pageToLoad = 0) => {
      if (loadingRef.current) return; // çift çağrıyı engelle
      loadingRef.current = true;

      const isFirstPage = pageToLoad === 0;

      try {
        if (isFirstPage && !refreshing) setInitialLoading(true);
        if (!isFirstPage) setIsMoreLoading(true);

        const data = await fetchShopRatings({ shopId, page: pageToLoad, limit });        
        const cleaned = mapIncoming(data);
        // hasMore güncelle
        setHasMore(cleaned.length === limit);

        if (isFirstPage) {
          setRatings(cleaned);
        } else {
          setRatings((prev) => [...prev, ...cleaned]);
        }       

        setPageIndex(pageToLoad);
      } catch (error) {
        console.error("Puanlar yüklenirken hata:", error);
        dispatchAlert(dispatch, {
          mode: "toast",
          type: "error",
          title: t("info.error"),
          message: t("shop_rating.load_failed") || "Puanlar yüklenemedi",
        });
      } finally {
        if (isFirstPage) {
          setInitialLoading(false);
          setRefreshing(false);
        } else {
          setIsMoreLoading(false);
        }
        loadingRef.current = false;
      }
    },
    [dispatch, limit, mapIncoming, refreshing, shopId, t]
  );

  // İlk/yeni shopId yüklemesi
  useEffect(() => {
    setHasMore(true);
    setPageIndex(0);
    setRatings([]);
    setInitialLoading(true);
    loadRatings(0);

    // ✅ Kullanıcının puanını kontrol et
    async function checkUserRating() {
      if (!shopId || !userId) return;
      const rating = await getUserRating(shopId, userId);
      setUserRating(rating?.rating || null); // null ise henüz puan yok
    }
    checkUserRating();
  }, [shopId, limit]);

  const onRefresh = useCallback(() => {
    if (loadingRef.current) return;
    setRefreshing(true);
    setHasMore(true);
    loadRatings(0);
  }, [loadRatings]);

  const onEndReached = useCallback(() => {
    if (!hasMore || isMoreLoading || loadingRef.current) return;
    loadRatings(pageIndex + 1);
  }, [hasMore, isMoreLoading, loadRatings, pageIndex]);

  // Menu open
  const openMenu = useCallback((item) => {
    const ref = iconRefs.current[item.id];
    if (!ref) return;
    const handle = findNodeHandle(ref);
    if (!handle) return;

    UIManager.measureInWindow(handle, (x, y, width, height) => {
      const screen = Dimensions.get("window");
      const spaceBelow = screen.height - (y + height);
      const spaceAbove = y;

      let top;
      if (spaceBelow >= DEFAULT_MENU_HEIGHT) top = y;
      else if (spaceAbove >= DEFAULT_MENU_HEIGHT) top = y - DEFAULT_MENU_HEIGHT;
      else top = Math.max(5, y - DEFAULT_MENU_HEIGHT / 2);

      let left = x - DEFAULT_MENU_WIDTH;
      if (left < 10) left = 10;
      if (left + DEFAULT_MENU_WIDTH > screen.width - 10) {
        left = screen.width - DEFAULT_MENU_WIDTH - 10;
      }

      setMenuPosition({ x: left, y: top });
      setSelectedRating(item);
      setMenuVisible(true);
    });
  }, []);

  const handleOptionPress = useCallback(
    async (option) => {
      setMenuVisible(false);
      if (!selectedRating) return;

      switch (option.id) {
        case "view_profile":
          console.log("Profili gör:", selectedRating.id);
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
            await blockUser({
              shopId,
              userId: selectedRating.user.id,
              reason: "spam",
            });

            setRatings((prev) =>
              prev.filter((f) => f.id !== selectedRating.id)
            );

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
    [dispatch, selectedRating, shopId, t]
  );

  // UI helpers
  const renderAvatar = useCallback((name, avatarUrl) => {
    if (avatarUrl) return <Image source={{ uri: avatarUrl }} style={styles.avatar} />;
    const initial = name?.charAt(0)?.toUpperCase() || "?";
    return (
      <View style={styles.avatarPlaceholder}>
        <Text style={styles.avatarInitial}>{initial}</Text>
      </View>
    );
  }, []);

  const renderStars = useCallback((rating) => {
    const fullStars = Math.floor(rating);
    return (
      <View style={styles.starRow}>
        {Array.from({ length: 5 }, (_, i) => (
          <MaterialIcons
            key={i}
            name={i < fullStars ? "star" : "star-border"}
            size={16}
            color={CustomTheme.colors.primary}
          />
        ))}
      </View>
    );
  }, []);

  const keyExtractor = useCallback((item) => `${item.id}`, []);

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.ratingItem}>
        {renderAvatar(item.user.name, item.user.avatar)}
        <View style={styles.ratingContent}>
          <View style={styles.headerRow}>
            <Text style={styles.userName}>
              {item.user.name.length > 20 ? item.user.name.slice(0, 18) + "..." : item.user.name}
            </Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {isOwner && (
                <Text style={[styles.followDate, { marginRight: 8 }]}>
                  {convertToAfghanDate(item.created_at, languageCode)}
                </Text>
              )}
              <TouchableOpacity
                ref={(node) => {
                  if (node) iconRefs.current[item.id] = node;
                }}
                onPress={() => openMenu(item)}
                style={{ padding: 6 }}
              >
                <Entypo name="dots-three-vertical" size={16} color="gray" />
              </TouchableOpacity>
            </View>
          </View>

          {renderStars(item.rating)}
          <Text style={styles.commentText}>{item.comment}</Text>
        </View>
      </View>
    ),
    [isOwner, languageCode, openMenu, renderAvatar, renderStars]
  );

  // İlk yükleme
  if (initialLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={CustomTheme.colors.primary} />
      </View>
    );
  }

  const handleSubmit = async (rating) => {
    try {
      const result = await updateOrAddRating(shopId, userId, rating);

      dispatchAlert(dispatch, {
        mode: "toast",
        type: "success",
        title: t("info.success"),
        message: t("shop_rating.rating_added", { rating }),
        submitText: t("form.ok"),
      });

      setUserRating(rating);
      const newRating = {
        id: result.id, // backend'den dönüyorsa
        rating,
        created_at: new Date().toISOString(),
        user: {
          id: userId,
          name: userName, // elindeki kullanıcı bilgisi
          avatar: userAvatar, // elindeki avatar
        },
      };

      setRatings((prev) => {
        const existingIndex = prev.findIndex((r) => r.user.id === userId);

        if (existingIndex === -1) {
          // ✅ Kullanıcı yoksa liste başına ekle
          return [newRating, ...prev];
        } else {
          // ✅ Kullanıcı varsa rating güncelle
          const updated = [...prev];
          updated[existingIndex] = {
            ...updated[existingIndex],
            rating,
            created_at: new Date().toISOString(),
          };
          return updated;
        }
      });

      setModalVisible(false);
    } catch (err) {
      dispatchAlert(dispatch, {
        mode: "toast",
        type: "error",
        title: t("info.error"),
        message: t("shop_cart.error"),
        submitText: t("form.ok"),
      });
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {t("shop_rating.ratings", "Değerlendirmeler")}
        </Text>

        <FlatList
          data={ratings}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.3}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[CustomTheme.colors.primary]} // Android
              tintColor={CustomTheme.colors.primary} // iOS
            />
          }
          ListFooterComponent={
            <>
              {isMoreLoading && (
                <ActivityIndicator
                  style={{ marginVertical: 15 }}
                  size="small"
                  color={CustomTheme.colors.primary}
                />
              )}
              {!isMoreLoading && ratings.length > 0 && (
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: CustomTheme.colors.darkGray,
                    textAlign: "center",
                    paddingVertical: 12,
                  }}
                >
                  {t("shop_rating.latest", "Son Değerlendirmeler")}
                </Text>
              )}
            </>
          }
          ListEmptyComponent={
            <View style={styles.empty}>
              <Feather name="star" size={64} color={CustomTheme.colors.secondary} />
              <Text style={styles.emptyText}>
                {t("shop_rating.no_ratings", "Henüz değerlendirme yok")}
              </Text>
            </View>
          }
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>

      <View style={styles.inputContainer}>
        <CustomButton
          buttonText={t("shop_rating.give_rating", "Puan Ver")}
          type="lightGray_outline"
          iconName="star"
          iconLibrary="FontAwesome"
          onPress={() => setModalVisible(true)}
        />
      </View>

      {/* Puan verme modal */}
      <RatingModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        initialRating={userRating ?? 1}
        t={t}
      />

      {/* 3 Nokta Menü */}
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
            <View
              style={[
                styles.menuContainer,
                { top: menuPosition.y, left: menuPosition.x },
              ]}
            >
              <View style={styles.menuHeader}>
                <Text style={styles.menuTitle}>
                  {selectedRating?.user?.name || "Kullanıcı"}
                </Text>
              </View>

              {menuOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.menuItem}
                  onPress={() => handleOptionPress(option)}
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

export default ShopRatingList;
