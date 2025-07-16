// 📁 components/AddShop/AvatarPicker.js
import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/addShopStyles'; // avatar stilini buradan kullanıyoruz

const AvatarPicker = ({ uri, onSelect, hint }) => {
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    try {
      setLoading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        onSelect(result.assets[0].uri);
      }
    } catch (error) {
      console.warn('Avatar seçimi başarısız:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <TouchableOpacity onPress={pickImage}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Image
            source={uri ? { uri } : require('../../../assets/photo/shop_placeholder.png')}
            style={styles.avatar}
          />
        )}
      </TouchableOpacity>
      {/* {hint && <Text style={styles.avatarHint}>{hint}</Text>} */}
    </View>
  );
};

export default AvatarPicker;
