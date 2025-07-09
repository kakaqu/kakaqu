const getLanguageCode = (id) => {
  const mapping = {
    1: 'fa',  // Dari
    2: 'ps',  // Pashto
    3: 'tk',  // Turkmen
    4: 'tr',  // Turkish
    5: 'en',  // English
    6: 'ar',  // Arabic
  };
  return mapping[id] || 'fa'; // Default olarak İngilizce döner
};

export default getLanguageCode;