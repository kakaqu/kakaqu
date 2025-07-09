import { StyleSheet } from "react-native";
import CustomTheme from "../../../shared/styles/CustomThems";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomTheme.colors.white,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: CustomTheme.colors.black,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeTab: {
    backgroundColor: CustomTheme.colors.primary,
    borderColor: CustomTheme.colors.primary,
  },
  tabText: {
    fontSize: 13,
    color: '#333',
  },
  activeTabText: {
    color: 'white',
    fontWeight: '600',
  },
  transactionItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  amount: {
    fontSize: 18,
    fontWeight: '600',
    minWidth: 60,
    textAlign: 'right',
  },
  descriptionContainer: {
    flex: 1,
    paddingLeft: 12,
  },
  description: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'right',
    color: CustomTheme.colors.text,
  },
  date: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 4,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#777',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#555',
    marginTop: 20,
  },
});
