import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Clock from "./components/Clock";

export default function App() {
  return (
    <React.Fragment>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
      </View>
      <Clock/>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
