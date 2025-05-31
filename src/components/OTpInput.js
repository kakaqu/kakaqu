import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import CustomTheme from '../styles/CustomThems';

const OTPInput = ({ length = 6, onChange }, ref) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputs = useRef([]);

  useEffect(() => {
    setTimeout(() => {
      if (inputs.current[0]) {
        inputs.current[0].focus(); // İlk input'a otomatik fokus
      }
    }, 200); // Hafif gecikme ile daha kararlı fokus
  }, []);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    onChange && onChange(newOtp.join(''));

    if (text && index < length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (key, index) => {
    if (key === 'Backspace' && index > 0 && otp[index] === '') {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.inputContainer}>
        {otp.map((_, index) => (
          <View
            key={index}
            style={[styles.inputWrapper, index === 3 ? { marginLeft: 32 } : null]} // 3+3 ayrımı
          >
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              maxLength={1}
              value={otp[index]}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
              ref={(ref) => (inputs.current[index] = ref)}
            />
          </View>
        ))}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputWrapper: {
    marginHorizontal: 1,
  },
  input: {
    width: 35,
    height: 55,
    borderBottomWidth: 1,
    borderColor: CustomTheme.colors.primary,
    textAlign: 'center',
    fontSize: 20,
    backgroundColor: CustomTheme.colors.inputBacgournd,
    borderRadius: 6,
  },
});

export default React.forwardRef(OTPInput);
