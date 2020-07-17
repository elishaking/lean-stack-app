import React from "react";
import { render } from "@testing-library/react";

import { ChannelList } from ".";

describe("<ChannelItem />", () => {
  describe("Render", () => {
    it("should render properly", () => {
      const channels = ["General", "Random", "Chat"];
      const { getByText } = render(<ChannelList channels={channels} />);

      expect(getByText(`# ${channels[0]}`)).toBeInTheDocument();
      expect(getByText(`# ${channels[1]}`)).toBeInTheDocument();
      expect(getByText(`# ${channels[2]}`)).toBeInTheDocument();
    });
  });
});
