import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import commentStyles from "../../styles/commentStyles";
import ReplyItem from "./ReplyItem";
import ReplyPreview from "./ReplyPreview";
import { LetterAvatar } from "../../../../shared/utils/upload/LetterAvatar";
import { Entypo } from "@expo/vector-icons";
import { convertToAfghanDate } from "../../../../shared/utils/date/dateConverter";

const CommentItem = ({
  comment,
  languageCode,
  expandedReplies,
  onReplyPress,
  onMenuPress,
  onExpandReplies,
  iconRefs,
}) => {
  const repliesExpanded = expandedReplies[comment.id];

  return (
    <View style={commentStyles.commentContainer}>
      {comment.user.avatar ? (
        <Image source={{ uri: comment.user.avatar }} style={commentStyles.avatar} />
      ) : (
        <LetterAvatar name={comment.user.name} size={35} />
      )}

      <View style={commentStyles.commentContent}>
        <View style={commentStyles.headerRow}>
          <Text style={commentStyles.userName}>{comment.user.name}</Text>
          <Text style={commentStyles.commentDate}>
            {convertToAfghanDate(comment.created_at, languageCode)}
          </Text>
          <TouchableOpacity
            ref={(ref) => (iconRefs.current[comment.id] = ref)}
            onPress={() =>
              onMenuPress({
                comment: comment,
                commentId: comment.id,
                parentCommentId: null, // ana yorum olduğu için null
              })
            }

          >
            <Entypo
              name="dots-three-vertical"
              size={16}
              color="gray"
              style={{ marginLeft: 6 }}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => onReplyPress(comment)}>
          <Text style={commentStyles.commentText}>{comment.comment}</Text>
        </TouchableOpacity>

        {comment.replies.length > 0 && (
          <View style={commentStyles.repliesWrapper}>
            {repliesExpanded ? (
              comment.replies.map((reply) => (
              <ReplyItem
                // key={reply.id}
                key={reply?.id?.id || reply?.id} 
                reply={reply}
                parentCommentId={comment.id}
                languageCode={languageCode}
                onOpenMenu={(r, id, ref) => {
                  iconRefs.current[id] = ref.current;
                  onMenuPress({
                    comment: r,
                    commentId: id,
                    parentCommentId: comment.id, // ✅ artık gönderiyoruz
                  });
                }}
              />

              ))
            ) : (
              <ReplyPreview
                replies={comment.replies}
                commentId={comment.id}
                onExpand={onExpandReplies}
              />
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default CommentItem;
