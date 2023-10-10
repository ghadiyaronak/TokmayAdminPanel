import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

// datepicker
import { registerLocale } from "react-datepicker";
import ja from "date-fns/locale/ja";
registerLocale("ja", ja);

// redux store

import { Provider } from "react-redux";
import { store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const persistor = persistStore(store);

// chakra-ui

import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/config";
import "./index.css";
import addAuthTokenInterceptor from "./apiConfig/addauthtokeninterceptor";
import Router from "./Router";
import theme from "./theme/theme";

addAuthTokenInterceptor(store);

const ChakraApp = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <I18nextProvider i18n={i18n}>
                    <ChakraProvider theme={theme}>
                        <Router />
                    </ChakraProvider>
                </I18nextProvider>
            </BrowserRouter>
        </PersistGate>
    </Provider>
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<ChakraApp />);
