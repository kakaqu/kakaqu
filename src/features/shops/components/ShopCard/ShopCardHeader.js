import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import styles from '../../styles/ShopCard/shopCardHeaderStyles';
import CustomThems from '../../../../shared/styles/CustomThems';
import ShopCardStats from './ShopCardStats';

const ShopCardHeader = ({
  shop,
  t,
  isExpanded,
  onMenuPress,
  iconRef,
}) => {
  return (
    <View style={styles.topRow}>
      {/* Logo + Çizgi */}
      <View style={styles.avatarContainer}>
        <Image source={{ uri: shop.logo }} style={styles.avatar} />
        <View
          style={[
            styles.verticalLine,
            {
              backgroundColor: shop.isSubscribed
                ? CustomThems.colors.primary
                : CustomThems.colors.secondary,
            },
          ]}
        />
      </View>

      {/* Bilgiler + Menü */}
      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <View style={styles.texts}>
            <Text style={styles.name}>{shop.name}</Text>
            <Text style={styles.category}>{shop.category}</Text>
            {!isExpanded && (
              <Text style={styles.location}>
                <Ionicons
                  name="location-sharp"
                  size={14}
                  color={CustomThems.colors.primary}
                />{' '}
                {shop.address?.provinceName}, {shop.address?.districtName}
              </Text>
            )}
          </View>

          <TouchableOpacity
            ref={iconRef}
            onPress={onMenuPress}
            style={styles.menuIcon}
            activeOpacity={0.7}
          >
            <Entypo
              name="dots-three-vertical"
              size={16}
              color={CustomThems.colors.darkGray}
            />
          </TouchableOpacity>
        </View>
        {/* Stats burada entegre ediliyor */}
        <ShopCardStats shop={shop} t={t} />
      </View>
    </View>
  );
};

export default ShopCardHeader;
