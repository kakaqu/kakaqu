import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  PanResponder,
  Dimensions,
  Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CustomTheme from "../../../shared/styles/CustomThems";
import CustomButton from "../../../shared/components/buttons/CustomButton";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export const RatingModal = ({ visible, onClose, onSubmit, initialRating, t }) => {
  
  const [rating, setRating] = useState(initialRating);
  const barWidth = useRef(0);
  const circleX = useRef(0);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Modal açıldığında rating'i güncelle
  useEffect(() => {
    if (visible) {
      setRating(initialRating);
      circleX.current = ((initialRating / 5) * barWidth.current) || 0;
    }
  }, [visible, initialRating]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        const x = Math.max(0, Math.min(gesture.dx + circleX.current, barWidth.current));
        const newRating = Math.round((x / barWidth.current) * 4) + 1;
        setRating(newRating);
      },
      onPanResponderRelease: (_, gesture) => {
        circleX.current = Math.max(0, Math.min(gesture.dx + circleX.current, barWidth.current));
      },
    })
  ).current;

  const progressWidth = (rating / 5) * 100;

  const handleStarPress = (value) => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    setRating(value);
    circleX.current = (value / 5) * barWidth.current; // progress bar ile uyumlu
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>{t("shop_rating.give_rating", "Puan Ver")}</Text>

          {/* Progress Bar */}
          <View
            style={styles.progressContainer}
            onLayout={(e) => {
              barWidth.current = e.nativeEvent.layout.width;
              circleX.current = (rating / 5) * barWidth.current;
            }}
          >
            <View style={[styles.progressFill, { width: `${progressWidth}%` }]} />
            <View
              style={[
                styles.circle,
                { left: `${progressWidth}%`, transform: [{ translateX: -16 }] },
              ]}
              {...panResponder.panHandlers}
            />
          </View>

          {/* Yıldızlar */}
          <View style={styles.starRow}>
            {Array.from({ length: 5 }).map((_, i) => (
              <TouchableOpacity key={i} onPress={() => handleStarPress(i + 1)}>
                <Animated.View style={{ transform: [{ scale: i < rating ? scaleAnim : 1 }] }}>
                  <MaterialIcons
                    name={i < rating ? "star" : "star-border"}
                    size={36}
                    color={CustomTheme.colors.primary}
                  />
                </Animated.View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Butonlar */}
          <View style={styles.actions}>
            <CustomButton
              buttonText={t("shop_reason_modal.cancelButton")}
              type="lightGray"
              onPress={onClose}
              style={{ flex: 1, marginRight: 8 }}
            />
            <CustomButton
              buttonText={t("shop_reason_modal.confirmButton")}
              type="primary"
              onPress={() => {
                onSubmit(rating);
                onClose();
              }}
              style={{ flex: 1, marginLeft: 8 }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default RatingModal;


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalBox: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 16,
    paddingVertical: 28,
    paddingHorizontal: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: CustomTheme.colors.primary,
  },
  progressContainer: {
    width: "100%",
    height: 14,
    backgroundColor: "#f0f0f0",
    borderRadius: 7,
    marginBottom: 24,
    position: "relative",
    overflow: "visible",
  },
  progressFill: {
    height: "100%",
    backgroundColor: CustomTheme.colors.primary,
    borderRadius: 7,
  },
  circle: {
    position: "absolute",
    top: -9,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: CustomTheme.colors.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 99,
  },
  starRow: {
    flexDirection: "row",
    marginBottom: 24,
    justifyContent: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
});

