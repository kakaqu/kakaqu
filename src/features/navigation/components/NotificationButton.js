import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomTheme from '../../../shared/styles/CustomThems';


const NotificationButton = ({ hasNotifications, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon
        name={hasNotifications ? 'notifications' : 'notifications-none'}
        size={24}
        color={hasNotifications ? CustomTheme.colors.secondary : CustomTheme.colors.primary}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: CustomTheme.spacing.small,
  },
});

export default NotificationButton;
