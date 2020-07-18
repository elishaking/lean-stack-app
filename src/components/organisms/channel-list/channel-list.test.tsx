import React from "react";
import { render } from "@testing-library/react";

import { ChannelList } from ".";
import { Channel } from "../../../interfaces";

describe("<ChannelItem />", () => {
  describe("Render", () => {
    it("should render properly", () => {
      const channels: Channel[] = [
        {
          id: "General",
          name: "General",
          isOpened: true,
        },
        {
          id: "Random",
          name: "Random",
          isOpened: true,
        },
        {
          id: "Chat",
          name: "Chat",
          isOpened: true,
        },
      ];
      const { getByText } = render(
        <ChannelList channels={channels} openChannel={(c) => {}} />
      );

      expect(getByText(`# ${channels[0].name}`)).toBeInTheDocument();
      expect(getByText(`# ${channels[1].name}`)).toBeInTheDocument();
      expect(getByText(`# ${channels[2].name}`)).toBeInTheDocument();
    });
  });
});
