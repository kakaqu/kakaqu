import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import CustomTheme from "../../../shared/styles/CustomThems";

const EmptyState = ({ icon, text }) => (
  <View style={{ alignItems: "center", padding: 20 }}>
    <Feather name={icon} size={64} color= {CustomTheme.colors.secondary} />
    <Text style={{ marginTop: 10, color: CustomTheme.colors.darkGray, fontSize: 16 }}>{text}</Text>
  </View>
);

export default EmptyState;
