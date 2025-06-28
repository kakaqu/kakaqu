import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomTheme from '../../styles/CustomThems';



const typeConfig = {
  info: {
    icon: 'info',
    iconBackground: CustomTheme.colors.accent,
    iconColor: '#fff',
  },
  success: {
    icon: 'check-circle',
    iconBackground: CustomTheme.colors.primary,
    iconColor: '#fff',
  },
  error: {
    icon: 'error-outline',
    iconBackground: CustomTheme.colors.error,
    iconColor: '#fff',
  },
  warning: {
    icon: 'warning',
    iconBackground: CustomTheme.colors.secondary,
    iconColor: '#000',
  },
};

const CustomAlert = ({
  isVisible,
  type = 'info',
  title = 'Uyarı',
  message = '',
  submitText = 'Tamam',
  cancelText = 'İptal',
  showCancel = false,
  onSubmit,
  onCancel,
}) => {
  const { icon, iconBackground, iconColor } = typeConfig[type] || typeConfig.info;

  return (
    <Modal
      isVisible={isVisible}
      animationIn="zoomIn"
      animationOut="zoomOut"
      onBackdropPress={onCancel}
      backdropTransitionOutTiming={0}
    >
      <View style={[styles.container, { backgroundColor: '#fff' }]}> 
        <View style={[styles.iconContainer, { backgroundColor: iconBackground }]}> 
          <Icon name={icon} size={30} color={iconColor} /> 
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>

        <TouchableOpacity style={[styles.button, { backgroundColor: iconBackground }]} onPress={onSubmit}>
          <Text style={styles.buttonText}>{submitText}</Text>
        </TouchableOpacity>

        {showCancel && (
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={[styles.buttonText, { color: CustomTheme.colors.darkGray }]}>{cancelText}</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: -30,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fff',
  },
  title: {
    marginTop: 40,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    width: '100%',
    paddingVertical: 12,
    marginTop: 10,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
    color: 'white',
  },
});

export default CustomAlert;