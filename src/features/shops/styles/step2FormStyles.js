// 📁 styles/step2FormStyles.js
import { StyleSheet } from 'react-native';
import CustomTheme from '../../../shared/styles/CustomThems';

const styles = StyleSheet.create({
  stepDescription: {
    fontSize: 14,
    color: CustomTheme.colors.text,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  backText: {
    color: CustomTheme.colors.primary,
    fontSize: 14,
    marginTop: 15,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default styles;
