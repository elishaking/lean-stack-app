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
  channelActive: boolean;
  addingMessage: boolean;
  addingChannel: boolean;
}

export class MainPage extends Component<TProps, Readonly<TState>> {
  user: User;
  currentMessageKey = "";

  constructor(props: TProps) {
    super(props);

    this.user = props.user;

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
      channelActive: true,
      addingMessage: false,
      addingChannel: false,
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
      addingMessage,
      addingChannel,
    } = this.state;

    return (
      <div className="main-page">
        <SideTemplate>
          <ChannelSection
            channels={channels}
            addChannel={this.addChannel}
            openChannel={this.openChannel}
            addingChannel={addingChannel}
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
          addingMessage={addingMessage}
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
    const { channelActive, channels, currentChannelIdx } = this.state;
    const currentChannel = channels[currentChannelIdx];

    this.currentMessageKey = currentChannel.id;
    let url = `/messages/${this.currentMessageKey}`;

    if (!channelActive) {
      this.currentMessageKey = this.getKey();
      url = `/messages/users/${this.currentMessageKey}`;
    }

    axios.get(url).then((res) => {
      const messages: Message[] = res.data.data;
      this.setState({ messages }, () =>
        socket.on(
          SocketEvents.ADD_MESSAGE + this.currentMessageKey,
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
    this.props.socket.removeEventListener(
      SocketEvents.ADD_MESSAGE + this.currentMessageKey
    );

    this.setState(
      (state, props) => {
        if (!state.channelActive)
          state.users[state.currentUserIdx].isOpened = false;

        return {
          channels: state.channels.map((ch) => {
            ch.isOpened = ch.id === channel.id;
            return ch;
          }),
          channelActive: true,
        };
      },
      () => this.getMessagesAndListen()
    );
  };

  addUser = (user: User) => {
    this.setState((state, props) => ({
      users: [...state.users, user],
    }));
  };

  openUser = (user: User) => {
    this.props.socket.removeEventListener(
      SocketEvents.ADD_MESSAGE + this.currentMessageKey
    );

    this.setState(
      (state, props) => {
        if (state.channelActive)
          state.channels[state.currentChannelIdx].isOpened = false;

        return {
          users: state.users.map((u) => {
            u.isOpened = u.id === user.id;
            return u;
          }),
          channelActive: false,
          channels: state.channels,
        };
      },
      () => this.getMessagesAndListen()
    );
  };

  addMessage = (message: Message) => {
    const { channelActive, currentChannelIdx, channels } = this.state;
    message.key = channels[currentChannelIdx].id;
    if (!channelActive) {
      message.key = this.getKey();
      message.channel = null;
    }

    this.setState({ addingMessage: true });
    axios.post("/messages", message).then((res) => {
      this.setState({ addingMessage: false });
    });
  };

  getKey = () => {
    const { currentUserIdx, users } = this.state;

    return `${this.user.id}${users[currentUserIdx].id}`
      .split("")
      .sort()
      .join("")
      .trim();
  };

  componentWillUnmount() {
    this.props.socket.removeAllListeners();
  }
}
