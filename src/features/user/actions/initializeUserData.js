import { insertBalance } from '../services/insertBalance';
import { insertTokenTransaction } from '../services/insertTokenTransaction';
import { insertPhoto } from '../services/insertPhoto';
import { insertAddress } from '../services/insertAddress';

export const initializeUserData = async ({ userId, uploadedUrl, provinceId, districtId, address, tokenAmount, now }) => {
  await Promise.all([
    insertBalance({ userId, amount: tokenAmount, now }),
    insertTokenTransaction({ userId, amount: tokenAmount, description: 'Kayıt hediyesi', now }),
    uploadedUrl ? insertPhoto({ userId, uploadedUrl, now, description: 'ilk Kayıt' }) : Promise.resolve(),
    insertAddress({ userId, provinceId, districtId, address, now }),
  ]);
};