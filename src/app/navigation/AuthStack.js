import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginPage, OTPPage, OnboardingScreen }  from '../../features/auth/screens/Index';
import { AddUserPage } from '../../features/user/screens/Index';
import {AddOnboardingScreen} from '../../features/auth/screens/Index';
import QrCodeScreen from '../../features/user/screens/QrCodeScreen';



const Stack = createNativeStackNavigator();



const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName='LoginPage' screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LoginPage" component={LoginPage} options={{title: 'Login'}} />
    <Stack.Screen name="OTPPage" component={OTPPage} options={{title: 'OTP Page'}} />
    <Stack.Screen name="AddUser" component={AddUserPage} options={{title: 'Add User'}}/>
    <Stack.Screen name="QrCodeScreen" component={QrCodeScreen} options={{title: 'Add User'}}/>
  </Stack.Navigator>
  )
}

export default AuthStack;

const styles = StyleSheet.create({})