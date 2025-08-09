import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginPage, OTPPage }  from '../../features/auth/screens/Index';
import { AddUserPage } from '../../features/user/screens/Index';
const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName='LoginPage' screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LoginPage" component={LoginPage} options={{title: 'Login'}} />
    <Stack.Screen name="OTPPage" component={OTPPage} options={{title: 'OTP Page'}} />
    <Stack.Screen name="AddUser" component={AddUserPage} options={{title: 'Add User'}}/>
  </Stack.Navigator>
  )
}

export default AuthStack;

const styles = StyleSheet.create({})