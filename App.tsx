import React, { useState, useReducer } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Clock from "./components/Clock";
import ToDo from "./components/ToDo";
import Login from "./components/Login";

import { ICategory, IToDo } from "./interfaces";
import { ADD_TODO, DECR_ONE, INCR_ONE, REM_TODO } from "./actionTypes";
import { taskReducer } from "./reducers";
import uuid from "uuid";

const exampleTasks: IToDo[] = [
  {
    id: uuid.v4(),
    category: "day-job",
    title: "trading-hub",
    remaining: 4
  },
  {
    id: uuid.v4(),
    category: "day-job",
    title: "trading-platform",
    remaining: 6
  }
];

const UNCATEGORIZED = "Uncategorized";
const exampleCats: ICategory[] = [
  { id: uuid.v4(), name: UNCATEGORIZED },
  { id: uuid.v4(), name: "Work" },
  { id: uuid.v4(), name: "Home" },
  { id: uuid.v4(), name: "TTC" },
  { id: uuid.v4(), name: "Car" },
  { id: uuid.v4(), name: "Berlin" }
];

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
  const [curTasks, taskDispatch] = useReducer(taskReducer, exampleTasks);
  const addTask = (newTask:string, category:string) => {
    taskDispatch({
      type: ADD_TODO,
      payload: {
        id: uuid.v4(),
        title: newTask,
        category,
        remaining: 1
      }
    });
  };
  const addQtyToTask = (id: string) => {
    const taskToUpdate = curTasks.find(item => item.id === id);
    taskToUpdate && taskDispatch({ type: INCR_ONE, payload: taskToUpdate });
  };
  const remQtyFromTask = (id: string) => {
    const taskToUpdate = curTasks.find(item => item.id === id);
    taskToUpdate && taskDispatch({ type: DECR_ONE, payload: taskToUpdate });
  };
  const delTask = (id: string) => {
    const taskToUpdate = curTasks.find(item => item.id === id);
    taskToUpdate && taskDispatch({ type: REM_TODO, payload: taskToUpdate });
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
            <ToDo addQtyToTask={addQtyToTask} addTask={addTask} remQtyFromTask={remQtyFromTask} delTask={delTask} />
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
