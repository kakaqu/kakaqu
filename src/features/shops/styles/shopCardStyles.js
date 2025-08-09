import { StyleSheet } from 'react-native';
import CustomThems from '../../../shared/styles/CustomThems';

export default StyleSheet.create({
  card: {
    backgroundColor: CustomThems.colors.white,
    borderRadius: 12,
    elevation: 2,
    padding: 12,
    marginVertical: 6,
    alignItems: 'flex-start',
    width: '100%',
    flexDirection: 'column', // isteğe bağlı, aslında default bu
  },
});
