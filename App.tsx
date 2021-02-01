import React from "react";
import { AppRegistry } from "react-native";
import Routes from "./src/Routes";
import { I18nContextProvider } from "i18n/i18n";

export default function App() {
  return (
    <I18nContextProvider>
      <Routes />
    </I18nContextProvider>
  );
}

AppRegistry.registerComponent("App", () => App);
