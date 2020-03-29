import { ICategory } from "../interfaces";
import { BASE_URL, getToken, ErrorOnApiFail } from "./index";

export interface ICatPost {
  name: string;
}

export interface ICatErr {
  message: string;
}

export class CategoriesRequests {
  @ErrorOnApiFail("Failed to fetch categories")
  async getCat(): Promise<[ICategory[], Response]> {
    const res = await fetch(`${BASE_URL}/api/cat/`, {
      method: "GET",
      headers: {
        Authorization: getToken(),
        "Content-Type": "application/json"
      }
    });
    return [await res.json(), res];
  }

  @ErrorOnApiFail("Failed to add categories")
  async addCat(payload: ICatPost): Promise<[ICategory, Response]> {
    const res = await fetch(`${BASE_URL}/api/cat/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: getToken(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    return [await res.json(), res];
  }
  @ErrorOnApiFail("Failed to remove categories")
  async remCat(id: string): Promise<[null, Response]> {
    const res = await fetch(`${BASE_URL}/api/cat/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: getToken(),
        "Content-Type": "application/json"
      }
    });
    return [null, res];
  }
}
