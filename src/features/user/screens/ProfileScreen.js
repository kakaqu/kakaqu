import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import UserCard from '../components/UserCard';
import WalletCard from '../components/WalletCard';
import ProfileMenu from '../components/ProfileMenu';
import TopBar from '../../navigation/TopBar';
import CustomTheme from '../../../shared/styles/CustomThems';
import { loadUserData } from '../actions/loadUserData';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const userID = useSelector((state) => state.user.id);
  const name = useSelector((state) => state.user.name);
  const phone = useSelector((state) => state.user.phoneNumber);
  const location = useSelector((state) => state.user.address);
  const avatar = useSelector((state) => state.user.avatar);
  const gold = useSelector((state) => state.user.walletBalance);

  const user = {
    name,
    phone,
    location,
    avatar,
  };

  useEffect(() => {
    if (userID) {
      dispatch(loadUserData(userID));
    }
  }, [userID, dispatch]);

  // Profil sayfasında arama ve detaylı arama kapalı, bildirim açık
  return (
    <SafeAreaView style={styles.container}>
      <TopBar
        navigation={navigation}
        title={t('Profilim')}
        context="profile"
        showSearch={false}
        showAdvancedSearch={false}
        showNotification={true}
        hasUnreadNotifications={true}
        onNotificationPress={() => alert(t('Bildirimler ekranına gidiliyor'))}
        showMoreOptions={true}
        moreOptionsItems={[
          { label: t('Ayarlar'), value: 'settings' },
          { label: t('Yardım'), value: 'help' },
        ]}
        onMoreOptionSelect={(item) => alert(`${t('Seçilen seçenek')}: ${item.label}`)}
      />

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
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 64,
  },
});
