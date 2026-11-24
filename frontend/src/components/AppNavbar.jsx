import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AppNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Navbar expand="lg" variant="dark" sticky="top" className="app-navbar">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="brand">
          🍽️ La Bella Tavola
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-lg-center">
            <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
            <Nav.Link as={NavLink} to="/booking">Booking</Nav.Link>
            <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>

            {user?.role === "admin" && (
              <Nav.Link as={NavLink} to="/admin">Admin Panel</Nav.Link>
            )}

            {user ? (
              <>
                <span className="text-light mx-lg-3 my-2 my-lg-0 small">
                  Hi, {user.name}
                </span>
                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <div className="d-flex gap-2 mt-2 mt-lg-0 ms-lg-3">
                <Button as={NavLink} to="/login" variant="outline-light" size="sm">
                  Login
                </Button>
                <Button as={NavLink} to="/register" variant="warning" size="sm">
                  Register
                </Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
