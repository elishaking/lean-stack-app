import React from "react";
import { render } from "@testing-library/react";

import { UserList } from ".";
import { User } from "../../../interfaces/user";

describe("<UserItem />", () => {
  describe("Render", () => {
    it("should render properly", () => {
      const users: User[] = [
        {
          id: "King E",
          name: "King E",
          isOpened: false,
        },
        {
          id: "Shawn J",
          name: "Shawn J",
          isOpened: false,
        },
        {
          id: "Doe B",
          name: "Doe B",
          isOpened: false,
        },
      ];
      const { getByText } = render(
        <UserList users={users} openUser={(c) => {}} />
      );

      expect(getByText(`${users[0].name}`)).toBeInTheDocument();
      expect(getByText(`${users[1].name}`)).toBeInTheDocument();
      expect(getByText(`${users[2].name}`)).toBeInTheDocument();
    });
  });
});
