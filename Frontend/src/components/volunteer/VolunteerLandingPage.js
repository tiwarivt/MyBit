import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

export function VolunteerLandingPage() {
  return (
    <Container className="mt-4 text-center">
      <Row>
        <Col>
          <h2>Welcome to the Volunteer Portal</h2>
          <p>You are now logged in as a volunteer.</p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={{ span: 4, offset: 4 }}>
          <Button block href="#" variant="primary">
            View Volunteer Tasks
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
