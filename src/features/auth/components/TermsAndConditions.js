import React from 'react';
import { View, Text, Linking } from 'react-native';

const TermsAndConditions = ({ t, styles }) => (
  <View style={styles.termsContainer}>
    <Text style={styles.termsText}>
      {t('login.terms')}{' '}
      <Text
        style={styles.link}
        onPress={() => Linking.openURL('https://example.com/terms')}
      >
        {t('login.terms_link')}
      </Text>{' '}
      {t('login.and')}{' '}
      <Text
        style={styles.link}
        onPress={() => Linking.openURL('https://example.com/privacy')}
      >
        {t('login.privacy_link')}
      </Text>{' '}
      {t('login.accepted')}
    </Text>
  </View>
);

export default TermsAndConditions;
