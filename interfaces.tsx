export interface IToDo {
  id: string;
  category: string;
  title: string;
  remaining: number;
}
export interface IListItemProps {
  toDo: IToDo;
  addOne: (id: string) => void;
  remOne: (id: string) => void;
  delTask: (id: string) => void;
}

export interface ICategory {
  id: string;
  name: string;
}
