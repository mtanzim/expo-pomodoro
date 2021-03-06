import { BASE_URL } from "./index";
interface AuthMsg {
  auth?: boolean;
  token?: string;
  message: string;
}

export class AuthRequests {
  async login(username: string, password: string): Promise<AuthMsg> {
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
  }

  async register(
    username: string,
    password: string,
    verifyPassword: string
  ): Promise<AuthMsg> {
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
      if (responseJson.username)
        return { message: `${responseJson.username} registered!` };
      return { message: "Failed to register" };
    } catch (error) {
      console.error(error);
      return {
        message: error
      };
    }
  }
}
