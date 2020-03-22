export interface IToDo {
  id: string;
  category: string;
  title: string;
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

export interface IToDoProps {
  curTasks: IToDo[];
  categories: ICategory[];
  addQtyToTask: (id: string) => void;
  remQtyFromTask: (id: string) => void;
  delTask: (id: string) => void;
  addTask: (newTask: string, category: string, qty: number) => void;
  setSnackMsg: (msg: string) => void;
}

export enum ClockTypes {
  WORK = "Working",
  BREAK = "On Break"
}

export interface IClockProps {
  title: string;
  category: string;
  clockType?: ClockTypes;
  defaultTime?: number;
}

export interface IListItemProps {
  toDo: IToDo;
  addOne: (id: string) => void;
  remOne: (id: string) => void;
  delTask: (id: string) => void;
}

export interface ICatProps {
  categories: ICategory[];
  addCategory: (name: string) => void;
  remCategory: (id: string) => void;
  setSnackMsg: (msg: string) => void;
}
