import React from "react";
import { render } from "@testing-library/react";

import { ChannelItem } from ".";

describe("<ChannelItem />", () => {
  describe("Render", () => {
    it("should render properly", () => {
      const channelName = "General";
      const { getByText } = render(<ChannelItem name={channelName} />);
      expect(getByText(`# ${channelName}`)).toBeInTheDocument();
    });
  });
});
