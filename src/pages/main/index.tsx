import React, { Component } from "react";
import { RouteComponentProps } from "@reach/router";
import { Socket } from "socket.io-client";
import axios from "axios";

import "./main.css";
import {
  ChannelSection,
  UserSection,
  MessageSection,
} from "../../components/organisms";
import { Channel, User, Message } from "../../interfaces";
import { SideTemplate } from "../../components/templates";
import { SocketEvents } from "../../constants/socket.events";

interface TProps extends RouteComponentProps {
  user: User;
  socket: typeof Socket;
}

interface TState {
  channels: Channel[];
  users: User[];
  messages: Message[];
  currentUserIdx: number;
  currentChannelIdx: number;
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
      currentChannelIdx: 0,
    };
  }

  componentDidMount() {
    const { socket } = this.props;
    this.getMessagesAndListen();

    socket.on(SocketEvents.ADD_CHANNEL, (channel: Channel) => {
      this.setState((state, props) => ({
        channels: [...state.channels, channel],
      }));
    });
  }

  render() {
    const {
      channels,
      users,
      messages,
      currentUserIdx,
      currentChannelIdx,
    } = this.state;

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
          channel={channels[currentChannelIdx]}
          addMessage={this.addMessage}
        />
      </div>
    );
  }

  addChannel = (channel: Channel) => {
    this.setState((state, props) => ({
      channels: [...state.channels, channel],
    }));
  };

  getMessagesAndListen = () => {
    const { socket } = this.props;
    const { channels, currentChannelIdx } = this.state;

    axios.get("/messages").then((res) => {
      const messages: Message[] = res.data.data;
      this.setState({ messages }, () =>
        socket.on(
          SocketEvents.ADD_MESSAGE + channels[currentChannelIdx].name,
          (message: Message) => {
            this.setState((state, props) => ({
              messages: [...state.messages, message],
            }));
          }
        )
      );
    });
  };

  openChannel = (channel: Channel) => {
    this.setState((state, props) => ({
      channels: state.channels.map((ch) => {
        ch.isOpened = ch.id === channel.id;
        return ch;
      }),
    }));

    this.getMessagesAndListen();
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
}
