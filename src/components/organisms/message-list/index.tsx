import React from "react";

import { Message } from "../../../interfaces";
import { MessageItem } from "../../molecules";

interface TProps {
  listRef: React.RefObject<HTMLUListElement>;
  messages: Message[];
}

export const MessageList = ({ listRef, messages }: TProps) => {
  return (
    <ul ref={listRef}>
      {messages.map((message) => {
        return <MessageItem key={message.id} message={message} />;
      })}
    </ul>
  );
};
