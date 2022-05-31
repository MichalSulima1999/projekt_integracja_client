import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";

function NavBar() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();
  const signOut = async () => {
    await logout();
    navigate("/logout");
  };

  const location = useLocation();
  const [url, setUrl] = useState(null);
  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  return (
    <>
      <Navbar
        className="navBarSection mt-3 navbar-light bg-light"
        collapseOnSelect
        expand="lg"
      >
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto pt-3 pb-3">
              <Nav.Link eventKey={1}>
                <Link
                  to="/"
                  className={"nav-link" + (url === "/" ? " active" : "")}
                >
                  Home
                </Link>
              </Nav.Link>
              <NavDropdown.Divider hidden={!auth?.accessToken}/>
              <Nav.Link eventKey={2} hidden={!auth?.accessToken}>
                <Link
                  to="/showCpus"
                  className={"nav-link" + (url === "/showCpus" ? " active" : "")}
                >
                  Show cpus
                </Link>
              </Nav.Link>
              <NavDropdown.Divider hidden={!auth?.accessToken} />
              <Nav.Link eventKey={3} hidden={!auth?.accessToken}>
                <Link
                  to="/manageCpus"
                  className={
                    "nav-link" + (url === "/manageCpus" ? " active" : "")
                  }
                >
                  Manage cpus
                </Link>
              </Nav.Link>
              <NavDropdown.Divider hidden={!auth?.accessToken} />
              <Nav.Link eventKey={3} hidden={!auth?.accessToken}>
                <Link
                  to="/admin/show_users"
                  className={
                    "nav-link" + (url === "/manageUsers" ? " active" : "")
                  }
                >
                  Manage users
                </Link>
              </Nav.Link>
              <NavDropdown.Divider hidden={auth?.accessToken} />
              <Nav.Link eventKey={4} hidden={auth?.accessToken}>
                <Link
                  to="/login"
                  className={"nav-link" + (url === "/login" ? " active" : "")}
                >
                  Login
                </Link>
              </Nav.Link>
              <NavDropdown.Divider hidden={auth?.accessToken} />
              <Nav.Link eventKey={5} hidden={auth?.accessToken}>
                <Link
                  to="/register"
                  className={
                    "nav-link" + (url === "/register" ? " active" : "")
                  }
                >
                  Register
                </Link>
              </Nav.Link>
              <NavDropdown.Divider hidden={!auth?.accessToken} />
              <Nav.Link eventKey={6} hidden={!auth?.accessToken}>
                <p
                  onClick={signOut}
                  className="nav-link"
                >
                  Logout
                </p>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
