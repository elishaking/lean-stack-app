import React from "react";
import { render } from "@testing-library/react";

import { ChannelItem } from ".";
import { Channel } from "../../../interfaces/channel";

describe("<ChannelItem />", () => {
  describe("Render", () => {
    it("should render properly", () => {
      const channel: Channel = {
        id: "General",
        name: "General",
        isOpened: false,
      };
      const { getByText } = render(
        <ChannelItem channel={channel} openChannel={(c) => {}} />
      );
      expect(getByText(`# ${channel.name}`)).toBeInTheDocument();
    });
  });
});
