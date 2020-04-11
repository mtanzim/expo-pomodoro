import React, { useEffect } from "react";
import ToDoForm, { ToDoFormProps } from "./ToDoForm";
import ToDoTable, { ToDoProps } from "./ToDoTable";
import { useFaveTasks } from "../../hooks/useFaveTasks";
import ToDoFavesTable from "./ToDoFavesTable";

interface ToDoFavesProps {
  setSnackMsg: (msg: string) => void;
}

const ToDoFaves = ({ setSnackMsg }: ToDoFavesProps) => {
  const { addTask: addFaveTask, remTask, tasks } = useFaveTasks(
    setSnackMsg,
    setSnackMsg
  );

  return (
    <React.Fragment>
      <ToDoForm setSnackMsg={setSnackMsg} addFaveTask={addFaveTask} />
      <ToDoFavesTable tasks={tasks} remTask={remTask} />
    </React.Fragment>
  );
};

export default ToDoFaves;
