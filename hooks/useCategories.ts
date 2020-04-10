import { useState, useEffect } from "react";
import { ICategory } from "../interfaces";
import { CategoriesRequests } from "../services/Categories";
const catServices = new CategoriesRequests();

type Callback = (msg: string) => void;

export const useCategories = (onSuccess?: Callback, onFailure?: Callback) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const [res, _] = await catServices.get();
        setCategories(res);
      } catch (err) {
        setCategories([]);
        onFailure && onFailure(err?.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  const addCategory = async (newCat: string) => {
    try {
      if (!newCat) throw new Error("Category cannot be empty!");
      const [res, _] = await catServices.add({ name: newCat });
      const { name } = res;
      if (name) {
        setCategories((curCat) => curCat.concat(res));
        onSuccess && onSuccess("Added Category");
      }
    } catch (err) {
      onFailure && onFailure(err?.message);
    }
  };
  const remCategory = async (id: string) => {
    try {
      await catServices.rem(id);
      setCategories((curCat: ICategory[]) =>
        curCat.filter((cat) => cat.id !== id)
      );
      onSuccess && onSuccess("Removed Category");
    } catch (err) {
      onFailure && onFailure(err?.message);
    }
  };

  return { isLoading, categories, addCategory, remCategory };
};
