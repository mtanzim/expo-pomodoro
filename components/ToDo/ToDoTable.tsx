import React from "react";
import { StyleSheet, View } from "react-native";
import { DataTable, IconButton } from "react-native-paper";
import { IToDo } from "../../interfaces";

export interface ToDoProps {
  curTasks: IToDo[];
  addQtyToTask: (id: string) => void;
  remQtyFromTask: (id: string) => void;
  delTask: (id: string) => void;
}

const ToDoTable = ({
  curTasks,
  addQtyToTask,
  remQtyFromTask,
  delTask,
}: ToDoProps) => {
  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Task</DataTable.Title>
          <DataTable.Title>Category</DataTable.Title>
          <DataTable.Title numeric>Remaining</DataTable.Title>
          <DataTable.Title numeric>{""}</DataTable.Title>
          <DataTable.Title numeric>{""}</DataTable.Title>
          <DataTable.Title numeric>{""}</DataTable.Title>
        </DataTable.Header>
        {curTasks.map((task) => (
          <DataTable.Row key={task.id}>
            <DataTable.Cell>{task.name}</DataTable.Cell>
            <DataTable.Cell>{task.category?.name}</DataTable.Cell>
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
    width: "90%",
    alignSelf: "center",
    marginBottom: 20,
  },
});
export default ToDoTable;
