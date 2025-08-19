import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import CustomTheme from "../../../shared/styles/CustomThems";

const ListFooter = ({ loading, hasData, label }) => (
  <View style={{ paddingVertical: 12 }}>
    {loading ? (
      <ActivityIndicator size="small" color={CustomTheme.colors.primary} />
    ) : hasData ? (
      <Text style={{ textAlign: "center", color: CustomTheme.colors.darkGray, fontWeight: "bold" }}>
        {label}
      </Text>
    ) : null}
  </View>
);

export default ListFooter;
