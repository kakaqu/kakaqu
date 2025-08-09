import React, { useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import CustomTheme from '../../styles/CustomThems';

const FollowButton = ({ isFollowing, onPress }) => {
  const [pressed, setPressed] = useState(false);

  const backgroundColor = isFollowing
    ? '#fff'
    : pressed
    ? CustomTheme.colors.secondary
    : CustomTheme.colors.primary;

  const textColor = isFollowing ? CustomTheme.colors.primary : '#fff';
  const iconColor = textColor;
  const borderColor = pressed ? CustomTheme.colors.secondary : CustomTheme.colors.primary;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[
        styles.button,
        {
          backgroundColor,
          borderColor,
        },
      ]}
    >
      <Feather
        name={isFollowing ? 'user-check' : 'user-plus'}
        size={18}
        color={iconColor}
        style={styles.icon}
      />
      <Text style={[styles.text, { color: textColor }]}>
        {isFollowing ? 'Takiptesin' : 'Takip Et'}
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FollowButton;
