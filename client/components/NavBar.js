import React from "react";
import Link from "next/link";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setUser } from "../redux/action/globalAction";

const NavBar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    router.push("/login");
  };
  const { hasLogin } = useSelector((state) => state.globalReducer);
  return (
    <Navbar expand="lg" className="shadow-sm bg-white rounded">
      <Container>
        <Navbar.Brand
          href="/"
          className="primary-color oregano"
          style={{ fontSize: "1.8rem" }}
        >
          Binar Platinum - K1
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Link href="/" passHref>
            <Nav.Link className="primary-color">Home</Nav.Link>
          </Link>
          <Link href="/games" passHref>
            <Nav.Link className="primary-color">Games</Nav.Link>
          </Link>
          {hasLogin && (
            <Link href="/profile" passHref>
              <Nav.Link className="primary-color">Profile</Nav.Link>
            </Link>
          )}
          {hasLogin ? (
            <Nav.Link onClick={handleLogout} className="btn btn-danger">
              Logout
            </Nav.Link>
          ) : (
            <Link href="/login" passHref>
              <Nav.Link className="primary-color">Login</Nav.Link>
            </Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
