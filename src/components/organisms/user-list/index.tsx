import React from "react";

import { UserItem } from "../../molecules";
import { User } from "../../../interfaces";

interface TProps {
  users: User[];
  openUser: (User: User) => void;
}

export const UserList = ({ users, openUser }: TProps) => {
  return (
    <ul>
      {users.map((user) => {
        return <UserItem key={user.id} user={user} openUser={openUser} />;
      })}
    </ul>
  );
};
