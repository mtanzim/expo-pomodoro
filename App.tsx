import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Clock from "./components/Clock";

export default function App() {
  return (
    <React.Fragment>
      <View style={styles.container}>
      <Clock/>
      </View>
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
