import { createAsyncThunk } from "@reduxjs/toolkit";
import { insertUserTransfer } from "../services/insertUserTransfer";
import { insertTokenTransaction } from "../services/insertTokenTransaction";
import { insertBalance } from "../services/insertBalance";

import { createSendGoldDto } from "../dto/createSendGoldDto";
import { validateSendGoldDto } from "../validators/validateSendGoldDto";
import { fetchUserBalance, fetchDailySentTotal } from "../services/userService";
import { insertNotification } from "../services/insertNotification";

export const sendGold = createAsyncThunk(
  "user/sendGold",
  async ({ fromUserId, toUserId, toUserName, amount, description }, { rejectWithValue, getState }) => {
    const state = getState();
    const fromUserName = state.user.name;

    try {
      // DTO oluştur
      const dto = createSendGoldDto({ fromUserId, toUserId, amount, description });

      // Doğrulama
      const dailyTotal = await fetchDailySentTotal(fromUserId);
      const balance = await fetchUserBalance(fromUserId);
      validateSendGoldDto({ ...dto, dailyTotal, balance });

      // Transfer kaydı
      const transfer = await insertUserTransfer(dto);

      // Gönderenin işlem kaydı (ALTIN ÇIKIŞ)
      await insertTokenTransaction({
        userId: fromUserId,
        typeId: 4, // altın gönderildi
        referenceId: transfer.id,
        amount: dto.amount,
        description: `"${toUserName}" kullanıcısına altın gönderildi`,
      });

      // Alıcının işlem kaydı (ALTIN GİRİŞ)
      await insertTokenTransaction({
        userId: toUserId,
        typeId: 3, // altın alındı
        referenceId: transfer.id,
        amount: dto.amount,
        description: `"${fromUserName}" kullanıcısından altın alındı`,
      });

      // Bakiye güncellemeleri
      await insertBalance({ userId: fromUserId, amount: -dto.amount });
      await insertBalance({ userId: toUserId, amount: dto.amount });

      // Bildirim: Alıcıya
      await insertNotification({
        userId: toUserId,
        notificationTypeId: "e15b8eec-14ac-4a10-aef3-70b8435945ca", // Sana altın gönderildi
        payload: {
          senderId: fromUserId,
          senderName: fromUserName,
          amount: dto.amount,
        },
      });

      // Bildirim: Göndericiye
      await insertNotification({
        userId: fromUserId,
        notificationTypeId: "3a93d9c2-4a97-4524-b070-82633835723b", // Altın gönderimi tamamlandı
        payload: {
          recipientId: toUserId,
          recipientName: toUserName,
          amount: dto.amount,
        },
      });

      return transfer;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
