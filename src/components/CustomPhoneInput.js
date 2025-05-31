// PhoneInput.js
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import CustomTheme from '../styles/CustomThems';


const CustomPhoneInput = ({ countryCode, phoneNumber, setPhoneNumber }) => {
  return (
    <View style={styles.inputWrapper}>
      {/* Country Code */}
      <View style={styles.countryCodeContainer}>
        <Text style={styles.countryCode}>{countryCode}</Text>
      </View>
      {/* Phone Number Input */}
      <TextInput
        style={styles.phoneInput}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        maxLength={10}
        placeholder="07..."
        keyboardType="phone-pad"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: CustomTheme.colors.primary,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: CustomTheme.colors.inputBacgournd,
    width: '90%',
    height: 50,
    marginVertical:20
  },
  countryCodeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  countryCode: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
});

export default CustomPhoneInput
