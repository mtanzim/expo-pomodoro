import { ICategory } from "../interfaces";
import { BASE_URL, getToken, ErrorOnApiFail } from "./index";
import { AbstractRequests } from "./AbstractRequests";

export interface ICatPost {
  name: string;
}

export interface ICatErr {
  message: string;
}

export class CategoriesRequests extends AbstractRequests<ICategory, ICatPost> {
  constructor() {
    super("cat", "categories");
  }
}
