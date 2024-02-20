import React from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { NavigationBar } from "./NavigationBar";
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <>
      <NavigationBar></NavigationBar>
      <Container className="bg-light text-center mt-2 p-2 rounded">
        <h1 className="display-4 text-primary mb-2 font-weight-bold">
          MyBit: NGO Donation Platform
        </h1>
        <p className="lead">
          Our mission is to help you make a positive impact on the world by
          enabling you to easily donate to causes you care about.
        </p>
      </Container>
      <Container className="mt-5 bg-white rounded shadow-lg">
        <h1 className="text-center mb-5">About Us</h1>
        <Row className="align-items-center mb-5">
          <Col md={6}>
            <Image
              src="https://c0.wallpaperflare.com/preview/287/860/54/team-ethnicity-group-hands.jpg"
              alt="About Us"
              fluid
            />
          </Col>
          <Col md={6}>
            <h2 className="mb-4">MyBit</h2>
            <p>
              In India, we often see NGOs and donors working in silos lacking a
              common standardized platform to handle end-to-end donation
              processes. MyBit aims to address this critical issue by
              bridging this gap between donors and recipients. In this system,
              donors will be assisted throughout the donation decision-making
              process. Verified recipients’ demands will be fulfilled swiftly
              through volunteers. This platform promises to bring credibility
              and efficiency in the existing system.
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={3}>
            <Card className="p-3 mb-3 bg-secondary text-white rounded shadow">
              <Card.Body>
                <i className="fas fa-bullseye fa-3x mb-3"></i>
                <Card.Title>Vision</Card.Title>
                <Card.Text>
                  The idea is to create self-sustained chapters across the world
                  who will look after their local community. And in the process,
                  inspire people around us to give back to those who need it
                  most.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="p-3 mb-3 bg-success text-white rounded shadow">
              <Card.Body>
                <i className="fas fa-users fa-3x mb-3"></i>
                <Card.Title>Who We Are</Card.Title>
                <Card.Text>
                  The MyBit is a volunteer-based, zero-funds
                  organization that works to get surplus food, stationary,
                  clothes from society and the community to serve them to the
                  less fortunate people.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="p-3 mb-3 bg-info text-white rounded shadow">
              <Card.Body>
                <i className="fas fa-bullhorn fa-3x mb-3"></i>
                <Card.Title>Mission</Card.Title>
                <Card.Text>
                  The idea is to create self-sustained chapters across the world
                  who will look after their local community. And in the process,
                  inspire people around us to give back to those who need it
                  most.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

    </>
  );
};

export default AboutUs;
