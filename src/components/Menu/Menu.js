import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuItems: [
        { name: "Dashboard", icon: "fas fa-tachometer-alt", url: "/" },
        { name: "Questionário", icon: "fas fa-address-card", url: "/terms" },
        { name: "Contactos", icon: "fas fa-address-card", url: "/about" },
        { name: "Mapa", icon: "fas fa-address-card", url: "/" }
      ]
    };
  }
  render() {
    const { menuItems } = this.state;
    const { pathname } = this.props.location;

    return (
      <ul className="list-unstyled d-flex justify-content-between ml-4 mr-4">
        {menuItems.map((m,i) => (
          <li className="text-center" key={'menu-item-'+i}>
            <Link to={m.url} className={m.url === pathname ? "" : "text-body"}>
              <i className={m.icon}></i>
              <p className="mb-0 text-muted small">{m.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    );
  }
}
