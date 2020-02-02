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
