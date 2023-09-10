import { User } from "../models";

export class UserService {
  async getUserById(id: string): Promise<User> {
    const response = await fetch(`https://dummyjson.com/users/${id}`);
    const data = await response.json();
    return data;
  }
}
