import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomAlert from './CustomAlert';
import CustomToast from '../toasts/CustomToast';
import { hideAlert } from '../../../features/core/alertSlice';
import { getAlertCallbacks } from '../../utils/alerts/alertUtils';

const CustomAlertWrapper = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  const { onSubmit, onCancel } = getAlertCallbacks();

  const [toastVisible, setToastVisible] = useState(false);

  const handleSubmit = () => {
    dispatch(hideAlert());
    if (onSubmit) onSubmit();
  };

  const handleCancel = () => {
    dispatch(hideAlert());
    if (onCancel) onCancel();
  };

  const handleToastHide = () => {
    setToastVisible(false);
    dispatch(hideAlert());
  };

  React.useEffect(() => {
    if (alert.visible && alert.mode === 'toast') {
      setToastVisible(true);
    } else {
      setToastVisible(false);
    }
  }, [alert.visible, alert.mode]);

  if (!alert.visible) return null;

  return (
    <>
      {alert.mode === 'alert' && (
        <CustomAlert
          isVisible={alert.visible}
          type={alert.type}
          title={alert.title}
          message={alert.message}
          showCancel={alert.showCancel}
          submitText={alert.submitText}
          cancelText={alert.cancelText}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      {alert.mode === 'toast' && toastVisible && (
        <CustomToast
          type={alert.type}
          title={alert.title} 
          message={alert.message}
          duration={alert.duration || 3000}
          onHide={handleToastHide}
        />
      )}
    </>
  );
};

export default CustomAlertWrapper;
