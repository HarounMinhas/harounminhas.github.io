import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import AccessibilityControls from './AccessibilityControls';
import ThemeSwitcher from './ThemeSwitcher';

const MainNavbar = () => {
  return (
    <Navbar expand="lg" fixed="top" className="py-3" aria-label="Hoofd navigatie">
      <Container className="align-items-center gap-3">
        <Navbar.Brand as={Link} to="/" className="fw-semibold text-uppercase mb-0">
          Logopedie Marieke
        </Navbar.Brand>
        <div className="d-flex align-items-center ms-auto gap-2">
          <ThemeSwitcher />
          <Navbar.Toggle aria-controls="main-navbar" aria-label="Navigatie tonen" />
        </div>
        <Navbar.Collapse id="main-navbar" className="justify-content-end">
          <Nav className="align-items-lg-center">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/over-mij">
              Over mij
            </Nav.Link>
            <Nav.Link as={NavLink} to="/diensten">
              Diensten
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
              Contact
            </Nav.Link>
            <Nav.Link as={NavLink} to="/alternatieve-opmaak">
              Alternatieve opmaak
            </Nav.Link>
            <div className="d-lg-none">
              <hr className="my-2" />
            </div>
            <div className="ms-lg-3">
              <AccessibilityControls variant="navbar" />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
