import { BASE_URL, getToken } from "./index";

export interface ICatRes {
  id: number;
  name: string;
}
export interface ICatPost {
  name: string;
}

export interface ICatErr {
  message: string;
}

export class CategoriesRequests {
  static isErr(payload: ICatErr | ICatRes): payload is ICatErr {
    return (payload as ICatErr).message !== undefined;
  }

  async addCat(payload: ICatPost): Promise<ICatRes | ICatErr> {
    try {
      let response = await fetch(`${BASE_URL}/api/cat/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: getToken(),
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      let responseJson = await response.json();
      console.log(responseJson);
      return responseJson;
    } catch (error) {
      return {
        message: error
      };
    }
  }
}
