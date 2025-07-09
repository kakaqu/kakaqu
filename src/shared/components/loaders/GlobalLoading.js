import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  Modal,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import DotLoader from './DotLoader';
import CustomTheme from '../../styles/CustomThems';

const { width } = Dimensions.get('window');

const GlobalLoading = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const { t } = useTranslation();

  if (!isLoading) return null;

  return (
    <Modal
      visible={true}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.box}>
          <DotLoader />
          <Text style={styles.text}>{t('info.loading')}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: Platform.OS === 'web' ? 'fixed' : 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999999,
  },
  box: {
    backgroundColor: '#fff',
    paddingVertical: 24,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
    width: width * 0.7,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
  text: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: '500',
    color: CustomTheme.colors.primary,
    textAlign: 'center',
  },
});

export default GlobalLoading;
