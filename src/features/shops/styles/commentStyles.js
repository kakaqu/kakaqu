import { StyleSheet } from "react-native";
import CustomTheme from "../../../shared/styles/CustomThems";

const commentStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  commentContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 24,
    backgroundColor: CustomTheme.colors.lightGray,
  },
  avatarSmall: {
    width: 25,
    height: 25,
    borderRadius: 16,
    backgroundColor: CustomTheme.colors.lightGray,
  },
  commentContent: {
    flex: 1,
    marginLeft: 12,
    padding: 8,
    borderRadius: 8,
    backgroundColor: CustomTheme.colors.lightGray,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  userName: {
    fontWeight: "bold",
    marginRight: 8,
    fontSize: 14,
  },
  commentDate: {
    fontSize: 12,
    color: "gray",
    marginLeft: "auto",
    backgroundColor: CustomTheme.colors.white,
    paddingHorizontal: 6,
    borderRadius: 4,
    alignSelf: "center",
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 6,
    flexWrap: "wrap",
  },
  repliesWrapper: {
    marginTop: 8,
    paddingLeft: 12,
    borderLeftWidth: 1,
    borderLeftColor: CustomTheme.colors.lightGray,
  },
  replyContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  replyContent: {
    flex: 1,
    marginLeft: 16,
    marginRight: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: CustomTheme.colors.white,
  },
  inputContainer: {
    padding: 2,
    backgroundColor: CustomTheme.colors.white,
    borderTopWidth: 1,
    borderColor: CustomTheme.colors.lightGray,
  },
  commentInputButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CustomTheme.colors.white,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: CustomTheme.colors.darkGray,
    marginVertical: 8,
  },
  commentInputText: {
    color: CustomTheme.colors.darkGray,
    fontSize: 15,
  },
  avatarTiny: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 6,
    marginTop: 2,
  },
  replyPreviewRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 6,
    borderRadius: 8,
    marginTop: 4,
  },
  replyPreviewText: {
    flex: 1,
    flexWrap: "nowrap",
    fontSize: 13,
    color: CustomTheme.colors.darkGray,
    marginHorizontal: 6,
  },
  replyPreviewUser: {
    fontWeight: "500",
    color: CustomTheme.colors.black,
  },
  viewMoreRepliesText: {
    color: CustomTheme.colors.primary,
    marginLeft: 26,
    marginTop: 2,
    fontSize: 13,
  },
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
});

export default commentStyles;
