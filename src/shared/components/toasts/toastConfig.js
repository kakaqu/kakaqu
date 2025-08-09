import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const toastConfig = {
  success: ({ text1 = "", text2 = "" }) => (
    <View style={[styles.container, { borderLeftColor: "#4CAF50" }]}>
      {/* FontAwesome mutlaka Text içinde sarıldı */}
      <Text>
        <FontAwesome name="check-circle" size={24} color="#4CAF50" />
      </Text>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{String(text1)}</Text>
        {text2 ? <Text style={styles.message}>{String(text2)}</Text> : null}
      </View>
    </View>
  ),
  error: ({ text1 = "", text2 = "" }) => (
    <View style={[styles.container, { borderLeftColor: "#F44336" }]}>
      <Text>
        <FontAwesome name="times-circle" size={24} color="#F44336" />
      </Text>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{String(text1)}</Text>
        {text2 ? <Text style={styles.message}>{String(text2)}</Text> : null}
      </View>
    </View>
  ),
  info: ({ text1 = "", text2 = "" }) => (
    <View style={[styles.container, { borderLeftColor: "#2196F3" }]}>
      <Text>
        <FontAwesome name="info-circle" size={24} color="#2196F3" />
      </Text>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{String(text1)}</Text>
        {text2 ? <Text style={styles.message}>{String(text2)}</Text> : null}
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
container: {
  position: 'absolute',
  bottom: 30,    // ekranın altından biraz boşluk bırak
  left: 20,
  right: 20,
  zIndex: 9999,
  elevation: 9999,
  flexDirection: "row",
  padding: 12,
  backgroundColor: "#fff",
  borderRadius: 8,
  borderLeftWidth: 5,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.15,
  shadowRadius: 4,
},

  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 2,
    color: "#333",
  },
  message: {
    fontSize: 13,
    color: "#555",
  },
});

export default toastConfig;
