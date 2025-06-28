export async function sendGoldByPhone({ fromUserId, phone, amount }) {
  return fetch('/api/send-gold/phone', {
    method: 'POST',
    body: JSON.stringify({ fromUserId, phone, amount }),
  });
}

export async function sendGoldByQr({ fromUserId, targetUserId, amount }) {
  return fetch('/api/send-gold/qr', {
    method: 'POST',
    body: JSON.stringify({ fromUserId, targetUserId, amount }),
  });
}