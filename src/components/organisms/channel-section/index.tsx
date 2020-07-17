import React, { Component } from "react";

import "../section-style.css";
import { ChannelList } from "../channel-list";
import { Channel } from "../../../interfaces/channel";

interface TProps {
  channels: Channel[];
  addChannel: (channel: Channel) => void;
  openChannel: (channel: Channel) => void;
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
    this.props.addChannel({
      id: this.state.channel,
      name: this.state.channel,
      isOpened: false,
    });
    this.setState({
      channel: "",
    });
  };

  render() {
    const { channel } = this.state;
    const { channels, openChannel } = this.props;

    return (
      <div className="channel-section">
        <ChannelList channels={channels} openChannel={openChannel} />
        <form onSubmit={this.addChannel}>
          <input
            name="channel"
            placeholder="Add channel"
            onChange={this.onChange}
            value={channel}
          />
        </form>
      </div>
    );
  }
}
