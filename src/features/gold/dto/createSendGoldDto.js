export function createSendGoldDto({ fromUserId, toUserId, amount, description }) {
  return {
    fromUserId,
    toUserId,
    amount: Number(amount),
    description: typeof description === 'string' ? description.trim() || null : null,
  };
}
