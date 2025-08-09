import { StyleSheet } from 'react-native';
import CustomThems from '../../../../shared/styles/CustomThems';


export default StyleSheet.create({
  stats: {
    flexDirection: 'row',
    marginTop: 10,
    paddingVertical: 6,
    backgroundColor: CustomThems.colors.lightGray,
    borderRadius: 6,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontWeight: 'bold',
    fontSize: 14,
    color: CustomThems.colors.secondary,
  },
  statLabel: {
    fontSize: 11,
    color: CustomThems.colors.darkGray,
  },
});
