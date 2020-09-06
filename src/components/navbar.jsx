import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Nav } from 'react-bootstrap';
import{Link,NavLink} from 'react-router-dom';
const NavBar = () => {
  return (
    <div className="container">
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto">
          <Nav.Link href="/allstory">All Stories</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
};
export default NavBar;
