import React from "react";
import { render } from "@testing-library/react";

import { MessageList } from ".";
import { Message } from "../../../interfaces/message";

describe("<MessageList />", () => {
  describe("Render", () => {
    it("should render properly", () => {
      const messages: Message[] = [
        {
          id: "message-1",
          text: "New message",
          date: Date.now(),
          user: {
            id: "King E",
            name: "King E",
            isOpened: false,
          },
        },
      ];
      const { getByText } = render(<MessageList messages={messages} />);

      expect(getByText(messages[0].text)).toBeInTheDocument();
      expect(getByText(messages[0].user.name)).toBeInTheDocument();
    });
  });
});
