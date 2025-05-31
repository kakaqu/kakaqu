import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginPage, OTPPage } from '../screens/Index.js';



const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName='LoginPage' screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LoginPage" component={LoginPage} options={{title: 'Login'}} />
    <Stack.Screen name="OTPPage" component={OTPPage} options={{title: 'OTP Page'}} />
  </Stack.Navigator>
  )
}

export default AuthStack;

const styles = StyleSheet.create({})