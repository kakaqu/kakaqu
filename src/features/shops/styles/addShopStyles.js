import { StyleSheet, Dimensions } from 'react-native';
import CustomTheme from '../../../shared/styles/CustomThems';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  contentContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 50,
    width: '100%',
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
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#ddd',
    marginTop: 60,
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
});

export default styles;
