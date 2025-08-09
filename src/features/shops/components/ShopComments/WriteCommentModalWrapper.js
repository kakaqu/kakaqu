import React from "react";
import { Alert } from "react-native";
import { useTranslation } from "react-i18next";
import WriteCommentModal from "../../modals/WriteCommentModal";
import { insertShopComment } from "../../services/insertShopComment";
import { insertShopCommentReply } from "../../services/insertShopCommentReply";
import { updateShopComment } from "../../services/update/updateShopComment";
import { updateShopCommentReply } from "../../services/update/updateShopCommentReply";

const WriteCommentModalWrapper = ({
  visible,
  mentionUser,
  onClose,
  shopId,
  shopName,
  currentUserId,
  currentUsername,
  userAvatar,
  replyToComment,
  setComments,
  setExpandedReplies,
}) => {
  const { t } = useTranslation();

  const isEditing = replyToComment?.editMode === true;
  const isReply = replyToComment?.shop_comment_id !== undefined;
  

  const handleSend = async (commentText) => {
    try {
      const finalText = mentionUser
        ? `@${mentionUser} ${commentText}`
        : commentText;

      if (isEditing) {
        // ✅ Düzenleme işlemi
        if (isReply) {
          await updateShopCommentReply({
            id: replyToComment.id,
            comment: finalText,
          });

          setComments((prevComments) =>
            prevComments.map((comment) => ({
              ...comment,
              replies: comment.replies.map((r) =>
                r.id === replyToComment.id
                  ? { ...r, comment: finalText }
                  : r
              ),
            }))
          );
        } else {
          await updateShopComment({
            id: replyToComment.id,
            comment: finalText,
          });

          setComments((prevComments) =>
            prevComments.map((c) =>
              c.id === replyToComment.id ? { ...c, comment: finalText } : c
            )
          );
        }
      } else if (replyToComment) {
        // ✅ Yeni yanıt
        const replyId = await insertShopCommentReply({
          comment: finalText,
          userId: currentUserId,
          shopCommentId: replyToComment.id,
        });

        const newReply = {
          id: replyId,
          comment: finalText,
          created_at: new Date().toISOString(),
          
          user: {
            id: currentUserId,
            name: currentUsername,
            avatar: userAvatar,
          },
        };

        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === replyToComment.id
              ? { ...comment, replies: [...comment.replies, newReply] }
              : comment
          )
        );

        setExpandedReplies((prev) => ({
          ...prev,
          [replyToComment.id]: true,
        }));
      } else {
        // ✅ Yeni yorum
        const commentId = await insertShopComment({
          comment: finalText,
          userId: currentUserId,
          shopId,
          verified: true,
          status: true,
        });

        const newComment = {
          id: commentId,
          comment: finalText,
          created_at: new Date().toISOString(),
          user: {
            id: currentUserId,
            name: currentUsername,
            avatar: userAvatar,
          },
          replies: [],
        };

        setComments((prevComments) => [newComment, ...prevComments]);
      }
    } catch (error) {
      console.error("Yorum eklenemedi:", error.message);
      Alert.alert("Hata", "Yorum eklenirken bir hata oluştu.");
    } finally {
      onClose();
    }
  };

return (
<WriteCommentModal
  visible={visible}
  onClose={onClose}
  onSend={handleSend}
  avatar={userAvatar}
  username={currentUsername}
title={
  isEditing
    ? (isReply
        ? t("shop.edit_reply_title") || "Yanıtı Güncelle"
        : t("shop.edit_title") || "Yorumu Güncelle")
    : (isReply
        ? t("shop.reply_title") || "Yanıt Yaz"
        : t("shop.write_comment_title") || "Yorum Yaz")
}

description={
  isEditing
    ? (isReply
        ? t("shop.edit_reply_description") || "Yanıtınızı güncelleyin"
        : t("shop.edit_description") || "Yorumunuzu güncelleyin")
    : (isReply
        ? `${replyToComment.user.name} ${t("shop.replying_to") || "kullanıcısına yanıt"}`
        : t("shop.write_comment_desc", { shopName }) || `${shopName} için yorum yap`)
}

placeholder={
  isEditing
    ? (isReply
        ? t("shop.edit_reply_placeholder") || "Düzenlenmiş yanıtı buraya yazın..."
        : t("shop.edit_placeholder") || "Düzenlenmiş yorumu buraya yazın...")
    : (isReply
        ? t("shop.reply_placeholder") || "Yanıtınızı buraya yazın..."
        : t("shop.comment_placeholder") || "Yorumunuzu buraya yazın...")
}

  initialValue={isEditing ? replyToComment.comment || "" : ""}
  minLength={3}
  maxLength={250}
/>

);



};

export default WriteCommentModalWrapper;
