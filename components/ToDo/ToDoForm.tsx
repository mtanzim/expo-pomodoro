import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Chip,
  Menu,
  TextInput,
  Portal,
  Modal,
  Surface,
} from "react-native-paper";
import { useCategories } from "../../hooks/useCategories";
import { ICategory } from "../../interfaces";

export interface ToDoFormProps {
  setSnackMsg: (msg: string) => void;
  onModalDismiss: () => void;
  addTask?: (newTask: string, qty: number, category?: ICategory) => void;
  addFaveTask?: (name: string, categoryId?: string) => Promise<void>;
}

// TODO: clean up fave vs regular task logic
const ToDoForm = ({
  addTask,
  setSnackMsg,
  addFaveTask,
  onModalDismiss,
}: ToDoFormProps) => {
  if (addFaveTask && addTask) {
    console.error("Invalid use of component");
    return null;
  }

  const { categories } = useCategories(setSnackMsg, setSnackMsg);
  const [catVisible, setCatVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    ICategory | undefined
  >(undefined);
  const [qtyTasksToAdd, setQtyTasksToAdd] = useState(1);
  const [newTask, setNewTask] = useState("");

  const pickCat = (id: string) => {
    setSelectedCategory(
      categories.find((cat) => cat.id === id) || categories[0]
    );
    setCatVisible(false);
  };

  const addTaskAndClear = async () => {
    if (addTask) {
      addTask(newTask, qtyTasksToAdd, selectedCategory);
    }
    if (addFaveTask) {
      await addFaveTask(newTask, selectedCategory?.id);
    }
    setNewTask("");
    setQtyTasksToAdd(1);
    onModalDismiss();
  };
  return (
    <>
      <TextInput
        mode="outlined"
        dense
        placeholder="New Task"
        value={newTask}
        onChangeText={(text) => setNewTask(text)}
        style={styles.textInputStyle}
      />
      <Menu
        visible={catVisible}
        onDismiss={() => setCatVisible(false)}
        anchor={
          <Chip
            mode="outlined"
            icon="chevron-down"
            onPress={() => setCatVisible(true)}
          >
            {selectedCategory ? selectedCategory.name : "Category"}
          </Chip>
        }
      >
        {categories.map((item) => (
          <Menu.Item
            key={item.id}
            onPress={() => pickCat(item.id)}
            title={item.name}
          />
        ))}
      </Menu>
      <Button compact onPress={addTaskAndClear}>
        {`Add Task ${addFaveTask ? "to faves" : ""}`}
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
    marginBottom: 10,
  },
  modalContainer: {
    width: "90%",
    margin: "auto",
    paddingVertical: 24,
    paddingHorizontal: 8,
  },
  textInputStyle: {
    marginBottom: 2,
  },
});

export default ToDoForm;
