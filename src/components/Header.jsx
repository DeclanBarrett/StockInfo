import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import "../css/Header.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CheckAuth, RemoveAuth } from "./Auth.js"

//Displays the header at the top of the page
export default function Header() {
  //Used for switching between Mobile and Deskptop modes
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <header>
      <Navbar expand="md">
        {/* Sets Site Icon with link and hamburger */}
        <NavbarBrand href="/"> 
          <div id="icon">
            <img src="../img/iconWhite.png" alt="Icon" />
          </div>
        </NavbarBrand>

        {/* Sets Site Icon with link and hamburger */}
        <NavbarToggler onClick={toggle}>
          <div id="hamburger">
            <img src="../img/burger.png" alt="Hamburger" />
          </div>
        </NavbarToggler>

        {/* Displays the rest of the headerbar links and sets links */}
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/symbols"> Symbols </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/quote"> Quote </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/pricehistory"> Price History {PriceHistoryTypes()}
              </NavLink>
            </NavItem>
          </Nav>
          <SignUpOptions />
        </Collapse>

      </Navbar>
    </header>
  );
}

/* Deals with authorisation display options */
function PriceHistoryTypes() {
  //Way of forcing update
  const location = useLocation();

  if (CheckAuth()) {
    return ""
  } else {
    return " (restricted)"
  }
}

function SignUpOptions() {
  //Way of forcing update
  const location = useLocation();

  //Provides a log out button or register/login
  if (CheckAuth()) {
    return (
      <Nav className="ml-auto">
        <NavItem> <NavLink tag={Link} to="/" onClick={event => { RemoveAuth() }}> Log Out </NavLink></NavItem>
      </Nav>
    )
  } else {
    return (
      <Nav className="ml-auto" navbar>
        <NavItem> <NavLink tag={Link} to="/login/"> Log In </NavLink> </NavItem>
        <NavItem> <NavLink className="signin" tag={Link} to="/register"> Register </NavLink> </NavItem>
      </Nav>
    )
  }
}