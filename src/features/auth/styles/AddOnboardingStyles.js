import { StyleSheet } from 'react-native';
import CustomTheme from '../../../shared/styles/CustomThems';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomTheme.colors.white,
    padding: 20,
  },
  scrollView: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 20,
    backgroundColor: CustomTheme.colors.backgroundColor,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    paddingVertical: 15,
  },
});

export default styles;