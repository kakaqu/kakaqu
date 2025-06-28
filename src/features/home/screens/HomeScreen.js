import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Platform,
} from 'react-native';
import TopBar from '../../navigation/TopBar';
import styles from '../styles/HomeScreenStyles';


export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Üst Navigasyon Bar */}
      <TopBar navigation={navigation} context="products" hasUnreadNotifications={true} // Dinamik olarak kontrol edilebilir
      />
      <TopBar navigation={navigation} context="products" hasUnreadNotifications={true} />


      {/* Scroll edilebilir ürün içeriği */}
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.body}>
          <Text style={styles.heading}>Ana Sayfa</Text>
          {/* Buraya ürün listesi, slider, kategoriler vs. gelecek */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
