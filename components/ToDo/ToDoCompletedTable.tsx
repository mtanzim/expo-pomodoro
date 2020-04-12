import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { DataTable, IconButton, ActivityIndicator } from "react-native-paper";
import { IToDo } from "../../interfaces";
import { useTasks } from "../../hooks/useTasks";

const padZero = (val: number): string => {
  let sVal = String(val);
  if (val < 10) {
    return `0${sVal}`;
  }
  return sVal;
};

const parseDate = (d: string): string => {
  const date = new Date(d);
  return `${padZero(date.getHours())}:${padZero(date.getMinutes())}`;
};

interface ToDoCompletedTableProps {
  setSnackMsg: (msg: string) => void;
  isWorking?: boolean;
}

const ToDoCompletedTable = ({
  setSnackMsg,
  isWorking,
}: ToDoCompletedTableProps) => {
  // pass is working down from another component to ensure data is fetched again!
  const { tasks, isLoading, remTask } = useTasks(
    setSnackMsg,
    setSnackMsg,
    isWorking
  );
  if (isLoading) {
    return <ActivityIndicator animating />;
  }
  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Task</DataTable.Title>
          <DataTable.Title>Category</DataTable.Title>
          <DataTable.Title numeric>Duration (m)</DataTable.Title>
          <DataTable.Title numeric>Completed</DataTable.Title>
          <DataTable.Title>{""}</DataTable.Title>
        </DataTable.Header>
        {tasks &&
          tasks.map((task) => (
            <DataTable.Row key={task.id}>
              <DataTable.Cell>{task.name}</DataTable.Cell>
              <DataTable.Cell>{task.category?.name}</DataTable.Cell>
              <DataTable.Cell numeric>
                {Math.floor(task.duration / 60)}
              </DataTable.Cell>
              <DataTable.Cell numeric>{parseDate(task.created)}</DataTable.Cell>
              <DataTable.Cell>
                <IconButton
                  icon="delete"
                  onPress={async () => await remTask(task.id)}
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
    width: "90%",
    alignSelf: "center",
  },
});
export default ToDoCompletedTable;
