import React, { Component } from "react";
import { RouteComponentProps } from "@reach/router";
import { ChannelSection } from "../../components/organisms";

interface TState {
  channels: string[];
  users: string[];
  messages: string[];
}

export class MainPage extends Component<RouteComponentProps, Readonly<TState>> {
  state = {
    channels: ["General"],
    users: [],
    messages: [],
  };

  addChannel = (channel: string) => {
    this.setState((state, props) => ({
      channels: [...state.channels, channel],
    }));
  };

  render() {
    const { channels } = this.state;

    return (
      <div>
        <ChannelSection channels={channels} addChannel={this.addChannel} />
      </div>
    );
  }
}
