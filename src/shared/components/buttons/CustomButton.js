// CustomButton.js
import React, { useState } from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import CustomTheme from '../../styles/CustomThems';
import { MaterialIcons, FontAwesome, Ionicons, Entypo, AntDesign, Feather } from '@expo/vector-icons';

const BUTTON_TYPES = {
  primary: { bg: CustomTheme.colors.primary, color: CustomTheme.colors.white, outline: false },
  primary_outline: { bg: 'transparent', color: CustomTheme.colors.primary, outline: true },
  secondary: { bg: CustomTheme.colors.secondary, color: CustomTheme.colors.white, outline: false },
  secondary_outline: { bg: 'transparent', color: CustomTheme.colors.secondary, outline: true },
  danger: { bg: CustomTheme.colors.error, color: CustomTheme.colors.white, outline: false },
  danger_outline: { bg: 'transparent', color: CustomTheme.colors.error, outline: true },
  success: { bg: CustomTheme.colors.success, color: CustomTheme.colors.white, outline: false },
  success_outline: { bg: 'transparent', color: CustomTheme.colors.success, outline: true },
  warning: { bg: CustomTheme.colors.warning, color: CustomTheme.colors.black, outline: false },
  warning_outline: { bg: 'transparent', color: CustomTheme.colors.warning, outline: true },
  lightGray: { bg: CustomTheme.colors.lightGray, color: CustomTheme.colors.darkGray, outline: false },
  lightGray_outline: { bg: 'transparent', color: CustomTheme.colors.darkGray, outline: true },
};

const ICON_LIBRARIES = { MaterialIcons, FontAwesome, Ionicons, Entypo, AntDesign, Feather };

const CustomButton = ({
  buttonText = '',
  onPress = () => {},
  type = 'primary',
  iconName = null,
  iconLibrary = 'MaterialIcons',
  style = {},
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const buttonType = BUTTON_TYPES[type] || BUTTON_TYPES.primary;
  const IconComponent = ICON_LIBRARIES[iconLibrary] || MaterialIcons;

  return (
    <Pressable
      style={[
        styles.button,
        {
          backgroundColor: isPressed
            ? CustomTheme.colors.secondary
            : buttonType.outline
            ? 'transparent'
            : buttonType.bg,
          borderColor: isPressed
            ? CustomTheme.colors.secondary
            : buttonType.outline
            ? buttonType.color
            : 'transparent',
          borderWidth: buttonType.outline || isPressed ? 1 : 0,
        },
        style,
      ]}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // tıklama hassasiyetini artırır
    >
      <View style={styles.content}>
        {iconName && (
          <IconComponent
            name={iconName}
            size={18}
            color={isPressed ? '#fff' : buttonType.color}
            style={buttonText ? { marginRight: 8 } : {}}
          />
        )}
        {buttonText !== '' && (
          <Text style={[styles.text, { color: isPressed ? '#fff' : buttonType.color }]}>
            {buttonText}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 5,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomButton;
