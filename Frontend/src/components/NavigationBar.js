import { Component } from "react";
import { Container, Image, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "./images/whiteLogo.png";

export class NavigationBar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="me-auto">
              <LinkContainer to={"/"}>
                <Nav.Link>
                  <Image src={logo} alt="CharityXchange" style={{ width: "40px", height: "40px", marginRight: "10px" }} className="d-inline-block align-top" />
                </Nav.Link>
              </LinkContainer>
              <NavDropdown title="Register" id="basic-nav-dropdown">
                <LinkContainer to={"/donorRegistrationForm"}>
                  <NavDropdown.Item>As Donor</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={"/recipientRegistrationForm"}>
                  <NavDropdown.Item>As Recipient</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={"/volunteerRegistrationForm"}>
                  <NavDropdown.Item>As Volunteer</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              <LinkContainer to={"/login"}>
                <Nav.Link style={{ fontSize: "18px" }}>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/ContactUs"}>
                <Nav.Link style={{ fontSize: "18px" }}>Contact us</Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/AboutUs"}>
                <Nav.Link style={{ fontSize: "18px" }}>About us</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
