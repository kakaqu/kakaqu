import React, { useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import CustomTheme from '../../styles/CustomThems';

const StartButton = ({ buttonText = "Başla", onPress }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      style={[
        styles.startButton,
        { backgroundColor: isPressed ? CustomTheme.colors.secondary : CustomTheme.colors.primary },
      ]}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <Text style={styles.startButtonText}>{buttonText}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  startButton: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StartButton;
