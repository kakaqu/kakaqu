import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../styles/ShopCard/shopCardStatsStyles';

const ShopCardStats = ({ shop, t }) => {
  return (
    <View style={styles.stats}>
      <View style={styles.statBox}>
        <Text style={styles.statValue}>{shop.commentCount}</Text>
        <Text style={styles.statLabel}>{t('shop_cart.Comment')}</Text>
      </View>

      <View style={styles.statBox}>
        <Text style={styles.statValue}>{shop.subscriberCount}</Text>
        <Text style={styles.statLabel}>{t('shop_cart.Followers')}</Text>
      </View>

      <View style={styles.statBox}>
        <Text style={styles.statValue}>{shop.rating}</Text>
        <Text style={styles.statLabel}>{t('shop_cart.Rating')}</Text>
      </View>
    </View>
  );
};

export default ShopCardStats;
