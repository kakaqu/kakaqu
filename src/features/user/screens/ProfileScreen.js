import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import UserCard from '../components/UserCard';
import WalletCard from '../components/WalletCard';
import ProfileMenu from '../components/ProfileMenu';
import TopBar from '../../navigation/TopBar';
import CustomTheme from '../../../shared/styles/CustomThems';
import { loadUserData } from '../actions/loadUserData';
import { useDispatch, useSelector } from 'react-redux';

export default function ProfileScreen({ navigation }) {


  
  const dispatch = useDispatch();

    const userID = useSelector((state) => state.user.id);
    const name = useSelector((state) => state.user.name);
    const phone = useSelector((state) => state.user.phoneNumber);
    const location = useSelector((state) => state.user.address);
    const avatar = useSelector((state) => state.user.avatar);
    const gold = useSelector((state) => state.userBalance.gold);

    const user = {
      name: name,
      phone: phone,
      location: location,
      avatar: avatar,
    }

  useEffect(() => {
      if (userID) {
        dispatch(loadUserData(userID));
      }
    //const userId = '561494ac-43a4-49da-9ec9-ee4716befaee';
    // const userId = 'f878a537-a002-4f18-8f2e-c3a521396b3e';
    // const userId = 'e79b56d2-8b92-4d92-8618-31dd2dd87934';
    // const userId = '10938951-a17e-461f-adcc-b1ee72500dce';
    // dispatch(loadUserData(userId));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TopBar navigation={navigation} context="profile" hasUnreadNotifications={true} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <UserCard user={user} />
        <WalletCard navigation={navigation} gold={gold} />
        <ProfileMenu navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomTheme.colors.white,
  },
  scroll: {
    paddingTop: 100,
    paddingHorizontal: 16,
    paddingBottom: 64,
  },
});
