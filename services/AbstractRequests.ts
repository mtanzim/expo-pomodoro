import { BASE_URL, getToken, ErrorOnApiFail } from "./index";

export interface IToDoPost {
  name: string;
  duration: number;
  categoryId: number;
}

export class AbstractRequests<TGet, TPost> {
  private endpoint: string;
  private name: string;
  constructor(endpoint: string, name: string) {
    this.endpoint = endpoint;
    this.name = name;
  }

  @ErrorOnApiFail
  async get(): Promise<[TGet[], Response]> {
    const res = await fetch(`${BASE_URL}/api/${this.endpoint}/`, {
      method: "GET",
      headers: {
        Authorization: getToken(),
        "Content-Type": "application/json"
      }
    });
    return [await res.json(), res];
  }

  @ErrorOnApiFail
  async add(payload: TPost): Promise<[TGet, Response]> {
    const res = await fetch(`${BASE_URL}/api/${this.endpoint}/`, {
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
  @ErrorOnApiFail
  async rem(id: string): Promise<[null, Response]> {
    const res = await fetch(`${BASE_URL}/api/${this.endpoint}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: getToken(),
        "Content-Type": "application/json"
      }
    });
    return [null, res];
  }
}
