import React, { Component } from "react";
import PropTypes from "prop-types";

export default class DashboardCard extends Component {
  render() {
    const { title, subTitle, icon, footerLabel } = this.props;

    return (
      <div className="card dash-card">
        <div className="card-body">
          <h3 className="h4">{title}</h3>
          <span className="d-block h5">{subTitle}</span>
          <i className={icon}></i>
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
