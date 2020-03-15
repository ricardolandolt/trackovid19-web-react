import React, { Component } from "react";
import OAuth from "./OAuth";

const providers = [
  { name: "google", icon: "fab fa-google" },
  { name: "facebook", icon: "fab fa-facebook-square" }
];

export default class AuthPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  render() {
    const buttons = providers => providers.map(provider => <OAuth provider={provider} key={provider} />);

    return (
      <div className="row">
        <div className="col-12">{this.state.loading ? <span>loadding...</span> : buttons(providers)}</div>
      </div>
    );
  }
}
