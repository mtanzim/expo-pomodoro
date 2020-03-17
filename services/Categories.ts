import { BASE_URL, getToken } from "./index";
import { ICategory } from "../interfaces";

export interface ICatPost {
  name: string;
}

export interface ICatErr {
  message: string;
}

export class CategoriesRequests {
  static isErr(payload: ICatErr | ICategory | ICategory[]): payload is ICatErr {
    return (payload as ICatErr).message !== undefined;
  }
  static isMultiple(payload: ICategory | ICategory[]): payload is ICategory[] {
    return (
      (payload as ICategory[]).length !== undefined && Array.isArray(payload)
    );
  }

  async getCat(): Promise<ICategory[] | ICatErr> {
    try {
      const response = await fetch(`${BASE_URL}/api/cat/`, {
        method: "GET",
        headers: {
          // Accept: "application/json",
          Authorization: getToken(),
          "Content-Type": "application/json"
        }
      });
      const responseJson = await response.json();
      console.log(responseJson);
      return responseJson;
    } catch (error) {
      return {
        message: error
      };
    }
  }

  async addCat(payload: ICatPost): Promise<ICategory | ICatErr> {
    try {
      const response = await fetch(`${BASE_URL}/api/cat/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: getToken(),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const responseJson = await response.json();
      console.log(responseJson);
      return responseJson;
    } catch (error) {
      return {
        message: error
      };
    }
  }
}
