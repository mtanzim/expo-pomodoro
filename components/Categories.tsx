import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Chip, TextInput, Button } from "react-native-paper";
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
        <Button
          compact
          onPress={() => addCategory(newCat) as any}
        >
          Add Category
        </Button>
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
    alignSelf: "center",
    width: "90%",
  },
  formContainer: {
    flex: 1,
  },
  catContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 24,
  },
  item: {
    margin: 4,
  },
});

export default Categories;
