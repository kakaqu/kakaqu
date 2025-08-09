import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  expandedContent: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    width: '100%',
  },
  descriptionContainer: {
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#444',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
    alignSelf: 'stretch',
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
  locationDetail: {
    fontSize: 14,
    color: '#222',
  },
});
