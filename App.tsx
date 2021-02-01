import React from "react";
import { AppRegistry } from "react-native";
import Routes from "./src/Routes";

export default function App() {
  return <Routes />;
}

AppRegistry.registerComponent("App", () => App);
