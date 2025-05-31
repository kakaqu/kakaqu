// LoginButton.js
import React, { useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import CustomTheme from '../styles/CustomThems';

const CustomButton = ({ buttonText, onPress }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      style={[
        styles.loginButton,
        { backgroundColor: isPressed ? CustomTheme.colors.secondary : CustomTheme.colors.primary },
      ]}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <Text style={styles.loginButtonText}>{buttonText}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    width: '90%',
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CustomButton;
