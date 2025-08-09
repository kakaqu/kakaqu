import { StyleSheet } from 'react-native';
import CustomTheme from '../../styles/CustomThems';

export default StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
  },
  buttonText: {
    fontWeight: '600',
    color: '#333',
    fontSize: 16,
  },
  collapseContainer: {
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    elevation: 2,
  },
  tabHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: CustomTheme.colors.lightGray,
  },
  activeTabButton: {
    backgroundColor: CustomTheme.colors.primary,
  },
  tabButtonText: {
    color: '#333',
    fontSize: 14,
  },
  activeTabButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tabContent: {
    maxHeight: 300,
  },
});
