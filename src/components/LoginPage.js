import React, { Component } from "react";
import AuthPage from "./Auth/AuthPage";

export default class LoginPage extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-12">
          <h1>Login Covid!</h1>
          <AuthPage />
          <a href="/terms">terms and conditions</a>
        </div>
      </div>
    );
  }
}
