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
    width: '100%', // Bilgi container tam genişlikte olsun
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
    marginLeft: 15,
    fontSize: 14,
    color: CustomThems.colors.darkGray,
  },
  subscribedLabel: {
    fontSize: 12,
    color: CustomThems.colors.success,
    marginTop: 2,
  },

  // Expanded Content kısmı
  
expandedContent: {
  marginTop: 12,
  padding: 12,
  backgroundColor: '#f7f7f7',
  borderRadius: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  // elevation: 3,
  width: '100%',
},
separator: {
  height: 1,
  backgroundColor: '#ccc',
  marginVertical: 10,
  alignSelf: 'stretch',
},

descriptionContainer: {
  marginBottom: 8,
},
description: {
  fontSize: 14,
  color: '#444',
},
contactContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
phoneRow: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 6,
},
phone: {
  marginLeft: 6,
  fontSize: 14,
  color: '#222',
},
mapButton: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: CustomThems.colors.primary,
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 20,
},
mapButtonText: {
  color: '#fff',
  fontWeight: '600',
  marginLeft: 6,
  fontSize: 14,
},

});
