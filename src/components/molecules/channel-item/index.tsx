import React from "react";
import { Channel } from "../../../interfaces/channel";

interface TProps {
  channel: Channel;
  openChannel: (channel: Channel) => void;
}

export const ChannelItem = ({ channel, openChannel }: TProps) => {
  const open = () => openChannel(channel);

  return (
    <li className={channel.isOpened ? "opened" : undefined} onClick={open}>
      <strong>#</strong> {channel.name}
    </li>
  );
};
