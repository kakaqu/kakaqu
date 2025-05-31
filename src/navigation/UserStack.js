import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { HomePage, ProfilePage, AddUserPage, OnboardingScreen, AddOnboardingScreen } from '../screens/Index'
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const Stack = createNativeStackNavigator();
const UserStack = () => {
  return (
    <Stack.Navigator initialRouteName='Onboarding' screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomePage} options={{title: 'Home'}} />
    <Stack.Screen name="Profile" component={ProfilePage} options={{title: 'Profile'}} />
    <Stack.Screen name="AddUser" component={AddUserPage} options={{title: 'Add User'}}/>
    <Stack.Screen name='Onboarding' component={OnboardingScreen} options={{title: 'Onboarding Screen'}}/>
    <Stack.Screen name="AddOnboarding" component={AddOnboardingScreen} options={{title: 'Welcome'}}/>
    </Stack.Navigator>
  )
}

export default UserStack

const styles = StyleSheet.create({})