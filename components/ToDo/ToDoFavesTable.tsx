import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { DataTable, IconButton } from "react-native-paper";
import { IToDo, IFaveToDo } from "../../interfaces";
import { useFaveTasks } from "../../hooks/useFaveTasks";

interface ToDoFavesTableProps {
  tasks: IFaveToDo[];
  remTask: (id: string) => void;
}

const ToDoFavesTable = ({ tasks, remTask }: ToDoFavesTableProps) => {
  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Task</DataTable.Title>
          <DataTable.Title>Category</DataTable.Title>
          <DataTable.Title numeric>{""}</DataTable.Title>
        </DataTable.Header>
        {tasks &&
          tasks.map((task) => (
            <DataTable.Row key={task.id}>
              <DataTable.Cell>{task.name}</DataTable.Cell>
              <DataTable.Cell>{task.category?.name}</DataTable.Cell>
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
    marginTop: 40,
  },
});
export default ToDoFavesTable;
