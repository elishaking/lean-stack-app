import React, { Component } from "react";
import { RouteComponentProps } from "@reach/router";

export class MainPage extends Component<RouteComponentProps> {
  state = {
    channels: [],
    users: [],
    messages: [],
  };

  render() {
    return (
      <div>
        <h1>Main Page</h1>
      </div>
    );
  }
}
