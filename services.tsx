const BASE_URL = "http://localhost:3000";
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
    return { message: "Unknown error" };
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
    return { message: "Unknown error" };
  } catch (error) {
    console.error(error);
    return {
      message: error
    };
  }
};
