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
import { IToDo, ICategory } from "../interfaces";

const UNCATEGORIZED = "Uncategorized";
const exampleCats: ICategory[] = [
  { id: uuid.v4(), name: UNCATEGORIZED },
  { id: uuid.v4(), name: "Work" },
  { id: uuid.v4(), name: "Home" },
  { id: uuid.v4(), name: "TTC" },
  { id: uuid.v4(), name: "Car" },
  { id: uuid.v4(), name: "Berlin" }
];

interface Props {
  curTasks: IToDo[];
  addQtyToTask: (id: string) => void;
  remQtyFromTask: (id: string) => void;
  delTask: (id: string) => void;
  addTask: (newTask: string, category: string) => void;
}

const ToDo = ({
  curTasks,
  addQtyToTask,
  remQtyFromTask,
  delTask,
  addTask
}: Props) => {
  const [newTask, setNewTask] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ICategory>(
    exampleCats[0]
  );

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
        <Button
          onPress={() => addTask(newTask, selectedCategory.name)}
          title={"Add Task"}
        ></Button>
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
