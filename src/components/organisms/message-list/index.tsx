import React from "react";

import { Message } from "../../../interfaces/message";
import { MessageItem } from "../../molecules/message-item";

interface TProps {
  messages: Message[];
}

export const MessageList = ({ messages }: TProps) => {
  return (
    <ul>
      {messages.map((message) => {
        return <MessageItem key={message.id} message={message} />;
      })}
    </ul>
  );
};
