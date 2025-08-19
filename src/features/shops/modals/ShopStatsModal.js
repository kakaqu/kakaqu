import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import ShopCommentList from "../components/ShopDashboard/ShopCommentList";
import ShopSubscriberList from "../components/ShopDashboard/ShopSubscriberList";
import CustomTheme from "../../../shared/styles/CustomThems";
import ShopRatingList from "../components/ShopDashboard/ShopRatingList";

const ShopStatsModal = ({
  visible,
  onClose,
  shopId,
  t,
  isOwner,
  isSubscribed,
  shopName,
}) => {
  const [activeTab, setActiveTab] = useState("Comment");

  useEffect(() => {
    if (visible) {
      setActiveTab("Comment");
    }
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons
                name="close"
                size={24}
                color={CustomTheme.colors.darkGray}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.tabHeader}>
            {["Comment", "Followers", "Rating"].map((tab) => {
              const isActive = activeTab === tab;
              const iconName = {
                Comment: "message-square",
                Followers: "users",
                Rating: "star",
              }[tab];

              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={styles.tabButton}
                >
                  <Feather
                    name={iconName}
                    size={18}
                    color={isActive ? CustomTheme.colors.primary : "#999"}
                    style={{ marginRight: 6 }}
                  />
                  <Text
                    style={{
                      color: isActive ? CustomTheme.colors.primary : "#999",
                      fontWeight: isActive ? "700" : "500",
                      fontSize: 14,
                    }}
                  >
                    {t(`shop_cart.${tab}`)}
                  </Text>
                  {isActive && <View style={styles.activeIndicator} />}
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={{ flex: 1 }}>
            {activeTab === "Comment" && (
              <ShopCommentList
                shopId={shopId}
                isOwner={isOwner}
                shopName={shopName}
              />
            )}
            {activeTab === "Followers" && (
              <ShopSubscriberList shopId={shopId} isOwner={isOwner} />
            )}
            {activeTab === "Rating" && (
              <ShopRatingList shopId={shopId} isOwner={isOwner} />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  container: {
    backgroundColor: CustomTheme.colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    height: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingBottom: 5,
  },
  tabHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    position: "relative",
  },
  activeIndicator: {
    position: "absolute",
    bottom: -2,
    left: 0,
    right: 0,
    height: 3,
    borderRadius: 2,
    backgroundColor: CustomTheme.colors.primary,
  },
});

export default ShopStatsModal;
