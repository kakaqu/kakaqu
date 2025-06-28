import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

// Screens
import HomeScreen from '../home/screens/HomeScreen';
import MarketScreen from '../shops/screens/MarketScreen';
import MessagesScreen from '../messages/screens/MessagesScreen';
import AddProductScreen from '../products/screens/AddProductScreen';
import { ProfileScreen } from '../user/screens/Index';
import CustomTheme from '../../shared/styles/CustomThems';


const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: CustomTheme.colors.primary,
        tabBarInactiveTintColor: '#999',
        tabBarButton: (props) => (
          <Pressable
            android_ripple={{ color: CustomTheme.colors.ripple }} // 👈 burada efekt rengi
            style={({ pressed }) => [
              {
                flex: 1,
                backgroundColor: pressed ? CustomTheme.colors.pressedBackground : 'transparent',
              },
            ]}
            {...props}
          />
        ),
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              return <Ionicons name={iconName} size={22} color={color} />;
            case 'Market':
              iconName = focused ? 'storefront' : 'storefront-outline';
              return <Ionicons name={iconName} size={22} color={color} />;
            case 'Messages':
              iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';
              return <Ionicons name={iconName} size={22} color={color} />;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              return <Ionicons name={iconName} size={22} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Market" component={MarketScreen} />

      <Tab.Screen
        name="Add"
        component={AddProductScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View style={styles.addButton}>
              <Feather name="plus" size={28} color="#fff" />
            </View>
          ),
        }}
      />

      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 55,
    backgroundColor: '#fff',
    borderTopWidth: 0,
    elevation: 10,
    position: 'absolute',
  },
  addButton: {
    backgroundColor: CustomTheme.colors.secondary,
    width: 60,
    height: 60,
    borderRadius: 30,
    top: -5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: CustomTheme.colors.secondary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
});
