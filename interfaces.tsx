export interface IFaveToDo {
  id: string;
  category?: ICategory;
  name: string;
}

export interface IToDo extends IFaveToDo {
  remaining: number;
}

export interface ICategory {
  id: string;
  name: string;
}

export interface IToDoAction {
  type: string;
  payload: IToDo;
}

export interface IListItemProps {
  toDo: IToDo;
  addOne: (id: string) => void;
  remOne: (id: string) => void;
  delTask: (id: string) => void;
}
