import { User } from "./user";

export interface Message {
  id: string;
  text: string;
  date: number;
  user: User;
}
