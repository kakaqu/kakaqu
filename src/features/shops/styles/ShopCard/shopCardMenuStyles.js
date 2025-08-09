import { StyleSheet } from 'react-native';
import CustomThems from '../../../../shared/styles/CustomThems';


export default StyleSheet.create({
  modalOverlay: {
    flex: 1,
  },
  menuContainer: {
    backgroundColor: CustomThems.colors.white,
    marginTop: 35,
    padding: 12,
    borderRadius: 10,
    elevation: 4,
    width: 250,
  },
  menuHeader: {
    paddingVertical: 6,
    marginBottom: 18,
    backgroundColor: CustomThems.colors.primary,
    alignItems: 'center',
    borderRadius: 8,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: CustomThems.colors.white,
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  menuLabel: {
    marginLeft: 15,
    fontSize: 14,
    color: CustomThems.colors.darkGray,
  },
});
