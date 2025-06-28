import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddOnboardingScreen from '../../features/auth/screens/AddOnboardingScreen';
import BottomTabs from '../../features/navigation/BottomTabs';
import OnboardingScreen from '../../features/auth/screens/OnboardingScreen';



const Stack = createNativeStackNavigator();
const UserStack = () => {
  return (
    <Stack.Navigator initialRouteName='Onboarding' screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Main" component={BottomTabs} />
    <Stack.Screen name="AddOnboarding" component={AddOnboardingScreen} options={{title: 'Welcome'}}/>
    <Stack.Screen name='Onboarding' component={OnboardingScreen} options={{title: 'Onboarding Screen'}}/>
    </Stack.Navigator>
  )
}

export default UserStack

const styles = StyleSheet.create({})