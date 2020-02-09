import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Chip,
  DataTable,
  IconButton,
  Menu,
  TextInput
} from "react-native-paper";
import { ICategory, IToDoProps } from "../interfaces";

const ToDo = ({
  curTasks,
  categories,
  addQtyToTask,
  remQtyFromTask,
  delTask,
  addTask
}: IToDoProps) => {
  const [newTask, setNewTask] = useState("");
  const [catVisible, setCatVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory>(
    categories[0]
  );


  const pickCat = (id: string) => {
    setSelectedCategory(categories.find(cat => cat.id === id) || categories[0]);
    setCatVisible(false);
  };

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          placeholder="New Task"
          value={newTask}
          onChangeText={text => setNewTask(text)}
        />

        <Menu
          visible={catVisible}
          onDismiss={() => setCatVisible(false)}
          anchor={
            <Chip icon="chevron-down" onPress={() => setCatVisible(true)}>
              {selectedCategory.name}
            </Chip>
          }
        >
          {categories.map(item => (
            <Menu.Item onPress={() => pickCat(item.id)} title={item.name} />
          ))}
        </Menu>
        <IconButton
          icon="flag-plus"
          onPress={() => addTask(newTask, selectedCategory.name)}
        />
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
              <IconButton icon="plus" onPress={() => addQtyToTask(task.id)} />
            </DataTable.Cell>
            <DataTable.Cell>
              <IconButton
                icon="minus"
                onPress={() => remQtyFromTask(task.id)}
              />
            </DataTable.Cell>
            <DataTable.Cell>
              <IconButton icon="delete" onPress={() => delTask(task.id)} />
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
