import React, { useReducer, useState } from "react";
import { Button, StyleSheet, View, Text } from "react-native";
import uuid from "uuid";
import { ADD_TODO, DECR_ONE, INCR_ONE, REM_TODO } from "./actionTypes";
import Clock from "./components/Clock";
import Login from "./components/Login";
import ToDo from "./components/ToDo";
import Categories from "./components/Categories";
import { IToDo, ICategory } from "./interfaces";
import { taskReducer } from "./reducers";
import { Provider as PaperProvider } from "react-native-paper";

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
  const logoutApp = () => {
    localStorage.removeItem(LOCALSTORAGE_KEY_NAME);
    setToken(localStorage.getItem(LOCALSTORAGE_KEY_NAME));
  };
  const loginApp = (token: string) => {
    localStorage.setItem(LOCALSTORAGE_KEY_NAME, token);
    setToken(localStorage.getItem(LOCALSTORAGE_KEY_NAME));
  };

  const [cats, setCats] = useState(exampleCats);

  const [curTasks, taskDispatch] = useReducer(taskReducer, exampleTasks);
  const addTask = (newTask: string, category: string) => {
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
    if (curTasks.length === 1)
      // throw new Error("Not allowed to remove last task");
      return;
    const taskToUpdate = curTasks.find(item => item.id === id);
    taskToUpdate && taskDispatch({ type: REM_TODO, payload: taskToUpdate });
  };

  const addCat = (name: string) => {
    console.log(`Adding category ${name}`);
    setCats([{ id: uuid.v4(), name }, ...cats]);
  };
  const remCat = (id: string) => {
    if (cats.length === 1)
      throw new Error("Not allowed to remove last category");
    console.log(`Removing category ${id}`);
    setCats(cats.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      {token === null ? (
        <Login loginApp={loginApp} />
      ) : (
        <View>
          {/* Navbar */}
          <View style={styles.nav}>
            <Button title="Tomoto" onPress={() => setPage(TABS.TODO)} />
            <Button
              title="Categories"
              onPress={() => setPage(TABS.CATEGORIES)}
            />
            <Button title="Log out" onPress={logoutApp} />
          </View>
          {/* Logged in app content */}
          <View>
            {curPage === TABS.TODO && (
              <>
                <Clock
                  title={curTasks[0].title}
                  category={curTasks[0].category}
                />
                <ToDo
                  curTasks={curTasks}
                  addQtyToTask={addQtyToTask}
                  addTask={addTask}
                  remQtyFromTask={remQtyFromTask}
                  delTask={delTask}
                  categories={cats}
                />
              </>
            )}
            {curPage === TABS.CATEGORIES && (
              <Categories
                categories={cats}
                addCategory={addCat}
                remCategory={remCat}
              />
            )}
          </View>
        </View>
      )}
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
    justifyContent: "space-around"
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