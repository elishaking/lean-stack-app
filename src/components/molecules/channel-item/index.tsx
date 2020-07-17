import React from "react";

interface TProps {
  name: string;
}

export const ChannelItem = ({ name }: TProps) => {
  return <li># {name}</li>;
};
