import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { LetterAvatar } from "../../../../shared/utils/upload/LetterAvatar";
import commentStyles from "../../styles/commentStyles";

const ReplyPreview = ({ replies, commentId, onExpand }) => {
  const { t } = useTranslation();
  const firstReply = replies[0];

  const previewText =
    firstReply.comment.length > 40
      ? firstReply.comment.slice(0, 40) + "..."
      : firstReply.comment;

  return (
    <View>
      <View style={commentStyles.replyPreviewRow}>
        {firstReply.user.avatar ? (
          <Image
            source={{ uri: firstReply.user.avatar }}
            style={commentStyles.avatarTiny}
          />
        ) : (
          <LetterAvatar name={firstReply.user.name} size={20} />
        )}

        <Text style={commentStyles.replyPreviewText}>
          <Text style={commentStyles.replyPreviewUser}>{firstReply.user.name}</Text>
          {" — "}
          {previewText}
        </Text>
      </View>

      <TouchableOpacity onPress={() => onExpand(commentId)}>
        <Text style={commentStyles.viewMoreRepliesText}>
          {t("shop.view_more_replies", {
            count: replies.length > 1 ? replies.length : 1,
            suffix: replies.length > 1 ? "replies" : "reply",
          })}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReplyPreview;
