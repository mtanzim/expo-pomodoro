import { useState, useEffect } from "react";
import { ICategory } from "../interfaces";
import { CategoriesRequests } from "../services/Categories";
import { LOCALSTORAGE_KEY_NAME } from "../constants";
const catServices = new CategoriesRequests();

type Callback = (msg: string) => void;

export const useCategories = (onSuccess?: Callback, onFailure?: Callback) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const [res, _] = await catServices.getCat();
        setCategories(res);
      } catch (err) {
        console.log(err);
        setCategories([]);
        onFailure && onFailure(err?.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  const addCategory = async (newCat: string) => {
    try {
      const [res, _] = await catServices.addCat({ name: newCat });
      const { name } = res;
      if (name) {
        setCategories(curCat => curCat.concat(res));
        onSuccess && onSuccess("Added Category");
      }
    } catch (err) {
      onFailure && onFailure(err?.message);
    }
  };
  const remCategory = async (id: string) => {
    try {
      await catServices.remCat(id);
      setCategories((curCat: ICategory[]) =>
        curCat.filter(cat => cat.id !== id)
      );
      onSuccess && onSuccess("Removed Category");
    } catch (err) {
      onFailure && onFailure(err?.message);
    }
  };

  return { isLoading, categories, addCategory, remCategory };
};
