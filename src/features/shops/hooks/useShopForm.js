// 📁 hooks/useShopForm.js
import { useState } from 'react';

export const useShopForm = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  /**
   * Form adımı geçişi için doğrulama kontrolü
   * @param {object} dto - formdan gelen veriler
   * @param {Function} validateFn - ilgili validasyon fonksiyonu
   * @param {Function} onSuccess - validasyon başarılıysa yapılacak işlem
   */
  const validateAndProceed = (dto, validateFn, onSuccess) => {
    setSubmitted(true);
    const result = validateFn(dto);
    setErrors(result.errors || {});
    if (result.isValid && typeof onSuccess === 'function') {
      onSuccess();
      setSubmitted(false); // Bir sonraki adıma geçmeden önce sıfırla
    }
  };

  return {
    step,
    setStep,
    submitted,
    setSubmitted,
    errors,
    setErrors,
    validateAndProceed,
  };
};
