import React from "react";
import { render } from "@testing-library/react";

import { UserItem } from ".";
import { User } from "../../../interfaces/user";

describe("<UserItem />", () => {
  describe("Render", () => {
    it("should render properly", () => {
      const user: User = {
        id: "King E",
        name: "King E",
        isOpened: false,
      };
      const { getByText } = render(
        <UserItem user={user} openUser={(u) => {}} />
      );
      expect(getByText(`${user.name}`)).toBeInTheDocument();
    });
  });
});
