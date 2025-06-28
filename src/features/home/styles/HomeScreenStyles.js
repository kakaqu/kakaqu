import { Platform, StyleSheet } from "react-native";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    paddingTop: Platform.OS === 'ios' ? 100 : 110, // TopBar yüksekliği kadar boşluk
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  body: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
});
