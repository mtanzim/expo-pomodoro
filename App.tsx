import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Clock from "./components/Clock";
import ToDo from "./components/ToDo";
import Login from "./components/Login";

export const LOCALSTORAGE_KEY_NAME = "pomodoro-app-token";

export default function App() {
  const [token, setToken] = useState(
    localStorage.getItem(LOCALSTORAGE_KEY_NAME)
  );
  const logoutApp = () => {
    localStorage.removeItem(LOCALSTORAGE_KEY_NAME);
    setToken(localStorage.getItem(LOCALSTORAGE_KEY_NAME));
  };
  const loginApp = (token: string) => {
    localStorage.setItem(LOCALSTORAGE_KEY_NAME, token);
    setToken(localStorage.getItem(LOCALSTORAGE_KEY_NAME));
  };
  return (
    <React.Fragment>
      <View style={styles.container}>
        {token === null ? (
          <Login loginApp={loginApp} />
        ) : (
          <React.Fragment>
            <Button title="Log out" onPress={logoutApp} />
            <Clock />
            <ToDo />
          </React.Fragment>
        )}
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
