const BASE_URL = "http://localhost:3000";
const LOCALSTORAGE_KEY_NAME = "pomodoro-app-token";

export const getToken = () =>
  `Bearer ${localStorage.getItem(LOCALSTORAGE_KEY_NAME) || ""}`;

interface AuthMsg {
  auth?: boolean;
  token?: string;
  message: string;
}
export const login = async (
  username: string,
  password: string
): Promise<AuthMsg> => {
  try {
    let response = await fetch(`${BASE_URL}/api/users/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });
    let responseJson = await response.json();
    if (responseJson.token !== undefined)
      return { token: responseJson.token, message: "Success" };
    return { message: "Failed to authenticate" };
  } catch (error) {
    console.error(error);
    return {
      message: error
    };
  }
};
export const register = async (
  username: string,
  password: string,
  verifyPassword: string
): Promise<AuthMsg> => {
  try {
    let response = await fetch(`${BASE_URL}/api/users/auth/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password,
        verifyPassword
      })
    });
    let responseJson = await response.json();
    console.log(responseJson);
    if (responseJson.username)
      return { message: `${responseJson.username} registered!` };
    return { message: "Failed to register" };
  } catch (error) {
    console.error(error);
    return {
      message: error
    };
  }
};

export interface ICatRes {
  name: string;
  id: number;
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
      console.log(response);
      return responseJson;
    } catch (error) {
      return {
        message: error
      };
    }
  }
}
