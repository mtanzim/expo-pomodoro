import React, { useState, useReducer } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  FlatList,
  TextInput,
  Picker
} from "react-native";
import uuid from "uuid";
import ToDoItem from "./ToDoItem";


const ToDo = ({curTasks, taskDispatch, addQtyToTask, remQtyFromTask, delTask, addTask}) => {
  const [newTask, setNewTask] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ICategory>(
    exampleCats[0]
  );


  return (
    <View>
      <Text>To Do List</Text>
      <View style={styles.container}>
        <TextInput
          placeholder={"New Task"}
          value={newTask}
          onChangeText={text => setNewTask(text)}
        />
        <Picker
          selectedValue={selectedCategory?.name}
          style={{ height: 50, width: 200 }}
          onValueChange={itemValue =>
            setSelectedCategory({ id: itemValue.id, name: itemValue })
          }
        >
          {exampleCats.map(item => (
            <Picker.Item label={item.name} value={item.name} />
          ))}
          )}>
        </Picker>
        <Button onPress={() => addTask()} title={"Add Task"}></Button>
      </View>
      <FlatList
        data={curTasks}
        renderItem={({ item }) => (
          <ToDoItem
            addOne={() => addQtyToTask(item.id)}
            remOne={() => remQtyFromTask(item.id)}
            delTask={delTask}
            toDo={item}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
export default ToDo;
