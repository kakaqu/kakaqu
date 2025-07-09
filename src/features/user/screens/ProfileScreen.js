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
    const gold = useSelector((state) => state.user.walletBalance);

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
