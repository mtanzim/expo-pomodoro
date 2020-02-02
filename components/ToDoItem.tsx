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

interface IListItemProps {
  toDo: IToDo;
  addOne: (id: string) => void;
  remOne: (id: string) => void;
  delTask: (id: string) => void;
}
const ToDoItem = ({ toDo, addOne, remOne, delTask }: IListItemProps) => {
  return (
    <View style={styles.container}>
      <Text>
        {toDo.title}, {toDo.category}, {toDo.remaining}
      </Text>
      <Button
        style={styles.button}
        onPress={_ev => addOne(toDo.id)}
        title={"+"}
      />
      <Button
        style={styles.button}
        onPress={_ev => remOne(toDo.id)}
        title={"-"}
      />
      <Button
        style={styles.button}
        onPress={_ev => delTask(toDo.id)}
        title={"DEL"}
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
export default ToDoItem;
