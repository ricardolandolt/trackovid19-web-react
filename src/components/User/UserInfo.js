import React, { Component } from "react";
import { connect } from "react-redux";

export class UserInfo extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="text-left">
        <h3>{user.name}</h3>
        <p><i className="fas fa-circle text-success"></i> {user.status}</p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { auth } = state;
  return {
    user: { name: "Ricardo Landolt", status: "Quarentena" }
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
