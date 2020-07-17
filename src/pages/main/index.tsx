import React, { Component } from "react";
import { RouteComponentProps } from "@reach/router";

import "./main.css";
import { ChannelSection, UserSection } from "../../components/organisms";
import { Channel } from "../../interfaces/channel";
import { SideTemplate } from "../../components/templates";
import { User } from "../../interfaces/user";

interface TState {
  channels: Channel[];
  users: User[];
  messages: string[];
}

export class MainPage extends Component<RouteComponentProps, Readonly<TState>> {
  state = {
    channels: [
      {
        id: "General",
        name: "General",
        isOpened: true,
      },
    ],
    users: [],
    messages: [],
  };

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

  render() {
    const { channels, users } = this.state;

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
      </div>
    );
  }
}
