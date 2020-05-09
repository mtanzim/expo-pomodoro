import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Switch, Title } from "react-native-paper";
import ToDoCompletedTable from "./ToDoCompletedTable";
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
}: ToDoProps) => {
  const [isToDo, setIsToDo] = useState(true);

  const renderInner = () => {
    if (isToDo) {
      return (
        <>
          <Title>To Do</Title>
          <ToDoTable
            curTasks={curTasks}
            addQtyToTask={addQtyToTask}
            remQtyFromTask={remQtyFromTask}
            delTask={delTask}
          />
        </>
      );
    }

    return (
      <>
        <Title>Completed</Title>
        <ToDoCompletedTable isWorking={isWorking} setSnackMsg={setSnackMsg} />
      </>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Switch value={isToDo} onValueChange={() => setIsToDo((cur) => !cur)} />
        {renderInner()}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
  },
});

export default ToDo;
