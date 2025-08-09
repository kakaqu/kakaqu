import { insertShopComment } from "../services/insertShopComment";
import { insertShopCommentReply } from "../services/insertShopCommentReply";
import { deleteShopComment } from "../services/update/deleteShopComment";
import { deleteShopCommentReply } from "../services/update/deleteShopCommentReply";



/**
 * Genel yorum/yanıt ekleme işlevi
 */
export const handleSubmitComment = async ({ type, payload }) => {
  if (type === 'shop') {
    const { comment, shopId, userId } = payload;
    return await insertShopComment({ comment, shopId, userId });
  }

  if (type === 'reply') {
    const { comment, shopCommentId, userId } = payload;
    return await insertShopCommentReply({ comment, shopCommentId, userId });
  }

  throw new Error('Geçersiz yorum türü');
};

export function isReply(comment) {
  return Boolean(comment?.shop_comment_id);
}

// commentActions.js
export async function handleDeleteOrHide({
  comment,
  comments,
  setComments,
  dispatch,
  t,
}) {
  
  // const isReply = (comment) => Boolean(comment.shop_comment_id);
  try {
    if (isReply(comment)) {
      await deleteShopCommentReply(comment.id);

      // Yanıtı ilgili yorumun içinden çıkar
      const updatedComments = comments.map(c => ({
        ...c,
        replies: c.replies?.filter(r => r.id !== comment.id) || [],
      }));
      setComments(updatedComments);

    } else {
      await deleteShopComment(comment.id);

      // Yorumu tamamen kaldır
      const filtered = comments.filter(c => c.id !== comment.id);
      setComments(filtered);
    }
  } catch (error) {
    dispatchAlert(dispatch, {
      type: 'error',
      title: t('shop_comment.error_title') || 'Hata',
      message: t('shop_comment.error_message') || 'İşlem sırasında hata oluştu.',
    });
  }
}

export function getDeleteOrHideAlertOptions({ type, comment, t, dispatch, onSubmit }) {
  
  // const isReply = (comment) => Boolean(comment.shop_comment_id);
  // type: 'delete' veya 'hide'
  const titles = {
    delete: isReply(comment) ? t('shop_comment.delete_reply_title') : t('shop_comment.delete_comment_title'),
    hide: isReply(comment) ? t('shop_comment.hide_reply_title') : t('shop_comment.hide_comment_title'),
  };

  const messages = {
    delete: isReply(comment) ? t('shop_comment.delete_reply_message') : t('shop_comment.delete_comment_message'),
    hide: isReply(comment) ? t('shop_comment.hide_reply_message') : t('shop_comment.hide_comment_message'),
  };

  return {
    type: 'warning',
    title: titles[type],
    message: messages[type],
    showCancel: true,
    submitText: t('shop_comment.submit_delete') || 'Sil',
    cancelText: t('shop_comment.cancel') || 'Vazgeç',
    onSubmit,
  };
}
