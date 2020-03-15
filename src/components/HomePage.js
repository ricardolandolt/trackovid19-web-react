import React, { Component } from "react";
import AuthPage from "./Auth/AuthPage";

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <h1>Hello Covid!</h1>
        <AuthPage />
      </div>
    );
  }
}
