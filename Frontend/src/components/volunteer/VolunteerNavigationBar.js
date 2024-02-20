import { Component } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export class VolunteerNavigationBar extends Component {
  handleLogout = () => {
    localStorage.removeItem("volunteer");
  };

  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to={"/volunteerHome"}>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/volunteerProfile"}>
                <Nav.Link>View Profile</Nav.Link>
              </LinkContainer>
              {/* <LinkContainer to={'/volunteerDonationAssign'}>
                                <Nav.Link>VolunteerDonationDetails</Nav.Link>
                            </LinkContainer> */}
              <LinkContainer to={"/volunteerDonationToBeCollected"}>
                <Nav.Link>Donations to be collected</Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/volunteerDonationIsCollected"}>
                <Nav.Link>Donations to be delivered</Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/"}>
                <Nav.Link onClick={this.handleLogout}>Logout</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
