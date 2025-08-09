// import { Provider } from "react-redux";
// import RootNavigation from "./src/app/navigation/rootNavigation";
// import { I18nextProvider } from "react-i18next";
// import React, { useEffect } from "react";
// import i18n from './src/shared/locales/i18n';
// import CustomAlertWrapper from "./src/shared/components/alerts/CustomAlertWrapper";
// import { store, persistor } from "./src/app/store";
// import { PersistGate } from "redux-persist/integration/react";
// import { View } from "react-native";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // React Query imports
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// import GlobalLoading from "./src/shared/components/loaders/GlobalLoading";

// const queryClient = new QueryClient();

// export default function App() {
//   useEffect(() => {
//     const loadLanguage = async () => {
//       try {
//         const storedLang = await AsyncStorage.getItem('app-language');
//         if (storedLang) {
//           await i18n.changeLanguage(storedLang);
//         }
//       } catch (error) {
//         console.warn('Dil yüklenirken hata oluştu:', error);
//       }
//     };
//     loadLanguage();
//   }, []);

//   return (
//     <QueryClientProvider client={queryClient}>
//       <Provider store={store}>
//         <PersistGate loading={null} persistor={persistor}>
//           <I18nextProvider i18n={i18n}>
//             <View style={{ flex: 1 }}>
//               <RootNavigation />
//               <CustomAlertWrapper />
//               <GlobalLoading />
//             </View>
//           </I18nextProvider>
//         </PersistGate>
//       </Provider>
//     </QueryClientProvider>
//   );
// }
import React, { useEffect } from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { I18nextProvider } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-toast-message";

// Navigation ve Store
import RootNavigation from "./src/app/navigation/rootNavigation";
import { store, persistor } from "./src/app/store";

// Locale ve UI bileşenleri
import i18n from './src/shared/locales/i18n';
import CustomAlertWrapper from "./src/shared/components/alerts/CustomAlertWrapper";
import GlobalLoading from "./src/shared/components/loaders/GlobalLoading";

// React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Toast config (🔥 özel tasarım toast'lar)
import toastConfig from "./src/shared/components/toasts/toastConfig";

const queryClient = new QueryClient();

export default function App() {
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
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <I18nextProvider i18n={i18n}>
            <>
              <View style={{ flex: 1 }}>
                <RootNavigation />
                <CustomAlertWrapper />
                <GlobalLoading />
              </View>
              {/* Toast kesinlikle View dışına çıkmalı */}
              <Toast config={toastConfig} />
            </>

          </I18nextProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}
