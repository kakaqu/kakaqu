import React from "react";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";

export const getSubscriberMenuOptions = ({ t, isOwner }) => {
  
  // Herkes için görünen
  const options = [
    {
      id: "view_profile",
      label: t("comment.view_profile") || "Profili Gör",
      icon: (color, size) => (
        <Ionicons name="person-circle-outline" size={size} color={color} />
      ),
    },
  ];

  // Eğer dükkan sahibi ise ek seçenekler
  if (isOwner) {
    options.push(
      {
        id: "report",
        label: t("comment.report") || "Rapor Et",
        icon: (color, size) => (
          <MaterialIcons name="report-problem" size={size} color={color} />
        ),
      },
      {
        id: "block_user",
        label: t("comment.block_user") || "Engelle",
        icon: (color, size) => (
          <FontAwesome name="ban" size={size} color={color} />
        ),
      }
    );
  }

  return options;
};
