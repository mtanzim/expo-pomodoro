import React, { useEffect, useReducer, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Appbar,
  Provider as PaperProvider,
  Snackbar,
} from "react-native-paper";
import uuid from "uuid";
import { ADD_TODO, DECR_ONE, INCR_ONE, REM_TODO } from "./actionTypes";
import Categories from "./components/Categories";
import Clock, { ClockTypes } from "./components/Clock";
import Login from "./components/Login";
import ToDo from "./components/ToDo/";
import { LOCALSTORAGE_KEY_NAME } from "./constants";
import { ICategory, IToDo } from "./interfaces";
import { taskReducer } from "./reducers";
import ToDoForm from "./components/ToDo/ToDoForm";

const UNCATEGORIZED = "Uncategorized";

const exampleTasks: IToDo[] = [
  {
    id: uuid.v4(),
    name: "trading-hub",
    remaining: 4,
  },
  {
    id: uuid.v4(),
    name: "trading-platform",
    remaining: 6,
  },
];

enum TABS {
  TODO,
  CATEGORIES,
  STATS,
  PROFILE,
}

const ClockDurations = new Map<ClockTypes, number>([
  [ClockTypes.WORK, 25 * 60],
  [ClockTypes.BREAK, 5 * 60],
]);

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem(LOCALSTORAGE_KEY_NAME)
  );
  const [curPage, setPage] = useState(TABS.TODO);
  const [snackMsg, setSnackMsg] = useState("");
  const [clockType, setClockType] = useState(ClockTypes.WORK);

  const toggleClockType = () => {
    setClockType((curClockType) =>
      curClockType === ClockTypes.WORK ? ClockTypes.BREAK : ClockTypes.WORK
    );
  };

  const logoutApp = () => {
    localStorage.removeItem(LOCALSTORAGE_KEY_NAME);
    setToken(localStorage.getItem(LOCALSTORAGE_KEY_NAME));
  };
  const loginApp = (token: string) => {
    localStorage.setItem(LOCALSTORAGE_KEY_NAME, token);
    setToken(localStorage.getItem(LOCALSTORAGE_KEY_NAME));
    setSnackMsg("Welcome");
  };

  const onSessionDone = () => {
    setSnackMsg(
      `${clockType === ClockTypes.WORK ? curTasks[0].name : "Break"} Completed!`
    );
    remQtyFromTask(curTasks[0].id);
    toggleClockType();
  };

  const [curTasks, taskDispatch] = useReducer(taskReducer, exampleTasks);

  // come to todo on login
  useEffect(() => {
    if (token) {
      setPage(TABS.TODO);
    }
  }, [token]);
  useEffect(() => {
    const token = localStorage.getItem(LOCALSTORAGE_KEY_NAME);
    if (!token) {
      logoutApp();
    }
  });

  const addTask = (newTask: string, qty: number, category?: ICategory) => {
    if (newTask === "") {
      setSnackMsg("Task cannot be empty!");
      return;
    }
    taskDispatch({
      type: ADD_TODO,
      payload: {
        id: uuid.v4(),
        name: newTask,
        category,
        remaining: qty,
      },
    });
  };
  const addQtyToTask = (id: string) => {
    const taskToUpdate = curTasks.find((item) => item.id === id);
    taskToUpdate && taskDispatch({ type: INCR_ONE, payload: taskToUpdate });
  };
  const remQtyFromTask = (id: string) => {
    const taskToUpdate = curTasks.find((item) => item.id === id);
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
    const taskToUpdate = curTasks.find((item) => item.id === id);
    taskToUpdate && taskDispatch({ type: REM_TODO, payload: taskToUpdate });
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
            <Appbar.Action icon="logout" onPress={logoutApp} />
          </Appbar>
          <Clock
            handleSessionDone={onSessionDone}
            clockType={clockType}
            duration={ClockDurations.get(clockType) || 25}
            title={curTasks[0].name}
            category={curTasks[0]?.category}
          />
          {curPage === TABS.TODO && (
            <ToDo
              setSnackMsg={setSnackMsg}
              addTask={addTask}
              curTasks={curTasks}
              addQtyToTask={addQtyToTask}
              remQtyFromTask={remQtyFromTask}
              delTask={delTask}
            />
          )}
          {curPage === TABS.CATEGORIES && (
            <Categories setSnackMsg={setSnackMsg} />
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
    alignContent: "flex-start",
  },
  nav: {
    flexDirection: "row",
    justifyContent: "center",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
});

export default function Main() {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}
