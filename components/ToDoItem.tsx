import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { IListItemProps } from "../interfaces";

const ToDoItem = ({ toDo, addOne, remOne, delTask }: IListItemProps) => {
  return (
    <View style={styles.container}>
      <Text>
        {toDo.title}, {toDo.category}, {toDo.remaining}
      </Text>
      <Button
        onPress={_ev => addOne(toDo.id)}
        title={"+"}
      />
      <Button
        onPress={_ev => remOne(toDo.id)}
        title={"-"}
      />
      <Button
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
