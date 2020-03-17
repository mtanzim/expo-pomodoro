import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Switch,
  TextInput
} from "react-native";
import { AuthRequests } from "../services/Authentication";
const authRequests = new AuthRequests();

enum PageStates {
  LOGIN = "Log in",
  REGISTER = "Register"
}

interface IProps {
  loginApp: (token: string) => void;
  setErrMsg: (msg: string) => void;
}

const Login = ({ setErrMsg, loginApp }: IProps) => {
  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");
  const [verPass, serVerPass] = useState("");
  const [pageState, setPageState] = useState(PageStates.LOGIN);
  // const [errMsg, setErrMsg] = useState<null | string>(null);

  const resetStates = () => {
    setUsername("");
    setPass("");
    serVerPass("");
    // setErrMsg(null);
  };

  const handleSubmit = async () => {
    try {
      const authMsg =
        pageState === PageStates.LOGIN
          ? await authRequests.login(username, password)
          : await authRequests.register(username, password, verPass);
      if (authMsg.token) loginApp(authMsg.token);
      if (authMsg.message) setErrMsg(authMsg.message);
      resetStates();
    } catch (err) {
      setErrMsg(err.message);
    }
  };
  const togglePageState = (_newVal: boolean) => {
    pageState === PageStates.LOGIN
      ? setPageState(PageStates.REGISTER)
      : setPageState(PageStates.LOGIN);
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "20%",
    // flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center"
  }
});

export default Login;
