import React, { useEffect } from "react";
import { StyleSheet, View, Task } from "react-native";
import { DataTable, IconButton } from "react-native-paper";
import { IToDo, IFaveToDo, ICategory } from "../../interfaces";
import { useFaveTasks } from "../../hooks/useFaveTasks";

interface ToDoFavesTableProps {
  tasks: IFaveToDo[];
  remTask: (id: string) => void;
  addTaskToToDo: (newTask: string, qty: number, category?: ICategory) => void;
  setSnackMsg: (msg: string) => void;
}

const ToDoFavesTable = ({
  tasks,
  remTask,
  addTaskToToDo,
  setSnackMsg,
}: ToDoFavesTableProps) => {
  const addTasksToApp = (task: IFaveToDo) => {
    const { name, category } = task;
    addTaskToToDo(name, 1, category);
    setSnackMsg("Added task to the To Do List");
  };

  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Task</DataTable.Title>
          <DataTable.Title>Category</DataTable.Title>
          <DataTable.Title numeric>{""}</DataTable.Title>
          <DataTable.Title numeric>{""}</DataTable.Title>
        </DataTable.Header>
        {tasks &&
          tasks.map((task) => (
            <DataTable.Row key={task.id}>
              <DataTable.Cell>{task.name}</DataTable.Cell>
              <DataTable.Cell>{task.category?.name}</DataTable.Cell>
              <DataTable.Cell>
                <IconButton icon="plus" onPress={() => addTasksToApp(task)} />
              </DataTable.Cell>
              <DataTable.Cell>
                <IconButton icon="delete" onPress={() => remTask(task.id)} />
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
    width: "90%",
    alignSelf: "center",
  },
});
export default ToDoFavesTable;
