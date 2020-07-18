import React, { Component } from "react";

import "./style.css";
import { User } from "../../../interfaces/user";
import { Message } from "../../../interfaces/message";
import { MessageList } from "../message-list";

interface TProps {
  user: User;
  messages: Message[];
  addMessage: (message: Message) => void;
}

export class MessageSection extends Component<TProps> {
  state = {
    message: "",
  };

  messageListRef: React.RefObject<HTMLUListElement>;

  constructor(props: TProps) {
    super(props);

    this.messageListRef = React.createRef();
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      message: e.target.value,
    });
  };

  addMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.addMessage({
      id: this.state.message,
      text: this.state.message,
      date: Date.now(),
      user: this.props.user,
    });
    this.setState(
      {
        message: "",
      },
      () => {
        const ul = this.messageListRef.current;
        ul?.scrollTo({
          behavior: "smooth",
          top: ul.scrollHeight,
        });
      }
    );
  };

  render() {
    const { message } = this.state;
    const { messages } = this.props;

    return (
      <div className="message-section">
        <MessageList listRef={this.messageListRef} messages={messages} />
        <form onSubmit={this.addMessage}>
          <input
            name="message"
            placeholder="Add Message"
            onChange={this.onChange}
            value={message}
          />
        </form>
      </div>
    );
  }
}
