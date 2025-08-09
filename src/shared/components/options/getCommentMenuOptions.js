import {
  Feather,
  Ionicons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";

export const getCommentMenuOptions = ({ comment, currentUserId, isOwner, t }) => {
  const isOwnerOfComment = comment?.user?.id === currentUserId;
  const options = {
    viewProfile: {
      id: "view_profile",
      label: t("comment.view_profile") || "Profili gör",
      icon: (color, size) => <Ionicons name="person-circle-outline" size={size} color={color} />,
    },
    reply: {
      id: "reply",
      label: t("comment.reply") || "Yanıt yaz",
      icon: (color, size) => <Ionicons name="chatbox-ellipses-outline" size={size} color={color} />,
    },
    report: {
      id: "report",
      label: t("comment.report") || "Şikayet et",
      icon: (color, size) => <MaterialIcons name="report-problem" size={size} color={color} />,
    },
    copy: {
      id: "copy",
      label: t("comment.copy") || "Kopyala",
      icon: (color, size) => <Feather name="copy" size={size} color={color} />,
    },
    edit: {
      id: "edit",
      label: t("comment.edit") || "Düzenle",
      icon: (color, size) => <Feather name="edit" size={size} color={color} />,
    },
    delete: {
      id: "delete",
      label: t("comment.delete") || "Yorumu sil",
      icon: (color, size) => <MaterialIcons name="delete-outline" size={size} color={color} />,
    },
    hide: {
      id: "hide",
      label: t("comment.hide") || "Yorumu gizle",
      icon: (color, size) => <Feather name="eye-off" size={size} color={color} />,
    },
    blockUser: {
      id: "block_user",
      label: t("comment.block_user") || "Kullanıcıyı engelle",
      icon: (color, size) => <FontAwesome name="ban" size={size} color={color} />,
    },
  };

  // Senaryo 1: Başkasının dükkanı, başkasının yorumu
  if (!isOwner && !isOwnerOfComment) {
    return [
      options.viewProfile,
      options.reply,
      options.report,
      options.copy,
    ];
  }

  // Senaryo 2: Başkasının dükkanı, senin yorumun
  if (!isOwner && isOwnerOfComment) {
    return [
      options.reply,
      options.copy,
      options.edit,
      options.delete,
      options.hide,
    ];
  }

  // Senaryo 3: Senin dükkanın, başkasının yorumu
  if (isOwner && !isOwnerOfComment) {
    return [
      options.viewProfile,
      options.reply,
      options.report,
      options.copy,
      options.hide,
      options.delete,
      options.blockUser,
    ];
  }

  // Senaryo 4: Senin dükkanın, senin yorumun
  if (isOwner && isOwnerOfComment) {
    return [
      options.reply,
      options.copy,
      options.edit,
      options.delete,
      options.hide,
    ];
  }

  return [];
};
