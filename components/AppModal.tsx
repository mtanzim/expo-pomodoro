import React, { ReactChild } from "react";
import { StyleSheet } from "react-native";
import { Modal, Portal, Surface } from "react-native-paper";

interface Props {
  children: ReactChild;
  isVisible: boolean;
  onModalDismiss: () => void;
}

const AppModal = ({ children, isVisible, onModalDismiss }: Props) => (
  <Portal>
    <Modal visible={isVisible} onDismiss={onModalDismiss}>
      <Surface style={styles.modalContainer}>{children}</Surface>
    </Modal>
  </Portal>
);

const styles = StyleSheet.create({
  modalContainer: {
    width: "90%",
    margin: "auto",
    paddingVertical: 48,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
});

export default AppModal;
