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
    backgroundColor: '#fff',
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
    color: '#7F8C8D',
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
    maxWidth: 200,
    backgroundColor: CustomTheme.colors.primary || '#3498DB',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  timerText: {
    fontSize: 13,
    color: CustomTheme.colors.secondary || '#e74c3c',
    backgroundColor: '#fdecea',
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