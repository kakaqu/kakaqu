import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Platform, Text } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

import HomeScreen from '../home/screens/HomeScreen';
import MarketScreen from '../shops/screens/MarketScreen';
import MessagesScreen from '../messages/screens/MessagesScreen';
import AddProductScreen from '../products/screens/AddProductScreen';
import ProfileScreen from '../user/screens/ProfileScreen';

import CustomTheme from '../../shared/styles/CustomThems';
import { useTranslation } from 'react-i18next';

const TABS = [
  { name: 'Home', icon: 'home', iconOutline: 'home-outline' },
  { name: 'Market', icon: 'storefront', iconOutline: 'storefront-outline' },
  { name: 'Add', icon: 'plus', isAdd: true },
  { name: 'Messages', icon: 'chatbox-ellipses', iconOutline: 'chatbox-ellipses-outline' },
  { name: 'Profile', icon: 'person', iconOutline: 'person-outline' },
];

const SCREEN_MAP = {
  Home: HomeScreen,
  Market: MarketScreen,
  Add: AddProductScreen,
  Messages: MessagesScreen,
  Profile: ProfileScreen,
};

export default function BottomTabs() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('Home');

  const CurrentScreen = SCREEN_MAP[activeTab];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <CurrentScreen />
      </View>
      <View style={styles.tabBar}>
        {TABS.map((tab, index) => {
          const isFocused = activeTab === tab.name;

          return (
            <Pressable
              key={index}
              onPress={() => setActiveTab(tab.name)}
              style={({ pressed }) => [
                styles.tabButton,
                pressed && { backgroundColor: CustomTheme.colors.pressedBackground },
              ]}
              android_ripple={
                Platform.OS === 'android' ? { color: CustomTheme.colors.ripple } : undefined
              }
            >
              {tab.isAdd ? (
                <View style={styles.addButton}>
                  <Feather name="plus" size={28} color="#fff" />
                </View>
              ) : (
                <>
                  <Ionicons
                    name={isFocused ? tab.icon : tab.iconOutline}
                    size={22}
                    color={isFocused ? CustomTheme.colors.primary : '#999'}
                  />
                  <Text
                    style={{
                      fontSize: 10,
                      color: isFocused ? CustomTheme.colors.primary : '#999',
                      marginTop: 2,
                    }}
                  >
                    {t(`bottomTabs.${tab.name.toLowerCase()}`)}
                  </Text>
                </>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  tabBar: {
    height: 55,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#ddd',
    elevation: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: CustomTheme.colors.secondary,
    width: 60,
    height: 60,
    borderRadius: 30,
    top: -15,
    justifyContent: 'center',
    alignItems: 'center',
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
      web: {
        shadowColor: 'rgba(0,0,0,0.3)',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
    }),
  },
});


// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { View, Text, StyleSheet, Pressable } from 'react-native';
// import { Ionicons, Feather } from '@expo/vector-icons';

// // Screens
// import HomeScreen from '../home/screens/HomeScreen';
// import MarketScreen from '../shops/screens/MarketScreen';
// import MessagesScreen from '../messages/screens/MessagesScreen';
// import AddProductScreen from '../products/screens/AddProductScreen';
// import { ProfileScreen } from '../user/screens/Index';
// import CustomTheme from '../../shared/styles/CustomThems';
// import { useTranslation } from 'react-i18next';



// const Tab = createBottomTabNavigator();

// export default function BottomTabs() {
//   const { t } = useTranslation();
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarShowLabel: true,
//         tabBarStyle: styles.tabBar,
//         tabBarActiveTintColor: CustomTheme.colors.primary,
//         tabBarInactiveTintColor: '#999',
//         tabBarButton: (props) => (
//           <Pressable
//             android_ripple={{ color: CustomTheme.colors.ripple }} // 👈 burada efekt rengi
//             style={({ pressed }) => [
//               {
//                 flex: 1,
//                 backgroundColor: pressed ? CustomTheme.colors.pressedBackground : 'transparent',
//               },
//             ]}
//             {...props}
//           />
//         ),
//         tabBarIcon: ({ focused, color }) => {
//           let iconName;

//           switch (route.name) {
//             case 'Home':
//               iconName = focused ? 'home' : 'home-outline';
//               return <Ionicons name={iconName} size={22} color={color} />;
//             case 'Market':
//               iconName = focused ? 'storefront' : 'storefront-outline';
//               return <Ionicons name={iconName} size={22} color={color} />;
//             case 'Messages':
//               iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';
//               return <Ionicons name={iconName} size={22} color={color} />;
//             case 'Profile':
//               iconName = focused ? 'person' : 'person-outline';
//               return <Ionicons name={iconName} size={22} color={color} />;
//           }
//         },
//       })}
//     >
      
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{ tabBarLabel: t("bottomTabs.home") }}
//       />
//       <Tab.Screen
//         name="Market"
//         component={MarketScreen}
//         options={{ tabBarLabel: t("bottomTabs.market") }}
//       />
//       <Tab.Screen
//         name="Add"
//         component={AddProductScreen}
//         options={{
//           tabBarLabel: '',
//           tabBarIcon: ({ focused }) => (
//             <View style={styles.addButton}>
//               <Feather name="plus" size={28} color="#fff" />
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Messages"
//         component={MessagesScreen}
//         options={{ tabBarLabel: t("bottomTabs.messages") }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{ tabBarLabel: t("bottomTabs.profile") }}
//       />      

//     </Tab.Navigator>
//   );
// }

// const styles = StyleSheet.create({
//   tabBar: {
//     height: 55,
//     backgroundColor: '#fff',
//     borderTopWidth: 0,
//     elevation: 10,
//     position: 'absolute',
//   },
//   addButton: {
//     backgroundColor: CustomTheme.colors.secondary,
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     top: -5,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: CustomTheme.colors.secondary,
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 10,
//   },
// });
