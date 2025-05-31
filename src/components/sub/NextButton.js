import React, { useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import CustomTheme from '../../styles/CustomThems';

const NextButton = ({ buttonText = "Next →", onPress }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      style={[
        styles.nextButton,
        { backgroundColor: isPressed ? CustomTheme.colors.secondary : CustomTheme.colors.primary },
      ]}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <Text style={styles.nextButtonText}>{buttonText}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  nextButton: {
    width: '30%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NextButton;
