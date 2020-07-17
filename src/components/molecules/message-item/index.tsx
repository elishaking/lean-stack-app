import React from "react";
import { Message } from "../../../interfaces/message";

interface TProps {
  message: Message;
}

export const MessageItem = ({ message }: TProps) => {
  return (
    <li>
      <small>{message.user.name}</small>
      <p>{message.text}</p>
    </li>
  );
};
