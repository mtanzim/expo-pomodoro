export const BASE_URL = "http://localhost:3000";
export const LOCALSTORAGE_KEY_NAME = "pomodoro-app-token";
export const getToken = () =>
  `Bearer ${localStorage.getItem(LOCALSTORAGE_KEY_NAME) || ""}`;
