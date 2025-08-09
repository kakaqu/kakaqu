import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Modal,
} from "react-native";
import { useTranslation } from "react-i18next";
import CustomTheme from "../../../../shared/styles/CustomThems";
import { fetchShopFollowers } from "../../services/get/fetchShopFollowers";
import { convertToAfghanDate } from "../../../../shared/utils/date/dateConverter";
import getLanguageCode from "../../../../shared/services/getLanguageCode";
import { useSelector } from "react-redux";
import FollowButton from "../../../../shared/components/buttons/FollowButton";
// import { MoreVertical } from "lucide-react-native";

const ShopSubscriberList = ({ shopId, limit = 10, isSubscribed }) => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [menuVisibleFor, setMenuVisibleFor] = useState(null); // userId

  const { t } = useTranslation();
  const languageId = useSelector((state) => state.user?.languageId);
  const userId = useSelector((state) => state.user?.Id);
  const languageCode = getLanguageCode(languageId);
  const isShopOwner = useSelector((state) => state.shop?.user_id === userId);

  useEffect(() => {
    setFollowers([]);
    setCurrentPage(0);
    setHasMore(true);
    loadFollowers(0);
  }, [shopId]);

  const handleFollow = async () => {
    // takip et
  };

  const handleUnfollow = async () => {
    // takipten çık
  };

  const loadFollowers = async (pageToLoad) => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const newFollowers = await fetchShopFollowers({
        shopId,
        page: pageToLoad,
        limit,
      });
      setFollowers((prev) =>
        pageToLoad === 0 ? newFollowers : [...prev, ...newFollowers]
      );

      setCurrentPage(pageToLoad);
      setHasMore(newFollowers.length === limit);
    } catch (error) {
      console.error("Takipçiler yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      loadFollowers(currentPage + 1);
    }
  }, [loading, hasMore, currentPage]);

  const toggleMenu = (id) => {
    setMenuVisibleFor(menuVisibleFor === id ? null : id);
  };

  const handleMenuAction = (action, follower) => {
    setMenuVisibleFor(null);
    switch (action) {
      case "view":
        console.log("Profili görüntüle", follower.name);
        break;
      case "block":
        console.log("Engelle", follower.name);
        break;
      case "report":
        console.log("Rapor et", follower.name);
        break;
    }
  };

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

  const renderMenu = (follower) => {
    const isVisible = menuVisibleFor === follower.id;
    if (!isVisible) return null;

    const options = [
      { label: t("common.view_profile"), value: "view" },
      ...(isShopOwner
        ? [
            { label: t("common.block_user"), value: "block" },
            { label: t("common.report_user"), value: "report" },
          ]
        : []),
    ];

    return (
      <View style={styles.menu}>
        {options.map((opt) => (
          <Pressable
            key={opt.value}
            style={styles.menuItem}
            onPress={() => handleMenuAction(opt.value, follower)}
          >
            <Text style={styles.menuText}>{opt.label}</Text>
          </Pressable>
        ))}
      </View>
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.subscriberContainer}>
      {renderAvatar(item.name, item.avatar)}

      <View style={styles.subscriberContent}>
        <View style={styles.headerRow}>
          <Text style={styles.userName}>{item.name}</Text>
          {isShopOwner && (
            <Text style={styles.followDate}>
              {convertToAfghanDate(item.followedAt, languageCode)}
            </Text>
          )}
        </View>
      </View>

      <View style={{ position: "relative" }}>
        <TouchableOpacity onPress={() => toggleMenu(item.id)}>
          {/* <MoreVertical color="#888" size={20} /> */}
        </TouchableOpacity>
        {renderMenu(item)}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={followers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size="small" style={styles.loadingIndicator} />
          ) : null
        }
        ListEmptyComponent={
          !loading && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {t("shop.no_followers") || "Henüz takipçi yok."}
              </Text>
            </View>
          )
        }
        contentContainerStyle={
          followers.length === 0 ? styles.emptyContent : styles.listContent
        }
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        initialNumToRender={limit}
      />

      <View style={styles.buttonWrapper}>
        <FollowButton
          isFollowing={isSubscribed}
          onPress={isSubscribed ? handleUnfollow : handleFollow}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%" },
  listContent: { paddingBottom: 20 },
  emptyContent: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  subscriberContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: CustomTheme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitial: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  subscriberContent: {
    flex: 1,
    marginLeft: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userName: {
    fontWeight: "600",
    fontSize: 15,
    color: "#333",
  },
  followDate: {
    fontSize: 12,
    color: "#888",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  buttonWrapper: {
    padding: 12,
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  menu: {
    position: "absolute",
    top: 24,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 6,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 999,
  },
  menuItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#eee",
  },
  menuText: {
    fontSize: 14,
    color: "#333",
  },
});

export default ShopSubscriberList;
