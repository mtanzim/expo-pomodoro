import React from "react";
import { StyleSheet, View } from "react-native";
import { DataTable, IconButton } from "react-native-paper";
import { IToDo } from "../../interfaces";
import { useTasks } from "../../hooks/useTasks";

const ToDoCompletedTable = () => {
  const { tasks, isLoading } = useTasks();
  if (isLoading) {
    return null;
  }
  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Task</DataTable.Title>
          <DataTable.Title>Category</DataTable.Title>
          <DataTable.Title numeric>Quantity</DataTable.Title>
        </DataTable.Header>
        {tasks &&
          tasks.map((task) => (
            <DataTable.Row key={task.id}>
              <DataTable.Cell>{task.name}</DataTable.Cell>
              <DataTable.Cell>{task.category?.name}</DataTable.Cell>
              <DataTable.Cell numeric>{task.remaining}</DataTable.Cell>
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
export default ToDoCompletedTable;
