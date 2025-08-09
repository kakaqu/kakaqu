import React, { useEffect, useState } from 'react';
import {
  Animated,
  Text,
  StyleSheet,
  Dimensions,
  View,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomTheme from '../../styles/CustomThems';

const { width } = Dimensions.get('window');

const typeConfig = {
  info: {
    borderColor: CustomTheme.colors.accent || '#2196F3',
    icon: 'info',
    textColor: CustomTheme.colors.accent || '#2196F3',
  },
  success: {
    borderColor: CustomTheme.colors.primary || '#4CAF50',
    icon: 'check-circle',
    textColor: CustomTheme.colors.primary || '#4CAF50',
  },
  error: {
    borderColor: CustomTheme.colors.error || '#F44336',
    icon: 'error-outline',
    textColor: CustomTheme.colors.error || '#F44336',
  },
  warning: {
    borderColor: CustomTheme.colors.secondary || '#FFC107',
    icon: 'warning',
    textColor: CustomTheme.colors.secondary || '#FFC107',
  },
};

const CustomToast = ({
  type = 'info',
  title = '',
  message = '',
  duration = 3000,
  onHide,
  icon,
}) => {
  const [opacity] = useState(new Animated.Value(0));
  const [visible, setVisible] = useState(true);

  const config = typeConfig[type] || typeConfig.info;
  const iconName = icon || config.icon;
  const borderColor = config.borderColor;
  const textColor = config.textColor;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const timeout = setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
        if (onHide) onHide();
      });
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, onHide]);

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.modalBackground}>
        <Animated.View
          style={[
            styles.toastContainer,
            { borderColor, opacity },
          ]}
        >
          <View style={styles.content}>
            <Icon name={iconName} size={24} color={textColor} style={styles.icon} />
            <View style={styles.textContainer}>
              {title ? <Text style={[styles.title, { color: textColor }]}>{title}</Text> : null}
              {message ? <Text style={styles.message}>{message}</Text> : null}
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 50,
    backgroundColor: 'transparent',
  },
  toastContainer: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    maxWidth: width * 0.9,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    marginRight: 12,
    marginTop: 2,
  },
  textContainer: {
    flexShrink: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#333',
  },
});

export default CustomToast;
