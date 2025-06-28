import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AddProductScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>AddProductScreen Screen</Text>
    </View>
  );
};

export default AddProductScreen;

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
