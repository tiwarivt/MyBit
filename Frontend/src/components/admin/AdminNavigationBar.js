import { Component } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export class AdminNavigationBar extends Component {

    handleLogout = () => {
        localStorage.removeItem("admin");
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <LinkContainer to={'/adminDonationAssign'}>
                                <Nav.Link>Donation Assign</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={'/adminDonationAlreadyAssign'}>
                                <Nav.Link>Assigned Donation Details</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={'/adminRecipientsList'}>
                                <Nav.Link>All Recipient Details</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={'/adminRecipientVerification'}>
                                <Nav.Link>Recipient KYC verification</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={'/'}>
                                <Nav.Link onClick={this.handleLogout}>Logout</Nav.Link>
                            </LinkContainer>


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}