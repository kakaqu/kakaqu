import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomTheme from '../../styles/CustomThems';

const CustomInput = ({
  type = "text",
  value,
  setValue,
  placeholder,
  label,
  error,
  secureTextEntry = false,
  iconName,
  onIconPress,
  multiline = false,
  numberOfLines,
  editable = true,
  keyboardType,
  maxLength,
  autoCapitalize = 'none',
  style,
  inputStyle,
  iconColor = CustomTheme.colors.primary,
  showCountryPicker,
  countryCode,
}) => {
  // Varsayılan klavye tipini belirleme
  const getKeyboardType = () => {
    if (keyboardType) return keyboardType;
    if (type === "email") return "email-address";
    if (type === "phone") return "phone-pad";
    if (type === "number") return "numeric";
    return "default";
  };

  // Placeholder belirleme
  const getPlaceholder = () => {
    if (placeholder) return placeholder;
    switch (type) {
      case "email": return "email@example.com";
      case "phone": return "7XX XXX XXX";
      case "password": return "••••••••";
      default: return "Metin girin...";
    }
  };


  const formatPhoneNumber = (text) => {
    if (type !== "phone") return text;
  
    const cleaned = text.replace(/\D/g, '').slice(0, 9); // En fazla 9 rakam al
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,3})$/);
  
    if (!match) return cleaned;
  
    return [match[1], match[2], match[3]]
      .filter(Boolean)
      .join(' ')
      .trim();
  };
  
  

  const handleChangeText = (text) => {
    if (type === "phone") {
      const formatted = formatPhoneNumber(text);
      setValue(formatted);
    } else {
      setValue(text);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={[
        styles.inputContainer,
        error ? styles.errorInput : null,
        !editable ? styles.disabledInput : null,
        multiline ? styles.multilineContainer : null
      ]}>
        {type === "phone" && showCountryPicker && (
          <TouchableOpacity 
            style={styles.countryCodeContainer}
            onPress={showCountryPicker}
          >
            <Text style={styles.countryCodeText}>{countryCode || '+93'}</Text>
            <Icon name="arrow-drop-down" size={20} color={iconColor} />
          </TouchableOpacity>
        )}
        
        {iconName && !onIconPress && (
          <Icon name={iconName} size={20} color={iconColor} style={styles.icon} />
        )}
        
        {iconName && onIconPress && (
          <TouchableOpacity onPress={onIconPress}>
            <Icon name={iconName} size={20} color={iconColor} style={styles.icon} />
          </TouchableOpacity>
        )}
        
        <TextInput
          style={[
            styles.input,
            inputStyle,
            multiline ? styles.multilineInput : null,
            type === "phone" && showCountryPicker ? styles.phoneInput : null
          ]}
          value={value}
          onChangeText={handleChangeText}
          placeholder={getPlaceholder()}
          placeholderTextColor={CustomTheme.colors.placeholder}
          secureTextEntry={type === "password" || secureTextEntry}
          keyboardType={getKeyboardType()}
          multiline={multiline}
          numberOfLines={multiline ? (numberOfLines || 4) : 1}
          editable={editable}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
        />
        
        {type === "password" && (
          <Icon 
            name={secureTextEntry ? "visibility-off" : "visibility"} 
            size={20} 
            color={iconColor}
            style={styles.iconRight}
          />
        )}
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: CustomTheme.spacing.medium,
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: CustomTheme.colors.black,
    marginBottom: CustomTheme.spacing.small,
    fontWeight: '500',
    textAlign: 'right',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: CustomTheme.colors.inputBacgournd,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: CustomTheme.colors.primary,
    paddingHorizontal: CustomTheme.spacing.medium,
    height: 45,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: CustomTheme.colors.black,
    paddingVertical: CustomTheme.spacing.small,
  },
  phoneInput: {
    paddingLeft: CustomTheme.spacing.small,
  },
  icon: {
    marginRight: CustomTheme.spacing.small,
  },
  iconRight: {
    marginLeft: CustomTheme.spacing.small,
  },
  errorInput: {
    borderColor: CustomTheme.colors.secondary,
  },
  errorText: {
    color: CustomTheme.colors.secondary,
    fontSize: 12,
    marginTop: 4,
  },
  disabledInput: {
    backgroundColor: '#FFF',
    opacity: 0.7,
  },
  multilineContainer: {
    height: 'auto',
    minHeight: 100,
    alignItems: 'flex-start',
    paddingVertical: CustomTheme.spacing.medium,
  },
  multilineInput: {
    textAlignVertical: 'top',
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: CustomTheme.spacing.small,
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  countryCodeText: {
    fontSize: 16,
    color: CustomTheme.colors.black,
    marginRight: 4,
  },
});

export default CustomInput;