import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { FontAwesome, Feather, MaterialIcons } from '@expo/vector-icons';

const tabs = [
  { key: 'comments', icon: <FontAwesome name="commenting-o" size={18} />, labelKey: 'shop.comments' },
  { key: 'subscribers', icon: <Feather name="users" size={18} />, labelKey: 'shop.subscribers' },
  { key: 'ratings', icon: <MaterialIcons name="star-border" size={18} />, labelKey: 'shop.ratings' },
];

const ShopDashboardTabsyyyyyy = ({ selectedTab, onTabChange }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.tabRow}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.key}
          style={[styles.tabButton, selectedTab === tab.key && styles.activeTab]}
          onPress={() => onTabChange(tab.key)}
        >
          <View style={styles.tabContent}>
            {tab.icon}
            <Text style={[styles.tabText, selectedTab === tab.key && styles.activeTabText]}>
              {t(tab.labelKey)}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 6,
  },
  tabButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  activeTab: {
    backgroundColor: '#007bff',
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tabText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#333',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ShopDashboardTabs;
