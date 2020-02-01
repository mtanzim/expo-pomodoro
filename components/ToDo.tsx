import React, { useState, useEffect } from "react";
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
import { IToDo, ICategory } from "../interfaces";



const ToDo = ({defaultTasks, defaultCats}) => {
  const [curTasks, setCurTasks] = useState(defaultTasks);
  const [newTask, setNewTask] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ICategory>(
    defaultCats[0]
  );
  const addTask = () => {
    setCurTasks([
      {
        id: uuid.v4(),
        title: newTask,
        category: selectedCategory.name,
        remaining: 1
      },
      ...curTasks
    ]);
    setNewTask("");
  };
  const addQtyToTask = (factor: number) => (id: string) => {
    setCurTasks(
      curTasks.map((item: IToDo) => {
        if (item.id === id) {
          return {
            ...item,
            remaining: item.remaining + factor > 1 ? item.remaining + factor : 1
          };
        }
        return item;
      })
    );
  };
  const delTask = (id: string) =>
    setCurTasks(curTasks.filter((item: IToDo) => item.id !== id));

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
          {defaultCats.map(item => (
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
            addOne={addQtyToTask(1)}
            remOne={addQtyToTask(-1)}
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
