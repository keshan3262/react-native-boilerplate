import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, BackHandler } from "react-native";
import { Actions, Reducer, Router, Scene } from "react-native-router-flux";
import Home from "pages/Home";
import About from "pages/About";
import { useI18n } from "i18n/i18n";

export default function Routes() {
  const [isReady, setIsReady] = useState(false);
  const { loading: localesLoading } = useI18n();

  useEffect(() => {
    if (!localesLoading) {
      setIsReady(true);
      SplashScreen.hideAsync().catch(console.warn);
    }
  }, [localesLoading]);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync().catch(console.warn);
  }, []);

  if (!isReady) {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../assets/noodles.png")} />
      </View>
    );
  }

  return (
    <Router createReducer={reducerCreate}>
      <Scene key="root">
        <Scene key="home" component={Home} title="Home" initial={true} />
        <Scene key="about" component={About} title="About" />
      </Scene>
    </Router>
  );
}

const reducerCreate = (params: any) => {
  const defaultReducer = new Reducer(params);

  return (state, action) => {
    if (action.type === "Navigation/BACK" && state.index === 0) {
      BackHandler.exitApp();
    }
    return defaultReducer(state, action);
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FEF9B0",
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 240,
    height: 240,
  },
});
