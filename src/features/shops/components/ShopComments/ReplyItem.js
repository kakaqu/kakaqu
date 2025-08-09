import React, { useRef } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import commentStyles from '../../styles/commentStyles';
import { convertToAfghanDate } from "../../../../shared/utils/date/dateConverter";
import { LetterAvatar } from "../../../../shared/utils/upload/LetterAvatar";
import CustomTheme from "../../../../shared/styles/CustomThems";

const ReplyItem = ({ reply, parentCommentId, languageCode, onOpenMenu }) => {
  const iconRef = useRef(null);
  const currentUserId = useSelector((state) => state.user?.id);

  // Mention ayrıştırma
  const commentText = reply.comment;
  const mentionMatch = commentText.match(/^@(\S+)\s*/);
  const mention = mentionMatch ? mentionMatch[0] : null;
  const restOfComment = mention ? commentText.slice(mention.length) : commentText;

  return (
    <View key={reply.id} style={commentStyles.replyContainer}>
      {reply.user.avatar ? (
        <Image source={{ uri: reply.user.avatar }} style={commentStyles.avatarSmall} />
      ) : (
        <LetterAvatar name={reply.user.name} size={25} />
      )}

      <View style={commentStyles.replyContent}>
        <View style={commentStyles.headerRow}>
          <Text style={commentStyles.userName}>{reply.user.name}</Text>
          <Text style={commentStyles.commentDate}>
            {convertToAfghanDate(reply.created_at, languageCode)}
          </Text>
          <TouchableOpacity
            ref={iconRef}
            onPress={() => onOpenMenu(reply, reply.id, iconRef, parentCommentId)}
          >
            <Entypo
              name="dots-three-vertical"
              size={16}
              color="gray"
              style={{ marginLeft: 6 }}
            />
          </TouchableOpacity>
        </View>

        <Text style={commentStyles.commentText}>
          {mention && (
            <Text style={{ fontWeight: 'bold', color: CustomTheme.colors.primary }}>
              {mention}
            </Text>
          )}
          {restOfComment}
        </Text>
      </View>
    </View>
  );
};

export default ReplyItem;
