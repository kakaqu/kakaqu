import { StyleSheet } from 'react-native';
import CustomTheme from '../../../shared/styles/CustomThems';

const COLORS = CustomTheme.colors;

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    backgroundColor: COLORS.background || '#fff',
    paddingBottom: 8,
    zIndex: 1,
  },
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: COLORS.background || '#fff',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border || '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  rightItems: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 6,
    borderRadius: 6,
  },
  popupContainer: {
    marginHorizontal: 10,
    marginTop: 12,
    padding: 15,
    borderRadius: 8,
    backgroundColor: COLORS.background || '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  searchInput: {
    width: '100%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 56,
    paddingRight: 15,
  },
  moreMenuContainer: {
    minWidth: 180,
    borderRadius: 8,
    backgroundColor: COLORS.background || '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  menuItemIcon: {
    marginRight: 10,
  },
  menuItemText: {
    fontSize: 16,
    color: COLORS.primary,
  },
searchRow: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 10,
},

closeButton: {
  marginLeft: 8,
  padding: 6,
},

});

export default styles;
