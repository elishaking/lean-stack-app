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
      <small className="date">{formatMessageDate(message.date)}</small>
    </li>
  );
};

const formatMessageDate = (date: number) => {
  let now = Date.now();

  if (Math.abs(now - date) > 86400000)
    return new Date(date).toDateString().split(" ").slice(1, 3).join(" ");

  now /= 1000;
  date /= 1000;

  if (Math.abs(now - date) > 3600) {
    const hours = Math.floor(Math.abs(now - date) / 60 / 60);
    return `${hours} hr${hours > 1 ? "s" : ""} ago`;
  }

  if (Math.abs(now - date) > 60) {
    const mins = Math.floor(Math.abs(now - date) / 60);
    return `${mins} min${mins > 1 ? "s" : ""} ago`;
  }

  return "now";
};
