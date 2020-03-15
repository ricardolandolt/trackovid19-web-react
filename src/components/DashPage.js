import React, { Component } from "react";
import DashboardCard from "./Cards/DashboardCard";
import { Link } from "react-router-dom";

export default class DashPage extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-12">
          <h1>Hello Covid!</h1>
          <div className="row">
            <div className="col-12">
              <Link to="/about" className="btn btn-primary text-white w-100">Atualizar o meu estado</Link>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <DashboardCard title={"53"} subTitle={"infectados"} footerLabel={"444 indiretos"} icon={"fas fa-heartbeat"} />
            </div>
            </div>
          <div className="row">
            <div className="col-6">
              <DashboardCard title={"53"} subTitle={"infectados"} footerLabel={"444 indiretos"} icon={"fas fa-heartbeat"} />
            </div>
            <div className="col-6">
              <DashboardCard title={"53"} subTitle={"infectados"} footerLabel={"444 indiretos"} icon={"fas fa-heartbeat"} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
