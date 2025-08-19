import { StyleSheet, Dimensions } from 'react-native';
import CustomTheme from '../../../shared/styles/CustomThems';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomTheme.colors.bacgournd,
  },
  startButton: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    width: '100%',
  },
  skipTextWrapper: {
  position: 'absolute',
  bottom: 10, // Pagination dots ile aynı hizada
  left: 20,   // Sol tarafa hizalanmış
  zIndex: 10,
},
skipText: {
  fontSize: 16,
  color: CustomTheme.colors.secondary,
  fontWeight: 'bold',
  textAlign: 'left',
  fontStyle: 'undeline'
},
  button: {
    width: '70%',
    paddingVertical: 15,
  },

});

export default styles;
