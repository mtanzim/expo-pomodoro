import React from "react";
import { StyleSheet, View } from "react-native";
import { Title } from "react-native-paper";
import { useFaveTasks } from "../../hooks/useFaveTasks";
import { ICategory } from "../../interfaces";
import ToDoFavesTable from "./ToDoFavesTable";
import ToDoForm from "./ToDoForm";

interface ToDoFavesProps {
  setSnackMsg: (msg: string) => void;
  addTaskToToDo: (newTask: string, qty: number, category?: ICategory) => void;
}

const ToDoFaves = ({ setSnackMsg, addTaskToToDo }: ToDoFavesProps) => {
  const { addTask: addFaveTask, remTask, tasks } = useFaveTasks(
    setSnackMsg,
    setSnackMsg
  );

  return (
    <View style={styles.container}>
      <ToDoForm setSnackMsg={setSnackMsg} addFaveTask={addFaveTask} />
      <Title>Favorites</Title>
      <ToDoFavesTable
        tasks={tasks}
        remTask={remTask}
        addTaskToToDo={addTaskToToDo}
        setSnackMsg={setSnackMsg}
      />
    </View>
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

export default ToDoFaves;
