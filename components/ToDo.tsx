import React, { useState, useReducer } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  FlatList,
  TextInput,
  Picker
} from "react-native";
import uuid from "uuid";
import ToDoItem from "./ToDoItem";
import { ICategory, IToDo } from "../interfaces";
import { ADD_TODO, DECR_ONE, INCR_ONE, REM_TODO } from "../actionTypes";
import { taskReducer } from "../reducers";

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

const ToDo = () => {
  const [curTasks, taskDispatch] = useReducer(taskReducer, exampleTasks);
  const [newTask, setNewTask] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ICategory>(
    exampleCats[0]
  );
  const addTask = () => {
    taskDispatch({
      type: ADD_TODO,
      payload: {
        id: uuid.v4(),
        title: newTask,
        category: selectedCategory.name,
        remaining: 1
      }
    });
    setNewTask("");
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
    <View>
      <Text>To Do List</Text>
      <View style={styles.container}>
        <TextInput
          placeholder={"New Task"}
          value={newTask}
          onChangeText={text => setNewTask(text)}
        />
        <Picker
          selectedValue={selectedCategory?.name}
          style={{ height: 50, width: 200 }}
          onValueChange={itemValue =>
            setSelectedCategory({ id: itemValue.id, name: itemValue })
          }
        >
          {exampleCats.map(item => (
            <Picker.Item label={item.name} value={item.name} />
          ))}
          )}>
        </Picker>
        <Button onPress={addTask} title={"Add Task"}></Button>
      </View>
      <FlatList
        data={curTasks}
        renderItem={({ item }) => (
          <ToDoItem
            addOne={() => addQtyToTask(item.id)}
            remOne={() => remQtyFromTask(item.id)}
            delTask={delTask}
            toDo={item}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
export default ToDo;
