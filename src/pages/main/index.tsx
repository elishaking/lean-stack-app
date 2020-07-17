import React, { Component } from "react";
import { RouteComponentProps } from "@reach/router";

import "./main.css";
import { ChannelSection } from "../../components/organisms";
import { Channel } from "../../interfaces/channel";
import { SideTemplate } from "../../components/templates";

interface TState {
  channels: Channel[];
  users: string[];
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

  render() {
    const { channels } = this.state;

    return (
      <div className="main-page">
        <SideTemplate>
          <ChannelSection
            channels={channels}
            addChannel={this.addChannel}
            openChannel={this.openChannel}
          />
        </SideTemplate>
      </div>
    );
  }
}
