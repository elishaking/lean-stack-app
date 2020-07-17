import React from "react";

import { ChannelItem } from "../../molecules";
import { Channel } from "../../../interfaces/channel";

interface TProps {
  channels: Channel[];
  openChannel: (channel: Channel) => void;
}

export const ChannelList = ({ channels, openChannel }: TProps) => {
  return (
    <ul>
      {channels.map((channel) => {
        return (
          <ChannelItem
            key={channel.id}
            channel={channel}
            openChannel={openChannel}
          />
        );
      })}
    </ul>
  );
};
