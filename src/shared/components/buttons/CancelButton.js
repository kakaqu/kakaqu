import React, { useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import CustomTheme from '../../styles/CustomThems';


const CancelButton = ({ buttonText, onPress }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      style={[
        styles.loginButton,
        { backgroundColor: isPressed ? CustomTheme.colors.secondary : CustomTheme.colors.lightGray },
      ]}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <Text style={[styles.loginButtonText, {color : isPressed ? CustomTheme.colors.white : CustomTheme.colors.darkGray },]}>{buttonText}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    width: '100%',
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: CustomTheme.colors.darkGray,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CancelButton;


