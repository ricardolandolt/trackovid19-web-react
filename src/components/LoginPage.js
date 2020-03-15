import React, { Component } from "react";
import AuthPage from "./Auth/AuthPage";

export default class LoginPage extends Component {
  render() {
    return (
      <div className="vc_row row-container">
        <div className="container-fluid">
          <div className="row no-gutters row-parent">
            <div className="vc_column column_parent style-light col-lg-12">
              <h1 className="h1 mb-adapt-3">Login Covid!</h1>
              <AuthPage />
              <a href="/terms" className="button mt-adapt-5">terms and conditions</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
