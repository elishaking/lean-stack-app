import React from "react";
import { ChannelItem } from "../../molecules";

interface TProps {
  channels: string[];
}

export const ChannelList = ({ channels }: TProps) => {
  return (
    <ul>
      {channels.map((channel) => {
        return <ChannelItem key={channel} name={channel} />;
      })}
    </ul>
  );
};
