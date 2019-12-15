import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Clock from "./components/Clock";
import ToDo from "./components/ToDo";

export default function App() {
  return (
    <React.Fragment>
      <View style={styles.container}>
      <Clock/>
      <ToDo/>
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
