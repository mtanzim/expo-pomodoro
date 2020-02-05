import React, { useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { ICatProps, ICategory } from "../interfaces";
import {
  Button,
  Colors,
  ProgressBar,
  Subheading,
  Surface,
  Text,
  Title,
  TextInput,
  Chip
} from "react-native-paper";
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

  return (
    <View>
      <View style={styles.formContainer}>
        <TextInput
          mode="outlined"
          placeholder={"New category"}
          value={newCat}
          onChangeText={text => setNewCat(text)}
        />
        <Button onPress={() => addCategory(newCat)} mode="contained">
          Add
        </Button>
      </View>
      <Surface style={styles.catContainer}>
        {categories.map((item, index) => (
          <Item category={item} rem={remCategory} key={index} />
        ))}
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  catContainer: {
    margin: 4,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  formContainer: {
    padding: 8,
    flex: 1,
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  item: {
    margin: 4
  }
});

export default Categories;
