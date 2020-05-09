import React from "react";
import { StyleSheet, View } from "react-native";
import { Title, Surface } from "react-native-paper";
import ToDoCompletedTable from "./ToDoCompletedTable";
import ToDoForm, { ToDoFormProps } from "./ToDoForm";
import ToDoTable, { ToDoTableProps } from "./ToDoTable";

interface ToDoProps extends ToDoTableProps {
  setSnackMsg: (msg: string) => void;
}

const ToDo = ({
  curTasks,
  addQtyToTask,
  remQtyFromTask,
  delTask,
  isWorking,
  setSnackMsg,
}: ToDoProps) => (
  <View style={styles.container}>
    <Title>To Do List</Title>
    <ToDoTable
      curTasks={curTasks}
      addQtyToTask={addQtyToTask}
      remQtyFromTask={remQtyFromTask}
      delTask={delTask}
    />

    <Title>Completed</Title>
    <ToDoCompletedTable isWorking={isWorking} setSnackMsg={setSnackMsg} />
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
