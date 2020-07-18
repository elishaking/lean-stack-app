import React from "react";

import { User } from "../../../interfaces";

interface TProps {
  user: User;
  openUser: (user: User) => void;
}

export const UserItem = ({ user, openUser }: TProps) => {
  const open = () => openUser(user);

  return (
    <li className={user.isOpened ? "opened" : undefined} onClick={open}>
      😀 {user.name}
    </li>
  );
};
