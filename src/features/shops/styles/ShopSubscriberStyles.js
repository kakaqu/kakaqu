import { StyleSheet } from "react-native";
import CustomTheme from "../../../shared/styles/CustomThems";

export default StyleSheet.create({
  outerContainer: {
    flex: 1,
    width: "100%",
  },
  listContent: {
    paddingBottom: 80,
  },
  emptyWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  subscriberContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 19,
    backgroundColor: "#eee",
  },
  avatarPlaceholder: {
    width: 35,
    height: 35,
    borderRadius: 19,
    backgroundColor: CustomTheme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitial: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  subscriberContent: {
    flex: 1,
    marginLeft: 14,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userName: {
    fontWeight: "600",
    fontSize: 14,
    color: "#333",
  },
  followDate: {
    fontSize: 12,
    color: "#777",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  buttonWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
    marginBottom: -5
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  menuContainer: {
    backgroundColor: CustomTheme.colors.white,
    marginTop: 35,
    padding: 12,
    borderRadius: 10,
    elevation: 4,
    width: 250,
  },
  menuHeader: {
    paddingVertical: 6,
    marginBottom: 18,
    backgroundColor: CustomTheme.colors.primary,
    alignItems: 'center',
    borderRadius: 8,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: CustomTheme.colors.white,
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
    color: CustomTheme.colors.darkGray,
  },

    /////////////

      empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 15,
    color: CustomTheme.colors.darkGray,
  },
  inputContainer: {
    backgroundColor: CustomTheme.colors.white,
    borderTopWidth: 1,
    borderColor: CustomTheme.colors.lightGray,
  },

    title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },

    wrapper: {
    flex: 1,
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
  },

});