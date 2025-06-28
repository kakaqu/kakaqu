import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions } from 'react-native';
import CustomTheme from '../../../shared/styles/CustomThems';

const { width } = Dimensions.get("window");

const OnboardingItem = ({ item }) => (
  <View style={styles.screen}>
    {/* Görsel: string URL mi yoksa require objesi mi kontrol et */}
    <Image
      source={
        typeof item.image_url === 'string'
          ? { uri: item.image_url }
          : item.image_url
      }
      style={styles.image}
      resizeMode="contain"
    />

    {/* Başlık ve açıklama */}
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.description}>{item.description}</Text>

    {/* Detaylar: Dizi mi yoksa metin mi kontrol et */}
    {Array.isArray(item.details) ? (
      <FlatList
        data={item.details}
        keyExtractor={(detail, idx) => `${detail}-${idx}`}
        renderItem={({ item: detail }) => (
          <Text style={styles.detailText}>• {detail}</Text>
        )}
      />
    ) : (
      item.details ? <Text style={styles.detailText}>{item.details}</Text> : null
    )}
  </View>
);

const styles = StyleSheet.create({
  screen: {
    width,
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 330,
    height: 330,
    marginBottom: 30,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: CustomTheme.colors.primary,
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    color: CustomTheme.colors.black,
    textAlign: "center",
    marginBottom: 20,
  },
  detailText: {
    fontSize: 14,
    color: CustomTheme.colors.black,
    textAlign: "right",
    marginVertical: 5,
  },
});

export default OnboardingItem;
