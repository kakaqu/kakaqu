import React, { useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import CustomTheme from '../../styles/CustomThems';

const MessageButton = ({buttonText, onPress }) => {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[
        styles.button,
        {
          borderColor: pressed ? CustomTheme.colors.secondary : CustomTheme.colors.primary,
          backgroundColor: pressed ? CustomTheme.colors.secondary : '#fff',
        },
      ]}
    >
      <Feather
        name="message-circle"
        size={18}
        style={[
          styles.icon,
          { color: pressed ? '#fff' : CustomTheme.colors.primary },
        ]}
      />
      <Text
        style={[
          styles.text,
          { color: pressed ? '#fff' : CustomTheme.colors.primary },
        ]}
      >
        {buttonText}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MessageButton;
