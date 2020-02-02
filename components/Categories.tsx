import React, { useState } from "react";
import { FlatList, View, Text, TextInput, Button } from "react-native";
import { ICatProps, ICategory } from "../interfaces";

const Item = ({
  category,
  rem
}: {
  category: ICategory;
  rem: (id: string) => void;
}) => (
  <View>
    <Text>{category.name}</Text>
    <Button title="X" onPress={() => rem(category.id)}></Button>
  </View>
);

const Categories = ({ categories, addCategory, remCategory }: ICatProps) => {
  const [newCat, setNewCat] = useState("");

  return (
    <View>
      <TextInput
        placeholder={"New category"}
        value={newCat}
        onChangeText={text => setNewCat(text)}
      />
      <Button
        onPress={() => addCategory(newCat)}
        title={"Add Category"}
      ></Button>
      <FlatList
        data={categories}
        renderItem={({ item }) => <Item category={item} rem={remCategory} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Categories;
