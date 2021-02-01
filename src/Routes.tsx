import React from "react";
import { Router, Scene } from "react-native-router-flux";
import Home from "pages/Home";
import About from "pages/About";

export default function Routes() {
  return (
    <Router>
      <Scene key="root">
        <Scene key="home" component={Home} title="Home" initial={true} />
        <Scene key="about" component={About} title="About" />
      </Scene>
    </Router>
  );
}
