import React, { Component } from "react";
import PropTypes from "prop-types";

export default class DashboardCard extends Component {
  render() {
    const { title, subTitle, icon, footerLabel } = this.props;

    return (
      <div className="card">
        <div className="card-body">
          <h3>{title}</h3>
          <p>{subTitle}</p>
          <i className={"position-absolute text-primary " + icon}></i>
        </div>
        <div className="card-footer">
          <p className="text-muted">{footerLabel}</p>
        </div>
      </div>
    );
  }
}

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  footerLabel: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};
