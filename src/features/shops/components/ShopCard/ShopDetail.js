import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CancelButton from '../../../../shared/components/buttons/CancelButton';
import styles from '../../styles/ShopCard/shopDetailStyles';
import CustomThems from '../../../../shared/styles/CustomThems';


const ShopDetail = ({ shop, t }) => {
  const openInMap = () => {
    const { latitude, longitude } = shop.address || {};
    if (latitude && longitude) {
      const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.expandedContent}>
      {shop.description && (
        <>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              {shop.description.length > 200
                ? `${shop.description.slice(0, 200)}...`
                : shop.description}
            </Text>
          </View>
          <View style={styles.separator} />
        </>
      )}

      {(shop.address?.latitude && shop.address?.longitude) && (
        <>
          <View style={styles.phoneRow}>
            <Ionicons name="map-outline" size={20} color={CustomThems.colors.primary} />
            <Text style={styles.phone} onPress={openInMap}>
              {t('shop_cart.viewOnMap')}
            </Text>
          </View>
          <View style={styles.separator} />
        </>
      )}

      {shop.mobile && (
        <>
          <View style={styles.phoneRow}>
            <Ionicons name="call" size={20} color={CustomThems.colors.primary} />
            <Text style={styles.phone}>{shop.mobile}</Text>
          </View>
          <View style={styles.separator} />
        </>
      )}

      <Text style={styles.locationDetail}>
        <Ionicons name="location-sharp" size={16} color={CustomThems.colors.primary} />
        {' '}
        {shop.address?.provinceName}, {shop.address?.districtName}, {shop.address?.line}
      </Text>

      <View style={styles.separator} />
    </View>
  );
};

export default ShopDetail;
