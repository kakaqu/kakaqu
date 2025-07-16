export function validateSendGoldDto({
  fromUserId,
  toUserId,
  amount,
  description,
  dailyTotal,
  balance,
}) {
  const errors = {};

  const cleanedAmount = typeof amount === 'string' ? amount.trim().replace(',', '.') : amount;
  const parsedAmount = Number(cleanedAmount);
  const parsedDailyTotal = Number(dailyTotal);
  const parsedBalance = Number(balance);

  if (fromUserId === toUserId) {
    errors.amount = 'own_phone';
  } else if (!cleanedAmount) {
    errors.amount = 'amount_required';
  } else if (!isFinite(parsedAmount) || !Number.isInteger(parsedAmount)) {
    errors.amount = 'amount_invalid';
  } else if (parsedAmount < 1) {
    errors.amount = 'min_amount';
  } else if (parsedAmount > 1000) {
    errors.amount = 'max_amount';
  } else if (parsedDailyTotal + parsedAmount > 5000) {
    errors.amount = 'daily_limit_exceeded';
  } else if (parsedAmount > parsedBalance) {
    errors.amount = 'insufficient_balance';
  }

  const trimmedDescription = typeof description === 'string' ? description.trim() : '';
  if (!trimmedDescription) {
    errors.description = 'description_required';
  } else if (trimmedDescription.length < 5) {
    errors.description = 'description_short';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
