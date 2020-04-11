import { IFaveToDo } from "../interfaces";
import { BASE_URL, getToken, ErrorOnApiFail } from "./index";
import { AbstractRequests } from "./AbstractRequests";

export interface IFaveToDoPost {
  name: string;
  categoryId?: string;
}

export class FaveTasksRequests extends AbstractRequests<
  IFaveToDo,
  IFaveToDoPost
> {
  constructor() {
    super("fave", "faveTasks");
  }
}
