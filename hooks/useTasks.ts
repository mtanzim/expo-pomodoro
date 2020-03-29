import { useState, useEffect } from "react";
import { IToDo } from "../interfaces";
import { TasksRequests } from "../services/Tasks";
const taskServices = new TasksRequests();

type Callback = (msg: string) => void;

export const useCategories = (onSuccess?: Callback, onFailure?: Callback) => {
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
//   const addCategory = async (newCat: string) => {
//     try {
//       const [res, _] = await taskServices.add({ name: newCat });
//       const { name } = res;
//       if (name) {
//         setTasks(curCat => curCat.concat(res));
//         onSuccess && onSuccess("Added Category");
//       }
//     } catch (err) {
//       onFailure && onFailure(err?.message);
//     }
//   };
  const remCategory = async (id: string) => {
    try {
      await taskServices.rem(id);
      setTasks((curCat: IToDo[]) => curCat.filter(cat => cat.id !== id));
      onSuccess && onSuccess("Removed Category");
    } catch (err) {
      onFailure && onFailure(err?.message);
    }
  };

  return { isLoading, categories, addCategory, remCategory };
};
