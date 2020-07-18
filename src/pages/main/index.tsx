import React, { Component } from "react";
import { RouteComponentProps } from "@reach/router";

import "./main.css";
import {
  ChannelSection,
  UserSection,
  MessageSection,
} from "../../components/organisms";
import { Channel } from "../../interfaces/channel";
import { SideTemplate } from "../../components/templates";
import { User } from "../../interfaces/user";
import { Message } from "../../interfaces/message";

interface TProps extends RouteComponentProps {
  user: User;
}

interface TState {
  channels: Channel[];
  users: User[];
  messages: Message[];
  currentUserIdx: number;
}

export class MainPage extends Component<TProps, Readonly<TState>> {
  constructor(props: TProps) {
    super(props);

    this.state = {
      channels: [
        {
          id: "General",
          name: "General",
          isOpened: true,
        },
      ],
      users: [props.user],
      messages: [],
      currentUserIdx: 0,
    };
  }

  addChannel = (channel: Channel) => {
    this.setState((state, props) => ({
      channels: [...state.channels, channel],
    }));
  };

  openChannel = (channel: Channel) => {
    this.setState((state, props) => ({
      channels: state.channels.map((ch) => {
        ch.isOpened = ch.id === channel.id;
        return ch;
      }),
    }));
  };

  addUser = (user: User) => {
    this.setState((state, props) => ({
      users: [...state.users, user],
    }));
  };

  openUser = (user: User) => {
    this.setState((state, props) => ({
      users: state.users.map((u) => {
        u.isOpened = u.id === user.id;
        return u;
      }),
    }));
  };

  addMessage = (message: Message) => {
    this.setState((state, props) => ({
      messages: [...state.messages, message],
    }));
  };

  render() {
    const { channels, users, messages, currentUserIdx } = this.state;

    return (
      <div className="main-page">
        <SideTemplate>
          <ChannelSection
            channels={channels}
            addChannel={this.addChannel}
            openChannel={this.openChannel}
          />
          <UserSection
            users={users}
            addUser={this.addUser}
            openUser={this.openUser}
          />
        </SideTemplate>
        <MessageSection
          messages={messages}
          user={users[currentUserIdx]}
          addMessage={this.addMessage}
        />
      </div>
    );
  }
}
