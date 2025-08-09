import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Dimensions,
  findNodeHandle,
  UIManager,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as Clipboard from "expo-clipboard";
import { fetchShopComments } from "../../services/get/fetchShopComments";
import getLanguageCode from "../../../../shared/services/getLanguageCode";
import CommentMenu from "../../../../shared/components/options/CommentMenu";
import { getCommentMenuOptions } from "../../../../shared/components/options/getCommentMenuOptions";

import CommentItem from "../../components/ShopComments/CommentItem";
import CommentInputBar from "../../components/ShopComments/CommentInputBar";
import WriteCommentModalWrapper from "../../components/ShopComments/WriteCommentModalWrapper";

import styles from "../../styles/commentStyles";
import { dispatchAlert } from "../../../../shared/utils/alerts/alertUtils";
import { handleDeleteOrHide, getDeleteOrHideAlertOptions, isReply } from "../../actions/commentActions";
import { blockUser } from "../../services/blockUser";
import CustomTheme from "../../../../shared/styles/CustomThems";




const ShopCommentList = ({ shopId, page = 0, limit = 10, isOwner, shopName }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true); // sadece ilk yükleme      // pull-to-refresh
  const [loadingMore, setLoadingMore] = useState(false);      // infinite scroll


  const [currentPage, setCurrentPage] = useState(page);
  const [hasMore, setHasMore] = useState(true);

  const [expandedReplies, setExpandedReplies] = useState({});
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [replyToComment, setReplyToComment] = useState(null);

  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const iconRefs = useRef({});

  const { t } = useTranslation();
  const currentUserId = useSelector((state) => state.user?.id);
  const currentUsername = useSelector((state) => state.user?.name);
  const useravatar = useSelector((state) => state.user?.avatar);
  const languageId = useSelector((state) => state.user?.languageId);
  const languageCode = getLanguageCode(languageId);
  const [mentionUser, setMentionUser] = useState(null);
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);

  // Refresh
  const onRefresh = () => {
    if (refreshing) return;
    setRefreshing(true);
    setHasMore(true);
    loadComments(0);
  };



  useEffect(() => {
    setHasMore(true);
    loadComments(0);
  }, [shopId]);

  // İlk yükleme spinner
  if (initialLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={CustomTheme.colors.primary} />
      </View>
    );
  }


  // Yorumları yükleme
async function loadComments(pageToLoad) {
  if ((pageToLoad === 0 && refreshing) || (pageToLoad > 0 && loadingMore)) return;

  if (pageToLoad === 0) {
    if (!refreshing) setInitialLoading(true);
  } else {
    setLoadingMore(true);
  }

  try {
    const newComments = await fetchShopComments({ shopId, page: pageToLoad, limit });

    if (newComments.length < limit) setHasMore(false);

    if (pageToLoad === 0) {
      setComments(newComments);
    } else {
      setComments((prev) => [...prev, ...newComments]);
    }

    setCurrentPage(pageToLoad);
  } catch (error) {
    console.error("Yorumlar yüklenirken hata:", error);
    Alert.alert("Hata", "Yorumlar yüklenirken bir hata oluştu.");
  } finally {
    if (pageToLoad === 0) {
      setInitialLoading(false);
      setRefreshing(false);
    } else {
      setLoadingMore(false);
    }
  }
}

  const openMenu = ({ comment, commentId, parentCommentId }) => {
    const ref = iconRefs.current[commentId];
    if (!ref) return;

    const handle = findNodeHandle(ref);
    if (!handle) return;

    UIManager.measureInWindow(handle, (x, y, width, height) => {
      const screen = Dimensions.get("window");
      const menuWidth = 240;
      const menuHeight = 260;

      const spaceBelow = screen.height - (y + height);
      const spaceAbove = y;

      let top;
      if (spaceBelow >= menuHeight) {
        top = y + height;
      } else if (spaceAbove >= menuHeight) {
        top = y - menuHeight;
      } else {
        top = Math.max(20, y - menuHeight / 2);
      }

      let left = x - menuWidth;
      if (left < 0) left = 10;
      if (left + menuWidth > screen.width) left = screen.width - menuWidth - 10;

      setMenuPosition({ x: left, y: top });

      // 🔥 Burada parentCommentId varsa, ekle:
      const fullComment = parentCommentId
        ? { ...comment, shop_comment_id: parentCommentId }
        : comment;

      setSelectedComment(fullComment);
      setMenuVisible(true);
    });
  };

  const onBlockUser = async (comment) => {
    const isReplyAuthor = isReply(comment);

    dispatchAlert(dispatch, {
      type: "warning",
      title: isReplyAuthor
        ? t("shop_comment.block_reply_author_title")
        : t("shop_comment.block_comment_author_title"),
      message: isReplyAuthor
        ? t("shop_comment.block_reply_author_message", { name: comment.user.name })
        : t("shop_comment.block_comment_author_message", { name: comment.user.name }),
      showCancel: true,
      submitText: t("shop_comment.block_submit"),
      cancelText: t("shop_comment.cancel"),
      onSubmit: async () => {
        try {
          await blockUser({ shopId, userId: comment.user.id, reason: "spam" });

          // Kullanıcının ID'sini al
          const blockedUserId = comment.user.id;

          // Yorum ve yanıtları aynı anda filtrele
          setComments(prev =>
            prev
              // Önce o kullanıcının yazdığı yorumları sil
              .filter(c => c.user.id !== blockedUserId)
              // Sonra kalan yorumların replies listesinden de aynı kullanıcıyı sil
              .map(c => ({
                ...c,
                replies: c.replies?.filter(r => r.user.id !== blockedUserId) || []
              }))
          );

          // Eğer istersen direkt sayfayı tamamen yenileyebilirsin
          // await loadComments(0);

        } catch (error) {
          dispatchAlert(dispatch, {
            type: "error",
            title: t("shop_comment.error_title"),
            message: t("shop_comment.error_message"),
            submitText: t("form.ok"),
          });
        }
      },
    });
  };


  const handleOptionPress = (option) => {
  setMenuVisible(false);

  const comment = selectedComment;


  switch (option.id) {
    case "view_profile":
      console.log("Profili gör:", comment.user.id);
      // navigate("UserProfile", { userId: comment.user.id }); // örnek
      break;

    case "reply":
      if (comment.shop_comment_id) {
        const parentComment = comments.find(
          (c) => c.id === comment.shop_comment_id
        );
        if (parentComment) {
          setReplyToComment(parentComment); // Her zaman ana yorum
          const userName = comment.user?.name?.trim().replace(/\s+/g, "_");
          setMentionUser(userName || null);
          setShowCommentModal(true);
        } else {
          console.warn("Ana yorum bulunamadı");
        }
      } else {
        // Bu bir ana yorum
        setReplyToComment(comment); // Ana yorum zaten
        setMentionUser(null); // Mention gerekmez
        setShowCommentModal(true);
      }
      break;

    case "report":
      dispatchAlert(dispatch, {
        mode: "toast",
        type: "warning",
        title: t("info.success"),
        message: t("shop_comment.user_reported"),
      });
      // openReportModal(comment) // varsa aktif hale getirebilirsin
      break;

    case "copy":
      Clipboard.setStringAsync(comment.comment);
      dispatchAlert(dispatch, {
        mode: "toast",
        type: "info",
        title: t("info.success"),
        message: t("shop_comment.comment_copied"),
      });
      break;

    case "edit":
      setReplyToComment({ ...comment, editMode: true });
      setShowCommentModal(true);
      break;

    case "delete":
    case "hide": {
      const validActions = ["delete", "hide"];
      const actionType = validActions.includes(option.id)
        ? option.id
        : "delete";

      const alertOptions = getDeleteOrHideAlertOptions({
        type: actionType,
        comment,
        t,
        dispatch,
        onSubmit: async () => {
          await handleDeleteOrHide({
            comment,
            comments,
            setComments,
            dispatch,
            t,
          });
        },
      });
      dispatchAlert(dispatch, alertOptions);
      break;
    }

    case "block_user":
      onBlockUser(comment);
      break;

    default:
      console.warn("Bilinmeyen seçenek:", option);
  }
  };


  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>{t("shop.comments") || "Yorumlar"}</Text>

     <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={({ item }) => (
          <CommentItem
            comment={item}
            languageCode={languageCode}
            expandedReplies={expandedReplies}
            onReplyPress={(comment) => {
              setReplyToComment(comment);
              setShowCommentModal(true);
            }}
            onMenuPress={openMenu}
            onExpandReplies={(id) =>
              setExpandedReplies((prev) => ({ ...prev, [id]: true }))
            }
            iconRefs={iconRefs}
          />
        )}
        onEndReached={() => {
          if (hasMore && !loadingMore) loadComments(currentPage + 1);
        }}
        onEndReachedThreshold={0.3}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator style={{ marginVertical: 15 }} size="small" color={CustomTheme.colors.primary} />
          ) : null
        }
        ListEmptyComponent={<Text>{t("shop.no_comments")}</Text>}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 70 }}
      />
      </View>

      <View style={styles.inputContainer}>
        <CommentInputBar
          onPress={() => {
            setReplyToComment(null);
            setShowCommentModal(true);
          }}
          placeholder={t("shop.write_a_comment") || "Yorum yaz..."}
        />
      </View>

      <WriteCommentModalWrapper
        visible={showCommentModal}
        mentionUser={mentionUser}
        onClose={() => {
          setShowCommentModal(false);
          setReplyToComment(null);
          setMentionUser(null);
        }}
        shopId={shopId}
        shopName={shopName}
        currentUserId={currentUserId}
        currentUsername={currentUsername}
        userAvatar={useravatar}
        replyToComment={replyToComment}
        setComments={setComments}
        setExpandedReplies={setExpandedReplies}
      />

    <CommentMenu
      visible={menuVisible}
      comment={selectedComment}
      position={menuPosition}
      currentUserId={currentUserId}
      isOwner={isOwner}
      t={t}
      onClose={() => setMenuVisible(false)}
      onOptionPress={handleOptionPress}
      getOptions={getCommentMenuOptions}
    />

    </View>
  );
};

export default ShopCommentList;
