import { useState, useEffect } from "react";
import { IToDo } from "../interfaces";
import { TasksRequests } from "../services/Tasks";
const taskServices = new TasksRequests();

type Callback = (msg: string) => void;

export const useTasks = (onSuccess?: Callback, onFailure?: Callback) => {
  const [tasks, setTasks] = useState<IToDo[]>([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const [res, _] = await taskServices.get();
        setTasks(res);
      } catch (err) {
        setTasks([]);
        onFailure && onFailure(err?.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  const addTask = async (
    name: string,
    duration: number,
    categoryId?: string
  ) => {
    try {
      const [res, _] = await taskServices.add({
        name,
        duration,
        categoryId
      });
      const { name: title } = res;
      if (title) {
        setTasks(curCat => curCat.concat(res));
        // onSuccess && onSuccess("Completed task");
      }
    } catch (err) {
      onFailure && onFailure(err?.message);
    }
  };
  const remTask = async (id: string) => {
    try {
      await taskServices.rem(id);
      setTasks((curCat: IToDo[]) => curCat.filter(cat => cat.id !== id));
      onSuccess && onSuccess("Removed task");
    } catch (err) {
      onFailure && onFailure(err?.message);
    }
  };

  return { isLoading, tasks, addTask, remTask };
};
