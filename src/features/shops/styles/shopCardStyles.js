import { StyleSheet } from 'react-native';
import CustomThems from '../../../shared/styles/CustomThems';

export default StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: CustomThems.colors.white,
    borderRadius: 12,
    elevation: 2,
    padding: 12,
    marginVertical: 6,
    alignItems: 'flex-start',
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
    // backgroundColor: CustomThems.colors.secondary,
    marginTop: 10,
    borderRadius: 2,
  },
  infoContainer: {
    flex: 1,
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
  menuIcon: {
    paddingLeft: 8,
    paddingTop: 2,
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
  stats: {
    flexDirection: 'row',
    marginTop: 10,
    paddingVertical: 6,
    backgroundColor: CustomThems.colors.lightGray,
    borderRadius: 6,
    paddingHorizontal: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
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
    borderColor: CustomThems.colors.lightGray,
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
    marginLeft: 10,
    fontSize: 14,
    color: CustomThems.colors.darkGray,
  },
  subscribedLabel: {
  fontSize: 12,
  color: CustomThems.colors.success,
  marginTop: 2,
},
expandedArea: {
  paddingHorizontal: 16,
  paddingBottom: 12,
  backgroundColor: '#f9f9f9',
  borderTopWidth: 1,
  borderTopColor: '#eee',
},

description: {
  fontSize: 14,
  color: '#444',
  marginVertical: 8,
},

buttonRow: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
},

actionButton: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 4,
  width: '48%',
  paddingVertical: 6,
},

actionText: {
  fontSize: 14,
  marginLeft: 6,
  color: CustomThems.colors.primary,
},
expandedArea: {
  paddingHorizontal: 16,
  paddingBottom: 12,
  backgroundColor: '#f9f9f9',
  borderTopWidth: 1,
  borderTopColor: '#eee',
},

description: {
  fontSize: 14,
  color: '#444',
  marginVertical: 8,
},

buttonRow: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
},

actionButton: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 4,
  width: '48%',
  paddingVertical: 6,
},

actionText: {
  fontSize: 14,
  marginLeft: 6,
  color: CustomThems.colors.primary,
},



});
