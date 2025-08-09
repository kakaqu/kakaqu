import React from "react";
import { View, Text } from "react-native";
import CustomTheme from "../../styles/CustomThems";

export const getColorFromString = (str) => {

const colors = [
  "#8E44AD", // mor
  "#16A085", // teal
  "#27AE60", // yeşil
  "#2980B9", // mavi
  "#D35400", // turuncu
  "#C0392B", // kırmızı
  "#5D6D7E", // gri-mavi
  "#B03A2E", // kahverengi-kırmızı
  "#196F3D", // koyu yeşil
  "#1B4F72", // lacivert

  "#7D3C98", // koyu mor
  "#138D75", // koyu teal
  "#229954", // canlı yeşil
  "#2471A3", // orta mavi
  "#CA6F1E", // tarçın
  "#A93226", // koyu kırmızı
  "#566573", // füme
  "#943126", // tuğla kırmızısı
  "#145A32", // zümrüt yeşili
  "#154360", // gece mavisi

  "#6C3483", // mora çalan
  "#117864", // deniz yeşili
  "#1E8449", // zeytin yeşili
  "#1F618D", // soğuk mavi
  "#BA4A00", // kahverengimsi turuncu
  "#922B21", // kırmızıya yakın bordo
  "#4D5656", // koyu gri
  "#7B241C", // koyu kızıl
  "#0B5345", // petrol yeşili
  "#1A5276", // gökyüzü mavisi
];


    
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export const LetterAvatar = ({ name, size = 40 }) => {
  const letter = name?.charAt(0)?.toUpperCase() || "?";
  const backgroundColor = getColorFromString(name || "X");

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 8,
        borderWidth: 1,
        borderColor: backgroundColor,
      }}
    >
      <Text style={{ color: CustomTheme.colors.white, fontWeight: "bold", fontSize: size / 2 }}>
        {letter}
      </Text>
    </View>
  );
};
