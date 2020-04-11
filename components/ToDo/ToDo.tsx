import React from "react";
import ToDoForm, { ToDoFormProps } from "./ToDoForm";
import ToDoTable, { ToDoProps } from "./ToDoTable";

const ToDo = ({
  setSnackMsg,
  addTask,
  curTasks,
  addQtyToTask,
  remQtyFromTask,
  delTask,
}: ToDoFormProps & ToDoProps) => (
  <>
    <ToDoForm setSnackMsg={setSnackMsg} addTask={addTask} />
    <ToDoTable
      curTasks={curTasks}
      addQtyToTask={addQtyToTask}
      remQtyFromTask={remQtyFromTask}
      delTask={delTask}
    />
  </>
);

export default ToDo;
