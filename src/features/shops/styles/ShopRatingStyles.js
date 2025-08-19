import { StyleSheet } from "react-native";
import CustomTheme from "../../../shared/styles/CustomThems";

// Styles.js
export default StyleSheet.create({

  listContent: {
    paddingBottom: 80,
  },

  // Tek yorum / puan satırı
  ratingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4, // Daha küçük boşluk
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    backgroundColor: CustomTheme.colors.white,
  },
  lastItem: {
    marginBottom: 0, // Son elemana ekstra boşluk kaldırıldı
  },

  // Avatar
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 8, // Daha sıkı
    backgroundColor: CustomTheme.colors.lightGray,
  },
  avatarPlaceholder: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: CustomTheme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  avatarInitial: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  // İçerik
  ratingContent: {
    flex: 1,
  },

  // Üst satır
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  userNameStars: {
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontWeight: "600",
    fontSize: 14,
    color: "#333",
    marginRight: 4,
  },
  starRow: {
    flexDirection: "row",
  },
  menuButton: {
    padding: 6,
  },

  commentText: {
    fontSize: 13,
    color: "#555",
    marginTop: 2,
  },

  followDate: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    alignSelf: "flex-start",
  },

  emptyWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },

  buttonWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: CustomTheme.colors.white,
  },
  rateButton: {
    flexDirection: "row",
    backgroundColor: CustomTheme.colors.primary,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  rateButtonText: {
    color: CustomTheme.colors.white,
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 15,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  menuContainer: {
    backgroundColor: CustomTheme.colors.white,
    padding: 12,
    borderRadius: 10,
    elevation: 4,
    width: 250,
  },
  menuHeader: {
    paddingVertical: 6,
    marginBottom: 18,
    backgroundColor: CustomTheme.colors.primary,
    alignItems: "center",
    borderRadius: 8,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: CustomTheme.colors.white,
    textAlign: "center",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
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
