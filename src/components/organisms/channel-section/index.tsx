import React, { Component } from "react";

import "../section-style.css";
import { ChannelList } from "../channel-list";
import { Channel } from "../../../interfaces";
import { Input } from "../../atoms";

interface TProps {
  channels: Channel[];
  addChannel: (channel: Channel) => void;
  openChannel: (channel: Channel) => void;
  addingChannel: boolean;
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
    const { channels, openChannel, addingChannel } = this.props;

    return (
      <div className="channel-section">
        <h3>Channels</h3>
        <ChannelList channels={channels} openChannel={openChannel} />
        <form onSubmit={this.addChannel}>
          <Input
            kind="blue"
            name="channel"
            placeholder="Add channel"
            onChange={this.onChange}
            value={channel}
            disabled={addingChannel}
          />
        </form>
      </div>
    );
  }
}
