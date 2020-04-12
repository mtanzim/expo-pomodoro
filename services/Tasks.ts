import { IToDo, ICategory } from "../interfaces";
import { BASE_URL, getToken, ErrorOnApiFail } from "./index";
import { AbstractRequests } from "./AbstractRequests";

export interface IToDoPost {
  name: string;
  duration: number;
  categoryId?: string;
}

export interface IToDoGet {
  id: string;
  created: string;
  name: string;
  duration: number;
  category?: ICategory;
}

export class TasksRequests extends AbstractRequests<IToDoGet, IToDoPost> {
  constructor() {
    super("tasks", "tasks");
  }
  @ErrorOnApiFail
  async getToday(): Promise<[IToDoGet[], Response]> {
    const res = await fetch(`${BASE_URL}/api/tasks/limited/today`, {
      method: "GET",
      headers: {
        Authorization: getToken(),
        "Content-Type": "application/json",
      },
    });
    return [await res.json(), res];
  }
}
