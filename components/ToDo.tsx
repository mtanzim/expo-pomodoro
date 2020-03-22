import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Chip,
  DataTable,
  IconButton,
  Menu,
  TextInput
} from "react-native-paper";
import { useCategories } from "../hooks/useCategories";
import { ICategory, IToDoProps } from "../interfaces";

const ToDo = ({
  curTasks,
  addQtyToTask,
  remQtyFromTask,
  delTask,
  addTask,
  setSnackMsg
}: IToDoProps) => {
  const { categories } = useCategories(setSnackMsg, setSnackMsg);
  const [newTask, setNewTask] = useState("");
  const [catVisible, setCatVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );

  const [qtyTasksToAdd, setQtyTasksToAdd] = useState(1);

  const pickCat = (id: string) => {
    setSelectedCategory(categories.find(cat => cat.id === id) || categories[0]);
    setCatVisible(false);
  };

  const addTaskAndClear = () => {
    selectedCategory && addTask(newTask, selectedCategory.name, qtyTasksToAdd);
    setNewTask("");
    setQtyTasksToAdd(1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tableContainer}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Task</DataTable.Title>
            <DataTable.Title>Category</DataTable.Title>
            <DataTable.Title numeric>Remaining</DataTable.Title>
            <DataTable.Title numeric>{""}</DataTable.Title>
            <DataTable.Title numeric>{""}</DataTable.Title>
            <DataTable.Title numeric>{""}</DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>
              <TextInput
                mode="outlined"
                style={styles.textInput}
                dense
                placeholder="New Task"
                value={newTask}
                onChangeText={text => setNewTask(text)}
              />
            </DataTable.Cell>
            <DataTable.Cell>
              <Menu
                visible={catVisible}
                onDismiss={() => setCatVisible(false)}
                anchor={
                  <Chip
                    style={styles.chip}
                    mode="outlined"
                    icon="chevron-down"
                    onPress={() => setCatVisible(true)}
                  >
                    {selectedCategory && selectedCategory.name}
                  </Chip>
                }
              >
                {categories.map(item => (
                  <Menu.Item
                    onPress={() => pickCat(item.id)}
                    title={item.name}
                  />
                ))}
              </Menu>
            </DataTable.Cell>
            <DataTable.Cell numeric>{qtyTasksToAdd}</DataTable.Cell>
            <DataTable.Cell>
              <IconButton
                icon="plus"
                onPress={() => setQtyTasksToAdd(qtyTasksToAdd + 1)}
              />
            </DataTable.Cell>
            <DataTable.Cell>
              <IconButton
                icon="minus"
                onPress={() =>
                  setQtyTasksToAdd(qtyTasksToAdd === 1 ? 1 : qtyTasksToAdd - 1)
                }
              />
            </DataTable.Cell>
            <DataTable.Cell>
              <IconButton icon="flag-plus" onPress={addTaskAndClear} />
            </DataTable.Cell>
          </DataTable.Row>
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
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "50%",
    // flexDirection: "row",
    alignSelf: "center"
  },
  textInput: {
    width: "80%",
    marginRight: 2,
    marginBottom: 4
  },
  chip: {
    width: "80%"
  },
  tableContainer: {
    flex: 1
  }
});
export default ToDo;
