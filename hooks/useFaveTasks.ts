import { useState, useEffect } from "react";
import { IFaveToDo } from "../interfaces";
import { FaveTasksRequests } from "../services/FaveTasks";
const taskServices = new FaveTasksRequests();

type Callback = (msg: string) => void;

export const useFaveTasks = (
  onSuccess?: Callback,
  onFailure?: Callback,
  trigger?: boolean
) => {
  const [tasks, setTasks] = useState<IFaveToDo[]>([]);
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
  }, [trigger]);
  const addTask = async (name: string, categoryId?: string) => {
    try {
      const [res, _] = await taskServices.add({
        name,
        categoryId,
      });
      const { name: title } = res;
      if (title) {
        setTasks((curCat) => curCat.concat(res));
        onSuccess && onSuccess("Added task to favorites!");
      }
    } catch (err) {
      onFailure && onFailure(err?.message);
    }
  };
  const remTask = async (id: string) => {
    try {
      await taskServices.rem(id);
      setTasks((curCat: IFaveToDo[]) => curCat.filter((cat) => cat.id !== id));
      onSuccess && onSuccess("Removed favorite task");
    } catch (err) {
      onFailure && onFailure(err?.message);
    }
  };

  return { isLoading, tasks, addTask, remTask };
};
