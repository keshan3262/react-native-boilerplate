import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet } from "react-native";
import { Router, Scene } from "react-native-router-flux";
import Home from "pages/Home";
import About from "pages/About";
import { useI18n } from "i18n/i18n";

export default function Routes() {
  return (
    <Router>
      <Scene key="root">
        <Scene
          key="home"
          component={Home}
          title="Home"
          initial={true}
          renderRightButton={LanguagePicker}
        />
        <Scene key="about" component={About} title="About" />
      </Scene>
    </Router>
  );
}

function LanguagePicker() {
  const { locale, setLocale } = useI18n();

  return (
    <Picker
      selectedValue={locale}
      style={styles.langPicker}
      onValueChange={setLocale}
    >
      <Picker.Item label="EN" value="en" />
      <Picker.Item label="RU" value="ru" />
    </Picker>
  );
}

const styles = StyleSheet.create({
  langPicker: {
    width: 72,
  },
});
