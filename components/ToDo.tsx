import React, { useState, useEffect } from "react";
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

interface IToDo {
  id: string;
  category: string;
  title: string;
  remaining: number;
}

interface ICategory {
  id: string;
  name: string;
}

const exampleData: IToDo[] = [
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

interface IListItemProps {
  toDo: IToDo;
  addOne: (id: string) => void;
  remOne: (id: string) => void;
  delTask: (id: string) => void;
}
const Item = ({ toDo, addOne, remOne, delTask }: IListItemProps) => {
  return (
    <View>
      <Text>
        {toDo.title}, {toDo.category}, {toDo.remaining}
      </Text>
      <Button onPress={_ev => addOne(toDo.id)} title={"+"} />
      <Button onPress={_ev => remOne(toDo.id)} title={"-"} />
      <Button onPress={_ev => delTask(toDo.id)} title={"DEL"} />
    </View>
  );
};

const ToDo = () => {
  const [curTasks, setCurTasks] = useState(exampleData);
  const [newTask, setNewTask] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ICategory>(
    exampleCats[0]
  );
  const addTask = () => {
    setCurTasks([
      {
        id: uuid.v4(),
        title: newTask,
        category: selectedCategory.name,
        remaining: 1
      },
      ...curTasks
    ]);
    setNewTask("");
  };
  const addQtyToTask = (factor: number) => (id: string) => {
    setCurTasks(
      curTasks.map((item: IToDo) => {
        if (item.id === id) {
          return {
            ...item,
            remaining: item.remaining + factor > 1 ? item.remaining + factor : 1
          };
        }
        return item;
      })
    );
  };
  const delTask = (id: string) =>
    setCurTasks(curTasks.filter((item: IToDo) => item.id !== id));

  return (
    <View>
      <Text>To Do List</Text>
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
      <FlatList
        data={curTasks}
        renderItem={({ item }) => (
          <Item
            addOne={addQtyToTask(1)}
            remOne={addQtyToTask(-1)}
            delTask={delTask}
            toDo={item}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default ToDo;
