import React, { useReducer, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import {
  Appbar,
  Provider as PaperProvider,
  Snackbar
} from "react-native-paper";
import uuid from "uuid";
import { ADD_TODO, DECR_ONE, INCR_ONE, REM_TODO } from "./actionTypes";
import Categories from "./components/Categories";
import Clock from "./components/Clock";
import Login from "./components/Login";
import ToDo from "./components/ToDo";
import { ICategory, IToDo } from "./interfaces";
import { taskReducer } from "./reducers";
import { LOCALSTORAGE_KEY_NAME } from "./constants";
const UNCATEGORIZED = "Uncategorized";
const exampleCats: ICategory[] = [
  { id: uuid.v4(), name: UNCATEGORIZED },
  { id: uuid.v4(), name: "Work" },
  { id: uuid.v4(), name: "Home" }
];
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

enum TABS {
  TODO,
  CATEGORIES,
  STATS,
  PROFILE
}

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem(LOCALSTORAGE_KEY_NAME)
  );
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [curPage, setPage] = useState(TABS.TODO);
  const [snackMsg, setSnackMsg] = useState("");

  const logoutApp = (msg?: string) => {
    if (isLoggedIn) {
      localStorage.removeItem(LOCALSTORAGE_KEY_NAME);
      setToken(localStorage.getItem(LOCALSTORAGE_KEY_NAME));
      setSnackMsg(msg || "Logged out");
    }
    setLoggedIn(false);
  };
  const loginApp = (token: string) => {
    localStorage.setItem(LOCALSTORAGE_KEY_NAME, token);
    setToken(localStorage.getItem(LOCALSTORAGE_KEY_NAME));
    setSnackMsg("Welcome");
  };

  const [cats, setCats] = useState(exampleCats);

  const [curTasks, taskDispatch] = useReducer(taskReducer, exampleTasks);

  // come to todo on login
  useEffect(() => {
    if (token) {
      setPage(TABS.TODO);
    }
  }, [token]);
  useEffect(() => {
    const token = localStorage.getItem(LOCALSTORAGE_KEY_NAME);
    if (!token && isLoggedIn) {
      logoutApp("Authorization error");
    }
    // setToken(localStorage.getItem(LOCALSTORAGE_KEY_NAME));
  });

  const addTask = (newTask: string, qty: number, category?: string) => {
    if (newTask === "") {
      setSnackMsg("Task cannot be empty!");
      return;
    }
    taskDispatch({
      type: ADD_TODO,
      payload: {
        id: uuid.v4(),
        title: newTask,
        category,
        remaining: qty
      }
    });
  };
  const addQtyToTask = (id: string) => {
    const taskToUpdate = curTasks.find(item => item.id === id);
    taskToUpdate && taskDispatch({ type: INCR_ONE, payload: taskToUpdate });
  };
  const remQtyFromTask = (id: string) => {
    const taskToUpdate = curTasks.find(item => item.id === id);
    if (taskToUpdate) {
      if (taskToUpdate.remaining === 1) {
        delTask(id);
        return;
      }
      taskDispatch({ type: DECR_ONE, payload: taskToUpdate });
    }
  };
  const delTask = (id: string): void => {
    if (curTasks.length === 1) {
      setSnackMsg("Cannot remove the final task!");
      return;
    }
    const taskToUpdate = curTasks.find(item => item.id === id);
    taskToUpdate && taskDispatch({ type: REM_TODO, payload: taskToUpdate });
  };

  const addCat = (name: string) => {
    if (name === "") {
      setSnackMsg("Category cannot be empty!");
      return;
    }
    setCats([{ id: uuid.v4(), name }, ...cats]);
  };
  const remCat = (id: string) => {
    if (cats.length === 1) {
      setSnackMsg("Cannot remove the final category!");
      return;
    }
    setCats(cats.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      {!token ? (
        <Login loginApp={loginApp} setErrMsg={setSnackMsg} />
      ) : (
        <View>
          <Appbar>
            <Appbar.Action
              icon="message-bulleted"
              onPress={() => setPage(TABS.TODO)}
            />
            <Appbar.Action
              icon="shape"
              onPress={() => setPage(TABS.CATEGORIES)}
            />
            <Appbar.Action
              icon="logout"
              onPress={() => logoutApp("Logged out")}
            />
          </Appbar>
          <Clock title={curTasks[0].title} category={curTasks[0].category} />
          {curPage === TABS.TODO && (
            <ToDo
              curTasks={curTasks}
              addQtyToTask={addQtyToTask}
              addTask={addTask}
              remQtyFromTask={remQtyFromTask}
              delTask={delTask}
              categories={cats}
              setSnackMsg={setSnackMsg}
            />
          )}
          {curPage === TABS.CATEGORIES && (
            <Categories
              categories={cats}
              addCategory={addCat}
              remCategory={remCat}
              setSnackMsg={setSnackMsg}
            />
          )}
        </View>
      )}
      <Snackbar visible={snackMsg !== ""} onDismiss={() => setSnackMsg("")}>
        {snackMsg}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "flex-start",
    alignContent: "flex-start"
  },
  nav: {
    flexDirection: "row",
    justifyContent: "center"
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 10
  }
});

export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}
