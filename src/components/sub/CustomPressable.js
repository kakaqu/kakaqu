import React from "react";
import { Pressable } from "react-native";

export default function CustomPressable({ children, onPress, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        style,
        { opacity: pressed ? 0.7 : 1 }, // Basılma efekti
      ]}
    >
      {children}
    </Pressable>
  );
}
