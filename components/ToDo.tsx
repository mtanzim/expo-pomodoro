import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, ScrollView, FlatList } from "react-native";


interface IToDo {
    id: string|number,
    category: string,
    title: string,
    remaining: number
}

const exampleData: IToDo[] = [
    {
        id:1,
        category: 'day-job',
        title: 'trading-hub',
        remaining: 4
    },
    {
        id:1,
        category: 'day-job',
        title: 'trading-platform',
        remaining: 6
    },
]

function Item({toDo}:{toDo:IToDo}) {
    return (
    <Text>{toDo.title}, {toDo.category}, {toDo.remaining}</Text>
    );
  }

const ToDo = () => {
    return (
        <View>
            <Text>To Do List</Text>
            <FlatList
                data={exampleData}
                renderItem={({ item }) => (
                    <Item
                      toDo={item}
                    />
                  )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});
export default ToDo;
