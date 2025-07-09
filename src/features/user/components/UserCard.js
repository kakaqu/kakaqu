import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomTheme from '../../../shared/styles/CustomThems';

export default function UserCard({ user }) {
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
        <Text style={styles.name}>{user.name}</Text>

        {user.location ? (
          <Text style={styles.meta}>{user.location}</Text>
        ) : null}

        {user.phone ? (
          <Text style={styles.meta}>{user.phone}</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: CustomTheme.colors.lightGray,
    backgroundColor: CustomTheme.colors.white,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 20,
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
    color: CustomTheme.colors.text,
  },
  meta: {
    fontSize: 14,
    color: CustomTheme.colors.textSecondary,
  },
});
