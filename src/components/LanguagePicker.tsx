import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet } from "react-native";
import { useI18n } from "i18n/i18n";

const LanguagePicker: React.FC = () => {
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
};

export default LanguagePicker;

const styles = StyleSheet.create({
  langPicker: {
    width: 96,
  },
});
