import React, { Component } from "react";

import { ChannelList } from "../channel-list";

interface TProps {
  channels: string[];
  channelAdded: (e: React.FormEvent<HTMLFormElement>) => void;
}

export class ChannelSection extends Component<TProps> {
  state = {
    channel: "",
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      channel: e.target.value,
    });
  };

  render() {
    const { channels, channelAdded } = this.props;

    return (
      <div>
        <ChannelList channels={channels} />
        <form onSubmit={channelAdded}>
          <input
            name="channel"
            placeholder="channel"
            onChange={this.onChange}
          />
        </form>
      </div>
    );
  }
}
