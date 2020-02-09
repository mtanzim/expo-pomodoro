import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Chip, IconButton, TextInput, HelperText } from "react-native-paper";
import { ICategory, ICatProps } from "../interfaces";
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

const Categories = ({ categories, addCategory, remCategory }: ICatProps) => {
  const [newCat, setNewCat] = useState("");

  const ownAddCategory = () => {
    addCategory(newCat);
    setNewCat("");
  };

  return (
    <View>
      <View style={styles.formContainer}>
        <TextInput
          mode="outlined"
          placeholder={"New category"}
          value={newCat}
          onChangeText={setNewCat}
        />
        <IconButton icon="plus" onPress={ownAddCategory} />
      </View>
      <View style={styles.catContainer}>
        {categories.map((item, index) => (
          <Item category={item} rem={remCategory} key={index} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  catContainer: {
    margin: 4,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
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
