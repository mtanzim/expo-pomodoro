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

interface IToDo {
  id: string;
  category: string;
  title: string;
  remaining: number;
}
interface IListItemProps {
  toDo: IToDo;
  addOne: (id: string) => void;
  remOne: (id: string) => void;
  delTask: (id: string) => void;
}

interface ICategory {
  id: string;
  name: string;
}

interface IToDoAction {
  type: string;
  payload: IToDo;
}

const exampleTasks: IToDo[] = [
  {
    id: uuid.v4(),
    category: "day-job",
    title: "trading-hub",
    remaining: 4
  },
  {
    id: uuid.v4(),
    category: "day-job",
    title: "trading-platform",
    remaining: 6
  }
];

const UNCATEGORIZED = "Uncategorized";
const exampleCats: ICategory[] = [
  { id: uuid.v4(), name: UNCATEGORIZED },
  { id: uuid.v4(), name: "Work" },
  { id: uuid.v4(), name: "Home" },
  { id: uuid.v4(), name: "TTC" },
  { id: uuid.v4(), name: "Car" },
  { id: uuid.v4(), name: "Berlin" }
];

const ADD_TODO = "ADD_TODO";
const REM_TODO = "REM_TODO";
const INCR_ONE = "INCR_ONE";
const DECR_ONE = "DECR_ONE";

const reducer = (state: IToDo[], action: IToDoAction) => {
  const add_or_rem = (id: string, factor: number) =>
    state.map((item: IToDo) => {
      if (item.id === id) {
        return {
          ...item,
          remaining: item.remaining + factor > 1 ? item.remaining + factor : 1
        };
      }
      return item;
    });

  switch (action.type) {
    case ADD_TODO:
      return [action.payload, ...state];
    case REM_TODO:
      return state.filter((item: IToDo) => item.id !== action.payload.id);
    case INCR_ONE:
      return add_or_rem(action.payload.id, 1);
    case DECR_ONE:
      return add_or_rem(action.payload.id, -1);
    default:
      throw new Error();
  }
};

const ToDo = () => {
  const [curTasks, dispatch] = useReducer(reducer, exampleTasks);
  const [newTask, setNewTask] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ICategory>(
    exampleCats[0]
  );
  const addTask = () => {
    dispatch({
      type: ADD_TODO,
      payload: {
        id: uuid.v4(),
        title: newTask,
        category: selectedCategory.name,
        remaining: 1
      }
    });
    setNewTask("");
  };
  const addQtyToTask = (id: string) => {
    const taskToUpdate = curTasks.find(item => item.id === id);
    taskToUpdate && dispatch({ type: INCR_ONE, payload: taskToUpdate });
  };
  const remQtyFromTask = (id: string) => {
    const taskToUpdate = curTasks.find(item => item.id === id); 
    taskToUpdate && dispatch({ type: DECR_ONE, payload: taskToUpdate });
  };
  const delTask = (id: string) => {
    const taskToUpdate = curTasks.find(item => item.id === id);
    taskToUpdate && dispatch({ type: REM_TODO, payload: taskToUpdate });
  };

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
        <Button onPress={addTask} title={"Add Task"}></Button>
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
