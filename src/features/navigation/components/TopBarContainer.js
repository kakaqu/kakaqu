import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomTheme from '../../styles/CustomThems';

const TopBarContainer = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomTheme.colors.white,
    paddingHorizontal: CustomTheme.spacing.medium,
    paddingVertical: CustomTheme.spacing.small,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    zIndex: 10,
  },
});

export default TopBarContainer;
