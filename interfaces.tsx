export interface IToDo {
  id: string;
  category?: ICategory;
  name: string;
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

export enum ClockTypes {
  WORK = "Working",
  BREAK = "On Break"
}

export interface IClockProps {
  title: string;
  category?: ICategory;
  clockType?: ClockTypes;
  defaultTime?: number;
}

export interface IListItemProps {
  toDo: IToDo;
  addOne: (id: string) => void;
  remOne: (id: string) => void;
  delTask: (id: string) => void;
}
