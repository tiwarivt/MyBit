import { Component } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export class DonorNavigationBar extends Component {
  handleLogout = () => {
    localStorage.removeItem("donor");
  };

  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to={"/donorHome"}>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/donorProfile"}>
                <Nav.Link>View Profile</Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/donationForm"}>
                <Nav.Link>Donation form</Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/donordonationdetails"}>
                <Nav.Link>Donation Details</Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/"}>
                <Nav.Link onClick={this.handleLogout}>Logout </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
