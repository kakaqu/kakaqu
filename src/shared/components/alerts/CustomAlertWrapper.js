import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomAlert from './CustomAlert';
import { hideAlert } from '../../../features/core/alertSlice';
import { getAlertCallbacks } from '../../utils/upload/alertUtils';



const CustomAlertWrapper = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  const { onSubmit, onCancel } = getAlertCallbacks();

  const handleSubmit = () => {
    dispatch(hideAlert());
    if (onSubmit) onSubmit();
  };

  const handleCancel = () => {
    dispatch(hideAlert());
    if (onCancel) onCancel();
  };

  return (
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
  );
};

export default CustomAlertWrapper;
