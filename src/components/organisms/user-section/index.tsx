import React, { Component } from "react";

import "../section-style.css";
import { User } from "../../../interfaces";
import { UserList } from "../user-list";

interface TProps {
  users: User[];
  addUser: (User: User) => void;
  openUser: (User: User) => void;
}

export class UserSection extends Component<TProps> {
  state = {
    user: "",
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      user: e.target.value,
    });
  };

  addUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.addUser({
      id: this.state.user,
      name: this.state.user,
      isOpened: false,
    });
    this.setState({
      user: "",
    });
  };

  render() {
    const { users, openUser } = this.props;

    return (
      <div className="user-section">
        <h3>Users</h3>
        <UserList users={users} openUser={openUser} />
      </div>
    );
  }
}
