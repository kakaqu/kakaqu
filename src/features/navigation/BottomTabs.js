import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { View, Platform, StyleSheet, Keyboard } from 'react-native';

import HomeScreen from '../home/screens/HomeScreen';
import MarketScreen from '../shops/screens/MarketScreen';
import AddProductScreen from '../products/screens/AddProductScreen';
import MessagesScreen from '../messages/screens/MessagesScreen';
import ProfileScreen from '../user/screens/ProfileScreen';

import CustomTheme from '../../shared/styles/CustomThems';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { t } = useTranslation();
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  // Klavye açılıp kapandığında kontrol et
  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true, // ✅ Klavye açıldığında tabBar tamamıyla gizlenir
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 60,
          backgroundColor: CustomTheme.colors.background || '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
          elevation: Platform.OS === 'android' ? 5 : 0,
          zIndex: 100,
        },
        tabBarActiveTintColor: CustomTheme.colors.primary,
        tabBarInactiveTintColor: '#999',
        tabBarLabelStyle: {
          fontSize: 10,
          marginBottom: 4,
        },
        tabBarShowLabel: route.name !== 'Add',
        tabBarLabel: route.name !== 'Add' ? t(`bottomTabs.${route.name.toLowerCase()}`) : '',
        tabBarIcon: ({ focused, color }) => {
          if (route.name === 'Add') {
            // 👇 Klavye açıksa ortadaki Add butonunu gizle
            if (keyboardVisible) return null;

            return (
              <View style={styles.addButton}>
                <Feather name="plus" size={28} color="#fff" />
              </View>
            );
          }

          const iconMap = {
            Home: focused ? 'home' : 'home-outline',
            Market: focused ? 'storefront' : 'storefront-outline',
            Messages: focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline',
            Profile: focused ? 'person' : 'person-outline',
          };

          return <Ionicons name={iconMap[route.name]} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Market" component={MarketScreen} />
      <Tab.Screen name="Add" component={AddProductScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: CustomTheme.colors.secondary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Platform.OS === 'android' ? 30 : 40,
    ...Platform.select({
      ios: {
        shadowColor: CustomTheme.colors.secondary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 10,
      },
    }),
  },
});