import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomTheme from '../../../shared/styles/CustomThems';


const MoreMenuButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon
        name="more-vert"
        size={24}
        color={CustomTheme.colors.primary}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: CustomTheme.spacing.small,
  },
});

export default MoreMenuButton;
