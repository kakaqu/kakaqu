import { Provider } from "react-redux";
import RootNavigation from "./src/app/navigation/rootNavigation";
import { I18nextProvider } from "react-i18next";
import React, { useEffect } from "react";
import i18n from './src/shared/locales/i18n';
import CustomAlertWrapper from "./src/shared/components/alerts/CustomAlertWrapper";
import { store, persistor } from "./src/app/store"; // ← persistor'ı da import et
import { PersistGate } from "redux-persist/integration/react"; // ← persist ekle
import { View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; // 🔹 buraya da ekle
import GlobalLoading from "./src/shared/components/loaders/GlobalLoading";



export default function App() {
    // 🔹 Kullanıcının daha önce seçtiği dili yükle
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedLang = await AsyncStorage.getItem('app-language');
        if (storedLang) {
          await i18n.changeLanguage(storedLang);
        }
      } catch (error) {
        console.warn('Dil yüklenirken hata oluştu:', error);
      }
    };
    loadLanguage();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
              <View style={{ flex: 1 }}>
                <RootNavigation />
                <CustomAlertWrapper />
                <GlobalLoading />
              </View>
        </I18nextProvider>
      </PersistGate>
    </Provider>
  );
}



// import { Provider } from "react-redux";
// import RootNavigation from "./src/app/navigation/rootNavigation";
// import { I18nextProvider } from "react-i18next";
// import React, { useEffect } from "react";
// import i18n from './src/shared/locales/i18n';
// import CustomAlertWrapper from "./src/shared/components/alerts/CustomAlertWrapper";
// import { store } from "./src/app/store";


// export default function App() {
//   return (
//     <Provider store={store}>
//       <I18nextProvider i18n={i18n}>
//         <>
//         <RootNavigation />
//         <CustomAlertWrapper />
//         </>
//       </I18nextProvider>
//     </Provider>
//   );
// }
