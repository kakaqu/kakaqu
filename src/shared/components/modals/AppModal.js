import React from 'react';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';


// İçerik bileşenlerini import et
import SendGoldModal from '../../../features/user/modals/SendGoldModal';
import { hideModal } from '../../slices/globalModalSlice';
import LastGoldTransactions from '../../../features/user/modals/LastGoldTransactionsModal';


export default function AppModal() {
  const dispatch = useDispatch();
  const { visible, content, props } = useSelector((state) => state.globalModal);

  const renderContent = () => {
    switch (content) {
      case 'SEND_GOLD':
        return <SendGoldModal {...props} />;
      case 'LAST_TRANSACTIONS':
        return <LastGoldTransactions {...props} />;
      default:
        return null;
    }
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => dispatch(hideModal())}
      style={{ margin: 0, justifyContent: 'center' }}
      backdropOpacity={0.4}
      useNativeDriver
    >
      {renderContent()}
    </Modal>
  );
}
