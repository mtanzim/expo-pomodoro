import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Chip } from "react-native-paper";
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
  isVisible: boolean;
}

const Categories = ({ setSnackMsg, isVisible }: CatProps) => {
  const cb = (msg: string) => {
    setSnackMsg(msg);
  };

  useEffect(() => {}, [isVisible]);
  const { isLoading, categories, remCategory } = useCategories(cb, cb, isVisible);

  return (
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
  );
};

const styles = StyleSheet.create({
  catContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
    alignSelf: "center",
    width: "90%",
    marginTop: 24,
  },
  item: {
    margin: 4,
  },
});

export default Categories;
