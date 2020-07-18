import React from "react";
import { render } from "@testing-library/react";

import { MessageItem } from ".";
import { Message } from "../../../interfaces";

describe("<MessageItem />", () => {
  describe("Render", () => {
    it("should render properly", () => {
      const message: Message = {
        id: "message-1",
        text: "New message",
        date: Date.now(),
        user: {
          id: "King E",
          name: "King E",
          isOpened: false,
        },
      };
      const { getByText } = render(<MessageItem message={message} />);
      expect(getByText(`${message.text}`)).toBeInTheDocument();
      expect(getByText(`${message.user.name}`)).toBeInTheDocument();
    });
  });
});
