import { StyleSheet } from 'react-native';
import CustomTheme from '../../../shared/styles/CustomThems';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomTheme.colors.inputBacgournd || '#f4f6f8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: CustomTheme.colors.white,
    padding: 28,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: CustomTheme.colors.primary || '#2C3E50',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: CustomTheme.colors.darkGray,
    textAlign: 'center',
    marginBottom: 24,
  },
  otpContainer: {
    alignItems: 'center',
    marginBottom: 2,
  },
  buttonWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    width: '100%',
    paddingVertical: 15,
  },
  timerText: {
    fontSize: 13,
    color: CustomTheme.colors.secondary || '#e74c3c',
    backgroundColor: CustomTheme.colors.lightGray,
    textAlign: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginTop: 10,
  },
  resendContainer: {
    marginTop: 14,
    alignItems: 'center',
  },
  resendText: {
    fontSize: 13,
    color: CustomTheme.colors.primary || '#2980B9',
    textDecorationLine: 'underline',
  },
});