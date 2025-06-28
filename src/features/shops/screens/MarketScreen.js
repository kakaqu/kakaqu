import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TopBar from '../../navigation/TopBar';
import { useNavigation } from '@react-navigation/native';


const MarketScreen = () => {
  const navigation = useNavigation();
  return (


    <View style={styles.container}>
          <TopBar
            navigation={navigation}
            context="shops"
            hasUnreadNotifications={false}
          />
      <Text style={styles.text}>MarketScreen Screen</Text>
    </View>
  );
};

export default MarketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#01A89E',
  },
});
