import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import ShopCommentList from '../components/ShopDashboard/ShopCommentList';
import ShopSubscriberList from '../components/ShopDashboard/ShopSubscriberList';
import CustomTheme from '../../../shared/styles/CustomThems';


const ShopStatsModal = ({ visible, onClose, shopId, t, isOwner, isSubscribed, shopName }) => {
  const [activeTab, setActiveTab] = useState('Comment');

  useEffect(() => {
    if (visible) {
      setActiveTab('Comment');
    }
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={CustomTheme.colors.darkGray} />
            </TouchableOpacity>
          </View>

          <View style={styles.tabHeader}>
            {['Comment', 'Followers', 'Rating'].map((tab) => {
              const isActive = activeTab === tab;
              const iconName = {
                Comment: 'message-square',
                Followers: 'users',
                Rating: 'star'
              }[tab];

              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={[styles.tabButton, isActive && styles.tabButtonActive]}
                >
                  <Feather
                    name={iconName}
                    size={16}
                    color={isActive ? CustomTheme.colors.white : CustomTheme.colors.darkGray}
                    style={{ marginRight: 5 }}
                  />
                  <Text style={{
                    color: isActive ? CustomTheme.colors.white : CustomTheme.colors.darkGray,
                    fontWeight: isActive ? 'bold' : 'normal',
                    fontSize: 14
                  }}>
                    {t(`shop_cart.${tab}`)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={{ flex: 1 }}>
            {activeTab === 'Comment' && <ShopCommentList shopId={shopId} isOwner={isOwner} shopName={shopName} />}
            {activeTab === 'Followers' && <ShopSubscriberList shopId={shopId} isSubscribed={isSubscribed} isOwner={isOwner} />}
            {activeTab === 'Rating' && null}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {
    backgroundColor: CustomTheme.colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    height: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 5,
  },
  tabHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: CustomTheme.colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 8
  }
});

export default ShopStatsModal;
