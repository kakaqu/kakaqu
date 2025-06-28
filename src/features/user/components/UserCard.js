import React from 'react';
import { View, Text, StyleSheet, Image, useColorScheme } from 'react-native';
import CustomTheme from '../../../shared/styles/CustomThems';

export default function UserCard({ user }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <View style={styles.profileCard}>
      <Image
        source={
          user.avatar
            ? { uri: user.avatar }
            : require('../../../assets/photo/user_avatar.png')
        }
        style={styles.avatar}
      />
      <View>
        <Text style={[styles.name, { color: isDark ? '#fff' : '#333' }]}>
          {user.name}
        </Text>

        {user.location ? (
          <Text style={[styles.meta, { color: isDark ? '#ccc' : '#666' }]}>
            {user.location}
          </Text>
        ) : null}

        {user.phone ? (
          <Text style={[styles.meta, { color: isDark ? '#ccc' : '#666' }]}>
            {user.phone}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: CustomTheme.colors.lightGray,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  meta: {
    fontSize: 14,
  },
});
