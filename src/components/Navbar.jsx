import React from "react";
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
const GalleryNavbar = () => {
  return (
    <Navbar bg="light" expand="lg" className="d-flex justify-content-between">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <h3 className="text-secondary">Gallery</h3>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link to="/" as={Link}>
              Home
            </Nav.Link>
            <NavDropdown title="username">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link to="/login" as={Link}>
              Login
            </Nav.Link>
            <Nav.Link to="/signup" as={Link}>
              Signup
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default GalleryNavbar;
