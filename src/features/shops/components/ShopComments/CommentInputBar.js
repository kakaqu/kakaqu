import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import commentStyles from "../../styles/commentStyles";
import CustomTheme from "../../../../shared/styles/CustomThems";

const CommentInputBar = ({ onPress, placeholder }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={commentStyles.commentInputButton}
      activeOpacity={0.8}
    >
      <Feather
        name="message-square"
        size={20}
        color={CustomTheme.colors.darkGray}
        style={{ marginHorizontal: 8, marginTop: 5 }}
      />
      <Text style={commentStyles.commentInputText}>{placeholder}</Text>
    </TouchableOpacity>
  );
};

export default CommentInputBar;
