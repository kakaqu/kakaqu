import React, { useEffect } from 'react';
import { StyleSheet, ActivityIndicator, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';

import AddOnboardingScreen from '../../features/auth/screens/AddOnboardingScreen';
import BottomTabs from '../../features/navigation/BottomTabs';
import OnboardingScreen from '../../features/auth/screens/OnboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 🔹 buraya da ekle
import i18n from '../../shared/locales/i18n';
import getLanguageCode from '../../shared/services/getLanguageCode';
import goldTransactionsScreen from '../../features/gold/screens/goldTransactionsScreen';
import AddShopScreen from '../../features/shops/screens/AddShopScreen';



const Stack = createNativeStackNavigator();

export default function UserStack() {
  const user = useSelector((state) => state.user);

  const isLoading = user.id === null || user.isOnboarded === undefined;

  useEffect(() => {
    if (user.languageId) {
      const langCode = getLanguageCode(user.languageId);
      i18n.changeLanguage(langCode);
      AsyncStorage.setItem('app-language', langCode);
    }
  }, [user.languageId]);

  if (isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#01A89E" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user.isOnboarded && (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      )}
      <Stack.Screen name="Main" component={BottomTabs} />
      <Stack.Screen name="AddOnboarding" component={AddOnboardingScreen} />
      <Stack.Screen name="transactions" component={goldTransactionsScreen} />
      <Stack.Screen name="AddShop" component={AddShopScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


// import { StyleSheet } from 'react-native'
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AddOnboardingScreen from '../../features/auth/screens/AddOnboardingScreen';
// import BottomTabs from '../../features/navigation/BottomTabs';
// import OnboardingScreen from '../../features/auth/screens/OnboardingScreen';
// import QrReaderScreen from '../../features/user/components/QrReaderScreen';




// const Stack = createNativeStackNavigator();
// const UserStack = () => {
//   return (
//     <Stack.Navigator initialRouteName='Onboarding' screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="Main" component={BottomTabs} />
//     <Stack.Screen name="AddOnboarding" component={AddOnboardingScreen} options={{title: 'Welcome'}}/>
//     <Stack.Screen name='Onboarding' component={OnboardingScreen} options={{title: 'Onboarding Screen'}}/>
//     <Stack.Screen name='QrReaderScreen' component={QrReaderScreen} options={{title: 'QrReader Screen'}}/>
//     </Stack.Navigator>
//   )
// }

// export default UserStack

// const styles = StyleSheet.create({})