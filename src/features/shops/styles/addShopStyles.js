import { StyleSheet, Dimensions } from 'react-native';
import CustomTheme from '../../../shared/styles/CustomThems';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
    contentContainer: {
    paddingVertical: 20,
    paddingBottom: 50,
    width: '100%',
    // alignItems: 'center', ⛔ bunu kaldır!
  },

  title: {
    color: CustomTheme.colors.primary,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 20,
    fontFamily: 'Arial',
    alignSelf: 'center',
  },
  avatar: {
    width: width * 0.5,
    height: width * 0.5,
    borderRadius: (width * 0.5) / 2,
    backgroundColor: CustomTheme.colors.white,
    marginTop: 40,
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 20,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
  },
  picker: {
    width: '100%',
    marginBottom: 20,
  },
  map: {
    width: width - 40,
    height: 200,
    borderRadius: 10,
    marginVertical: 20,
    alignSelf: 'center',
  },
  mapLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: CustomTheme.colors.primary,
    alignSelf: 'flex-start',
    marginTop: 20,
    marginBottom: 10,
  },
  errorText: {
    color: CustomTheme.colors.secondary,
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
  },
  stepDescription: {
    fontSize: 14,
    color: CustomTheme.colors.text,
    textAlign: 'right',
    lineHeight: 22,
    marginBottom: 15,
    alignSelf: 'stretch',
  },
  avatarHint: {
    fontSize: 12,
    color: CustomTheme.colors.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  backText: {
    fontSize: 14,
    color: CustomTheme.colors.primary,
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});

export default styles;
