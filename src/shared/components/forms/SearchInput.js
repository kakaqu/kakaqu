import React, { forwardRef } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
  border: '#ccc',
  primary: '#01A89E',
  background: '#fff',
};

const SearchInput = forwardRef(({ value, onChangeText, placeholder, style, ...props }, ref) => {
  return (
    <View style={[styles.container, style]}>
      <MaterialIcons name="search" size={20} color={COLORS.primary} style={styles.icon} />
      <TextInput
        ref={ref}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        {...props}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    height: 40,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.primary,
    paddingVertical: 0,
  },
});

export default SearchInput;
