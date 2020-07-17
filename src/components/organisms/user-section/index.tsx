import React, { Component } from "react";

import "../section-style.css";
import { User } from "../../../interfaces/user";
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
    const { user } = this.state;
    const { users, openUser } = this.props;

    return (
      <div className="user-section">
        <UserList users={users} openUser={openUser} />
        <form onSubmit={this.addUser}>
          <input
            name="user"
            placeholder="Add user"
            onChange={this.onChange}
            value={user}
          />
        </form>
      </div>
    );
  }
}
