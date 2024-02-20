import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DonationForm from "./DonationForm";
import { DonorNavigationBar } from "./DonorNavigationBar";

export function DonationLandingPage() {
  const [showForm, setShowForm] = useState(false);
  const donorObj = JSON.parse(localStorage.getItem("donor"));
  const navigate = useNavigate();

  const handleDonateNowClick = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    if (donorObj == null) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <DonorNavigationBar></DonorNavigationBar>
      {/* <Container fluid > */}
      <Container className="bg-light mb-3">
        <Row className="justify-content-center align-items-center">
          {/* <Col lg={12}> */}
            <h1 className="text-center mb-4">
              Join us in making a difference
            </h1>
            <p className="lead text-center mb-4">
              Your support helps us continue to provide essential services to
              those in need.
            </p>
          {/* </Col> */}
          <Col lg={6}>
            <div>
              <img src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                width={568}
                className="rounded"
              ></img>
            </div>
          </Col>
          <Col lg={6}>
            <Row className="g-4 justify-content-center">
              <div className=" text-center">
                <Card border="primary" className="h-100 rounded-3">
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <Card.Title className="mb-3">Make a Donation</Card.Title>
                    <Card.Text>
                      Your donation can change lives in more ways than one. It
                      can provide a family with a week's worth of food, offer
                      a homeless person a safe shelter, and also provide
                      stationary, clothing, and other essentials to those in
                      need. Your generosity can make a significant impact on
                      people's lives and provide them with the basic
                      necessities they need to thrive. Imagine the joy on a
                      child's face when they receive new clothes, or the
                      gratitude a struggling family feels when they receive
                      your help. Your donation can be the catalyst for change
                      and create a ripple effect of positivity in your
                      community. Join us in making a difference and donate
                      today!
                    </Card.Text>
                    <Button
                      variant="primary"
                      size="lg"
                      className="align-self-center"
                      onClick={handleDonateNowClick}
                    >
                      Donate Now
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            </Row>

          </Col>
          <div className="text-center mb-5">

          </div>
          {showForm && <DonationForm />}
        </Row>
      </Container>
      {/* </Container> */}
    </>
  );
}
