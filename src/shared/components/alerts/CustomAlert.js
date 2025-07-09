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
  isVisible = false,
  type = 'info',
  title = '',
  message = '',
  submitText = 'OK',
  cancelText = 'Cancel',
  showCancel = false,
  onSubmit = () => {},
  onCancel = () => {},
}) => {
  const config = typeConfig[type] || typeConfig.info;

  return (
    <Modal
      isVisible={isVisible}
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropOpacity={0.5}
      useNativeDriver
      onBackdropPress={onCancel}
      style={styles.modal}
    >
      <View style={styles.alertBox}>
        <View style={[styles.iconWrapper, { backgroundColor: config.iconBackground }]}>
          <Icon name={config.icon} size={30} color={config.iconColor} />
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>

        <TouchableOpacity style={[styles.button, { backgroundColor: config.iconBackground }]} onPress={onSubmit}>
          <Text style={styles.buttonText}>{submitText}</Text>
        </TouchableOpacity>

        {showCancel && (
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelText}>{cancelText}</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  alertBox: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 6,
  },
  iconWrapper: {
    position: 'absolute',
    top: -28,
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 36,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  message: {
    fontSize: 15,
    textAlign: 'center',
    color: '#444',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  cancelButton: {
    marginTop: 10,
    width: '100%',
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 15,
    color: '#444',
  },
});

export default CustomAlert;
