import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import CustomTheme from '../../../shared/styles/CustomThems';

export default function ProfileButton({ icon, label, onPress }) {
  return (
    <TouchableOpacity style={styles.menuButton} onPress={onPress}>
      <Ionicons name={icon} size={22} color={CustomTheme.colors.primary} />
      <Text style={styles.menuLabel}>{label}</Text>
      <Feather name="chevron-right" size={20} color={CustomTheme.colors.primary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: CustomTheme.colors.backgroundColor,
    justifyContent: 'space-between',
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    color: CustomTheme.colors.black,
    marginLeft: 12,
  },
});
