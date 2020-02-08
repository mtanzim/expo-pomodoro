import React, { useState } from "react";
import {
  FlatList,
  Picker,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import uuid from "uuid";
import { ICategory, IToDoProps } from "../interfaces";
import { DataTable, Button } from "react-native-paper";
import ToDoItem from "./ToDoItem";

const ToDo = ({
  curTasks,
  categories,
  addQtyToTask,
  remQtyFromTask,
  delTask,
  addTask
}: IToDoProps) => {
  const [newTask, setNewTask] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ICategory>(
    categories[0]
  );

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          placeholder={"New Task"}
          value={newTask}
          onChangeText={text => setNewTask(text)}
        />
        <Picker
          selectedValue={selectedCategory.name}
          style={{ height: 50, width: 200 }}
          onValueChange={itemValue =>
            setSelectedCategory({ id: itemValue.id, name: itemValue })
          }
        >
          {categories.map(item => (
            <Picker.Item label={item.name} value={item.name} />
          ))}
          )}>
        </Picker>
        <Button onPress={() => addTask(newTask, selectedCategory.name)}>
          Add Task
        </Button>
      </View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Task</DataTable.Title>
          <DataTable.Title>Category</DataTable.Title>
          <DataTable.Title numeric>Remaining</DataTable.Title>
          <DataTable.Title numeric>{""}</DataTable.Title>
          <DataTable.Title numeric>{""}</DataTable.Title>
          <DataTable.Title numeric>{""}</DataTable.Title>
        </DataTable.Header>
        {curTasks.map(task => (
          <DataTable.Row>
            <DataTable.Cell>{task.title}</DataTable.Cell>
            <DataTable.Cell>{task.category}</DataTable.Cell>
            <DataTable.Cell numeric>{task.remaining}</DataTable.Cell>
            <DataTable.Cell>
              <Button
                icon="plus"
                onPress={() => addQtyToTask(task.id)}
                children={""}
              />
            </DataTable.Cell>
            <DataTable.Cell>
              <Button
                icon="minus"
                onPress={() => remQtyFromTask(task.id)}
                children={""}
              />
            </DataTable.Cell>
            <DataTable.Cell>
              <Button
                icon="delete"
                onPress={() => delTask(task.id)}
                children={""}
              />
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
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
  },
  actionCell: {
    flex: 1,
    flexDirection: "row",
    overflow: "visible",
    width: 400
  }
});
export default ToDo;
