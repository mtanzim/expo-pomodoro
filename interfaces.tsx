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
    addTask: (newTask: string, category: string) => void;
  }
