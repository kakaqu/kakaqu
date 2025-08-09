import { StyleSheet } from 'react-native';
import CustomThems from '../../../../shared/styles/CustomThems';

export default StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
  },
  avatarContainer: {
    alignItems: 'center',
    marginRight: 12,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 12,
    backgroundColor: CustomThems.colors.darkGray,
  },
  verticalLine: {
    width: 60,
    height: 5,
    marginTop: 10,
    borderRadius: 2,
  },
  infoContainer: {
    flex: 1,
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  texts: {
    flex: 1,
    paddingRight: 6,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: CustomThems.colors.primary,
  },
  category: {
    color: CustomThems.colors.darkGray,
    fontSize: 13,
    marginTop: 2,
  },
  location: {
    fontSize: 12,
    color: CustomThems.colors.darkGray,
    marginTop: 4,
  },
  menuIcon: {
    paddingLeft: 8,
    paddingTop: 2,
  },
});
