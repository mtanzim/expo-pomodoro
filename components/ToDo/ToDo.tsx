import React from "react";
import { StyleSheet, View } from "react-native";
import { Title } from "react-native-paper";
import ToDoCompletedTable from "./ToDoCompletedTable";
import ToDoForm, { ToDoFormProps } from "./ToDoForm";
import ToDoTable, { ToDoProps } from "./ToDoTable";

const ToDo = ({
  setSnackMsg,
  addTask,
  curTasks,
  addQtyToTask,
  remQtyFromTask,
  delTask,
}: ToDoFormProps & ToDoProps) => (
  <View style={styles.container}>
    <ToDoForm setSnackMsg={setSnackMsg} addTask={addTask} />
    <Title>To Do List</Title>
    <ToDoTable
      curTasks={curTasks}
      addQtyToTask={addQtyToTask}
      remQtyFromTask={remQtyFromTask}
      delTask={delTask}
    />
    <Title>Completed</Title>
    <ToDoCompletedTable />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
  },
});

export default ToDo;
