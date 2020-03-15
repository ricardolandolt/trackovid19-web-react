import React, { Component } from "react";
import PropTypes from "prop-types";
import { API_URL } from "../../services/config";

export default class OAuth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      disabled: ""
    };
  }

  componentDidMount() {
    const { provider } = this.props;

    fetch(`${API_URL}/${provider.name}`).then(res => {
      this.popup.close();
      this.setState({ user: res.user });
    });
    // socket.on(provider, user => {
    //   this.popup.close();
    //   this.setState({ user });
    // });
  }

  checkPopup() {
    const check = setInterval(() => {
      const { popup } = this;
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);
        this.setState({ disabled: "" });
      }
    }, 1000);
  }

  openPopup() {
    const { provider } = this.props;
    const width = 600,
      height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const url = `${API_URL}/${provider.name}`;

    return window.open(
      url,
      "",
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    );
  }

  startAuth = () => {
    if (!this.state.disabled) {
      this.popup = this.openPopup();
      this.checkPopup();
      this.setState({ disabled: "disabled" });
    }
  };

  closeCard = () => {
    this.setState({ user: {} });
  };

  render() {
    const { name, photo } = this.state.user;
    const { provider } = this.props;
    const { disabled } = this.state;
    const atSymbol = provider.anme === "twitter" ? "@" : "";

    return (
      <div>
        {name ? (
          <div className="card">
            <img src={photo} alt={name} />
            <span onClick={this.closeCard}>X</span>
            <h4>{`${atSymbol}${name}`}</h4>
          </div>
        ) : (
          <div className="button-wrapper fadein-fast">
            <button onClick={this.startAuth} className={`btn btn-${provider.name} ${disabled}`}>
              <i className={provider.icon}></i>
              {provider.name}
            </button>
          </div>
        )}
      </div>
    );
  }
}

OAuth.propTypes = {
  provider: PropTypes.object.isRequired
  //socket: PropTypes.object.isRequired
};
