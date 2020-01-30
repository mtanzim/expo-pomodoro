import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Switch,
  TextInput
} from "react-native";
import { login, register } from "../services";

enum PageStates {
  LOGIN = "Log in",
  REGISTER = "Register"
}

interface IProps {
  loginApp: (token: string) => void;
}

const Login = (props: IProps) => {
  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");
  const [verPass, serVerPass] = useState("");
  const [pageState, setPageState] = useState(PageStates.LOGIN);
  const [errMsg, setErrMsg] = useState<null | string>(null);

  const resetStates = () => {
    setUsername("");
    setPass("");
    serVerPass("");
    // setErrMsg(null);
  };

  const handleSubmit = async () => {
    const authMsg =
      pageState === PageStates.LOGIN
        ? await login(username, password)
        : await register(username, password, verPass);
    if (authMsg.token) props.loginApp(authMsg.token);
    if (authMsg.message) setErrMsg(authMsg.message);
    resetStates();
  };
  const togglePageState = (_newVal: boolean) => {
    pageState === PageStates.LOGIN
      ? setPageState(PageStates.REGISTER)
      : setPageState(PageStates.LOGIN);
  };

  return (
    <View>
      <Switch
        value={pageState === PageStates.REGISTER}
        onValueChange={togglePageState}
      />
      <Text>{pageState}</Text>
      <TextInput
        placeholder={"Username"}
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        secureTextEntry
        placeholder={"Password"}
        value={password}
        onChangeText={text => setPass(text)}
      />
      {pageState === PageStates.REGISTER && (
        <TextInput
          secureTextEntry
          placeholder={"Verify Password"}
          value={verPass}
          onChangeText={text => serVerPass(text)}
        />
      )}
      <Button onPress={handleSubmit} title={pageState}></Button>
      {errMsg && <Text>{errMsg}</Text>}
    </View>
  );
};

export default Login;
