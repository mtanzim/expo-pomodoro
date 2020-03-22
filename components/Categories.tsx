import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Chip, IconButton, TextInput, HelperText } from "react-native-paper";
import { ICategory, ICatProps } from "../interfaces";
import { useCategories } from "../hooks/useCategories";
const Item = ({
  category,
  rem
}: {
  category: ICategory;
  rem: (id: string) => void;
}) => (
  <Chip style={styles.item} onClose={() => rem(category.id)}>
    {category.name}
  </Chip>
);

const Categories = ({
  // categories,
  // addCategory,
  remCategory,
  setSnackMsg
}: ICatProps) => {
  const [newCat, setNewCat] = useState("");

  const successCb = (msg: string) => {
    setSnackMsg(msg);
    setNewCat("");
  };
  const errorCb = successCb;

  const { categories, addCategory } = useCategories(successCb, errorCb);

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
        {categories.map(item => (
          <Item category={item} rem={remCategory} key={item.id} />
        ))}
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
    width: "50%"
  },
  catContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 4,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  formContainer: {
    padding: 8,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    margin: 4
  }
});

export default Categories;
