import React, { Component } from "react";

import "./auth.css";
import { User } from "../../interfaces";
import { Input } from "../../components/atoms";

export class AuthPage extends Component {
  name = "";

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUser: User = {
      id: this.name,
      name: this.name,
      isOpened: false,
    };
    localStorage.setItem("user", JSON.stringify(newUser));
    window.location.href = "/";
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.name = e.target.value;
  };

  render() {
    return (
      <div className="auth-page">
        <h1>Lean Slack</h1>
        <form onSubmit={this.onSubmit}>
          <Input
            kind="primary"
            placeholder="what's your name"
            name="name"
            onChange={this.onChange}
            required
            style={{
              width: "80vw",
              maxWidth: "500px",
            }}
          />
        </form>
      </div>
    );
  }
}
