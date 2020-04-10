import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Chip, IconButton, TextInput } from "react-native-paper";
import { useCategories } from "../hooks/useCategories";
import { ICategory } from "../interfaces";
const Item = ({
  category,
  rem,
}: {
  category: ICategory;
  rem: (id: string) => void;
}) => (
  <Chip style={styles.item} onClose={() => rem(category.id)}>
    {category.name}
  </Chip>
);

export interface CatProps {
  setSnackMsg: (msg: string) => void;
}

const Categories = ({ setSnackMsg }: CatProps) => {
  const [newCat, setNewCat] = useState("");

  const cb = (msg: string) => {
    setSnackMsg(msg);
    setNewCat("");
  };

  const { isLoading, categories, addCategory, remCategory } = useCategories(
    cb,
    cb
  );

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          mode="outlined"
          placeholder={"New category"}
          value={newCat}
          onChangeText={setNewCat}
        />
        <IconButton icon="plus" onPress={() => addCategory(newCat) as any} />
      </View>
      <View style={styles.catContainer}>
        {isLoading ? (
          <Text> Loading</Text>
        ) : (
          categories.map((item) => (
            <Item
              category={item}
              rem={() => remCategory(item.id)}
              key={item.id}
            />
          ))
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    margin: 8,
    width: "50%",
  },
  catContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 4,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  formContainer: {
    padding: 8,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    margin: 4,
  },
});

export default Categories;
