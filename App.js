import { Provider } from "react-redux";
import RootNavigation from "./src/app/navigation/rootNavigation";
import { I18nextProvider } from "react-i18next";
import React, { useEffect } from "react";
import i18n from './src/shared/locales/i18n';
import CustomAlertWrapper from "./src/shared/components/alerts/CustomAlertWrapper";
import { store } from "./src/app/store";


export default function App() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <>
        <RootNavigation />
        <CustomAlertWrapper />
        </>
      </I18nextProvider>
    </Provider>
  );
}
