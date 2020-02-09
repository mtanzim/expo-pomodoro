import React, { useReducer, useState } from "react";
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

const LOCALSTORAGE_KEY_NAME = "pomodoro-app-token";
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
  const [curPage, setPage] = useState(TABS.TODO);
  const [snackMsg, setSnackMsg] = useState("");

  const logoutApp = () => {
    localStorage.removeItem(LOCALSTORAGE_KEY_NAME);
    setToken(localStorage.getItem(LOCALSTORAGE_KEY_NAME));
    setSnackMsg("Logged out")
  };
  const loginApp = (token: string) => {
    localStorage.setItem(LOCALSTORAGE_KEY_NAME, token);
    setToken(localStorage.getItem(LOCALSTORAGE_KEY_NAME));
    setSnackMsg("Welcome")
  };

  const [cats, setCats] = useState(exampleCats);

  const [curTasks, taskDispatch] = useReducer(taskReducer, exampleTasks);
  const addTask = (newTask: string, category: string) => {
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
      {false ? (
        <Login loginApp={loginApp} />
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
            <Appbar.Action icon="logout" onPress={logoutApp} />
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
            />
          )}
          {curPage === TABS.CATEGORIES && (
            <Categories
              categories={cats}
              addCategory={addCat}
              remCategory={remCat}
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
    alignItems: "center",
    justifyContent: "center"
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
