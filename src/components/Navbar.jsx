import React, {useContext} from "react";
import {store} from '../store';
import { Nav, Navbar, NavDropdown, Container } from "react-bootstrap";
import {useHistory} from 'react-router-dom';
import { Link } from "react-router-dom";
const GalleryNavbar = () => {
  const {state, dispatch} = useContext(store);
  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch({type: 'RESET'})
    history.push('/');
  }
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
            {state.user.user ? (<NavDropdown title={state.user.user.name}>
              <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>): (<>
              <Nav.Link to="/login" as={Link}>
              Login
            </Nav.Link>
            <Nav.Link to="/signup" as={Link}>
              Signup
            </Nav.Link>
            </>)}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default GalleryNavbar;
