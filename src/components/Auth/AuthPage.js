import React, { Component } from "react";
import OAuth from "./OAuth";

const providers = ["google", "facebook"];

export default class AuthPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  render() {
    const buttons = (providers) => providers.map(provider => <OAuth provider={provider} key={provider} />);

    return <div className="container">{this.state.loading ? <span>loadding...</span> : buttons(providers)}</div>;
  }
}
