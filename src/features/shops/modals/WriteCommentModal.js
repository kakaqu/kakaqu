import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomTheme from "../../../shared/styles/CustomThems";
import { LetterAvatar } from "../../../shared/utils/upload/LetterAvatar";


const WriteCommentModal = ({
  visible,
  onClose,
  onSend,
  avatar,
  username,
  title = "Yorum Yaz",
  description = "",
  placeholder = "Yorumunuzu yazın...",
  initialValue = "",
  showAvatar = true,
  minLength = 5,
  maxLength = 250,
}) => {
  const [commentText, setCommentText] = useState(initialValue);
  const inputRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setCommentText(initialValue); // Her açıldığında resetle
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [visible]);

  const handleClose = () => {
    Keyboard.dismiss();
    onClose();
  };
  const handleSend = () => {
    const trimmed = commentText.trim();
    if (trimmed.length >= minLength) {
      onSend(trimmed); // Üst bileşene gönder
      setCommentText(""); // Input'u sıfırla
      Keyboard.dismiss(); // Klavyeyi kapat
      onClose(); // Modal'ı kapat (opsiyonel)
    } else {
      Alert.alert("Uyarı", `Lütfen en az ${minLength} karakter yazınız.`);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
          >
            <View style={styles.modal}>
              {/* Başlık */}
              <View style={styles.topBar}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity onPress={handleClose}>
                  <Ionicons name="close" size={24} color="#777" />
                </TouchableOpacity>
              </View>
              {description ? (
                <Text style={styles.description}>{description}</Text> // 👈 açıklama alanı
              ) : null}

              {/* Yorum input alanı */}
              <View style={styles.inputRow}>
              {showAvatar && (
                avatar ? (
                  <Image
                    source={{ uri: avatar }}
                    style={styles.avatar}
                  />
                ) : (
                  <LetterAvatar name={username} size={36} style={styles.avatar} />
                )
              )}
                <TextInput
                  ref={inputRef}
                  style={styles.input}
                  placeholder={placeholder}
                  placeholderTextColor="#999"
                  multiline
                  value={commentText}
                  onChangeText={(text) =>
                    setCommentText(text.slice(0, maxLength))
                  }
                  returnKeyType="send"
                  onSubmitEditing={handleSend}
                  blurOnSubmit={false}
                  maxLength={maxLength}
                />
                <TouchableOpacity
                  onPress={handleSend}
                  style={styles.sendButton}
                >
                  <Ionicons
                    name="send"
                    size={22}
                    color={CustomTheme.colors.primary}
                  />
                </TouchableOpacity>
              </View>

              {/* Karakter sayacı ayrı alanda ve hizalı */}
              <Text
                style={[styles.charCount, { marginRight: showAvatar ? 44 : 0 }]}
              >
                {commentText.length}/{maxLength}
              </Text>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  container: {
    width: "100%",
  },
  modal: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: CustomTheme.colors.primary,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  avatar: {
    width: 36,
    height: 36,
    marginRight: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: CustomTheme.colors.primary,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: CustomTheme.colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: CustomTheme.colors.primary,
    maxHeight: 100,
    textAlignVertical: "top",
    color: CustomTheme.colors.primary,
  },
  sendButton: {
    marginLeft: 8,
    paddingBottom: 6,
  },
  charCount: {
    fontSize: 12,
    color: "#888",
    textAlign: "right",
    marginTop: 4, // avatar varsa input hizalansın
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default WriteCommentModal;
