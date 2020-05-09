import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, Surface, Portal, Modal } from "react-native-paper";
import { useCategories } from "../hooks/useCategories";

export interface CatFormProps {
  setSnackMsg: (msg: string) => void;
  onModalDismiss: () => void;
}

const CategoriesForm = ({ setSnackMsg, onModalDismiss }: CatFormProps) => {
  const [newCat, setNewCat] = useState("");

  const cb = (msg: string) => {
    setSnackMsg(msg);
    setNewCat("");
    onModalDismiss();
  };

  const { addCategory } = useCategories(cb, cb);

  return (
    <>
      <TextInput
        mode="outlined"
        placeholder={"New category"}
        value={newCat}
        onChangeText={setNewCat}
      />
      <Button compact onPress={() => addCategory(newCat) as any}>
        Add Category
      </Button>
    </>
  );
};

export default CategoriesForm;
