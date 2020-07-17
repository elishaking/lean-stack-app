import React, { Component } from "react";

import { ChannelList } from "../channel-list";

interface TProps {
  channels: string[];
  addChannel: (channel: string) => void;
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

  addChannel = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.addChannel(this.state.channel);
    this.setState({
      channel: "",
    });
  };

  render() {
    const { channel } = this.state;
    const { channels } = this.props;

    return (
      <div>
        <ChannelList channels={channels} />
        <form onSubmit={this.addChannel}>
          <input
            name="channel"
            placeholder="channel"
            onChange={this.onChange}
            value={channel}
          />
        </form>
      </div>
    );
  }
}
