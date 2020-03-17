import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Chip, IconButton, TextInput, HelperText } from "react-native-paper";
import { ICategory, ICatProps } from "../interfaces";
import { CategoriesRequests, ICatErr, ICatRes } from "../services/Categories";

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

const catServices = new CategoriesRequests();

const Categories = ({
  categories,
  addCategory,
  remCategory,
  setSnackMsg
}: ICatProps) => {
  const [newCat, setNewCat] = useState("");

  const ownAddCategory = async () => {
    const res = await catServices.addCat({ name: newCat });
    if (CategoriesRequests.isErr(res)) {
      setSnackMsg(res.message);
      setNewCat("");
    } else {
      const { name } = res;
      if (name) {
        addCategory(name);
        setNewCat("");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          mode="outlined"
          placeholder={"New category"}
          value={newCat}
          onChangeText={setNewCat}
        />
        <IconButton icon="plus" onPress={ownAddCategory as any} />
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    margin: 8,
    width: "50%"
    // height: 200,
    // maxHeight:200,
    // padding: 8,
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
