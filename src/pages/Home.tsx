import React, { useCallback } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Actions } from "react-native-router-flux";
import tailwind from "tailwind-rn";
import SignUpForm, { SignUpFormValues } from "layouts/SignUpForm";
import LanguagePicker from "components/LanguagePicker";

export default function Home() {
  const goToAbout = useCallback(() => {
    Actions.about();
  }, []);

  const handleSubmit = useCallback((values: SignUpFormValues) => {
    alert(JSON.stringify(values));
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LanguagePicker />
      <Text style={tailwind("text-xl")}>
        Open up App.tsx to start (or not) working on your app!
      </Text>
      <View>
        <SignUpForm onSubmit={handleSubmit} />
      </View>
      <View>
        <Button onPress={goToAbout} title="About" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 16,
  },
});
