import { IToDo } from "../interfaces";
import { BASE_URL, getToken, ErrorOnApiFail } from "./index";
import { AbstractRequests } from "./AbstractRequests";

export interface IToDoPost {
  name: string;
  duration: number;
  categoryId: number;
}

export class TasksRequests extends AbstractRequests<IToDo, IToDoPost> {
  constructor() {
    super("tasks", "tasks");
  }
}
