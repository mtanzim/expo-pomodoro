export const BASE_URL = "http://localhost:3000";
export const LOCALSTORAGE_KEY_NAME = "pomodoro-app-token";
export const getToken = () =>
  `Bearer ${localStorage.getItem(LOCALSTORAGE_KEY_NAME) || ""}`;

export function ErrorOnApiFail(msg?: string) {
  return function throwErrorOnFail(
    _target: Object,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ): any {
    const originalFunction = descriptor.value;

    descriptor.value = async function(payload?: any) {
      const boundOriginalFunction = originalFunction.bind(this);
      const [resJSON, result] = await boundOriginalFunction(payload);
      if (!result.ok) {
        if (result?.status === 401) {
          localStorage.removeItem(LOCALSTORAGE_KEY_NAME);
          console.log("Removed token");
        }
        throw new Error(
          result?.error?.message || msg || "Something went wrong"
        );
      }
      return [resJSON, result];
    };

    return descriptor;
  };
}
