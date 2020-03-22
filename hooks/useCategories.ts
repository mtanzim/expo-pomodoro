import { useState, useEffect } from "react";
import { ICategory, ICatProps } from "../interfaces";
import { CategoriesRequests } from "../services/Categories";
const catServices = new CategoriesRequests();

type Callback = (msg: string) => void;

export const useCategories = (onSuccess?: Callback, onFailure?: Callback) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await catServices.getCat();
        if (CategoriesRequests.isErr(res)) {
          onFailure && onFailure(res.message);
          return;
        }
        if (CategoriesRequests.isMultiple(res)) {
          setCategories(res);
          return;
        }
        onFailure && onFailure("Failed to fetch categories!");
        return;
      } catch (err) {
        setCategories([]);
        onFailure && onFailure(err?.message);
      }
    };
    fetchData();
  }, []);
  const addCategory = async (newCat: string) => {
    const res = await catServices.addCat({ name: newCat });
    if (CategoriesRequests.isErr(res)) {
      onFailure && onFailure(res.message);
    } else {
      const { name } = res;
      if (name) {
        setCategories(curCat => curCat.concat(res));
        onSuccess && onSuccess("Added Category");
      }
    }
  };
  const remCategory = async (id: string) => {
    const res = await catServices.remCat(id);
    if (res && CategoriesRequests.isErr(res)) {
      onFailure && onFailure(res.message);
    } else {
      setCategories(curCat => curCat.filter(cat => cat.id !== id));
      onSuccess && onSuccess("Removed Category");
    }
  };

  return { categories, addCategory, remCategory };
};
