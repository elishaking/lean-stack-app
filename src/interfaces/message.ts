import { User, Channel } from ".";

export interface Message {
  id: string;
  text: string;
  date: number;
  user: User;
  channel: Channel;
}
