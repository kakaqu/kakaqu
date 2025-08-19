import { StyleSheet } from 'react-native';
import CustomTheme from '../../../shared/styles/CustomThems';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomTheme.colors.white,
  },
  flex: { flex: 1 },
  scroll: {
    padding: 24,
    paddingBottom: 60,
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 140,
    marginTop: 40,
    marginBottom: 24,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: CustomTheme.colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: CustomTheme.colors.placeholder,
    textAlign: 'center',
    marginBottom: 32,
  },
  button: {
    paddingVertical: 15,
    width: '100%',
  },
  loader: { marginTop: 24 },
  registerBox: { marginTop: 20 },
  registerLink: {
    color: CustomTheme.colors.secondary,
    fontWeight: '500',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  termsContainer: {
    marginTop: 48,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  termsText: {
    fontSize: 13,
    color: CustomTheme.colors.placeholder,
    textAlign: 'center',
    lineHeight: 20,
  },
  link: {
    color: CustomTheme.colors.primary,
    textDecorationLine: 'underline',
  },
});
