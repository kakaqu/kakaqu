import { showAlert } from "../../../features/core/alertSlice";

let alertCallbacks = {
  onSubmit: null,
  onCancel: null,
};

export const dispatchAlert = (dispatch, {
  type = 'info',
  title = '',
  message = '',
  showCancel = false,
  submitText = 'Tamam',
  cancelText = 'İptal',
  onSubmit,
  onCancel,
}) => {
  alertCallbacks = { onSubmit, onCancel }; // sadece burada tutulur

  dispatch(showAlert({
    type,
    title,
    message,
    showCancel,
    submitText,
    cancelText,
  }));
};

// bu fonksiyonlar wrapper'dan çağrılır
export const getAlertCallbacks = () => alertCallbacks;
