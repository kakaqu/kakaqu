import { StyleSheet } from 'react-native';
import CustomTheme from '../../../shared/styles/CustomThems';

const styles = StyleSheet.create({
  container: {
    marginBottom: CustomTheme.spacing.medium,
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: CustomTheme.colors.black,
    marginBottom: 6,
    fontWeight: '500',
    textAlign: 'right',
  },
  errorText: {
    color: CustomTheme.colors.secondary,
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
  },
});

export default styles;
