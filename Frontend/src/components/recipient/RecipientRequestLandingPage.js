import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getRecipientFromServer } from "../../services/RecipientApiService";
import DonationForm from "./DonationForm";
import { RecipientNavigationBar } from "./RecipientNavigationBar";

export function RecipientRequestLandingPage() {
  const [showForm, setShowForm] = useState(false);
  const [recipientDetails, setRecipientDetails] = useState({});
  const recipientObj = JSON.parse(localStorage.getItem("recipient"));
  const navigate = useNavigate();

  async function fetchRecipientDetails() {
    const response = await getRecipientFromServer(recipientObj.recipientId);
    console.log(response.data);
    setRecipientDetails(response.data);
  }

  useEffect(() => {
    if (recipientObj == null) {
      navigate("/");
    }
    fetchRecipientDetails();
  }, []);

  const handleDonateNowClick = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      {(() => {
        if (recipientDetails.kycverified) {
          return (
            <>
              <RecipientNavigationBar
                status={recipientDetails.kycverified}
              ></RecipientNavigationBar>
              <Container
                fluid
                className="bg-light py-5"
                style={{ minHeight: "520px" }}
              >
                <Container>
                  <Row className="justify-content-center align-items-center">
                    <Col lg={12}>
                      <h1 className="text-center mb-4">
                        Request Donations for Stationary, Raw Food and Clothing
                      </h1>
                      <p className="lead text-center mb-5">
                        You can request a donation through CharityXchange. Our
                        platform helps bridge the gap between donors and
                        recipients by providing an appropriate platform for
                        donation requests.
                      </p>
                      <Row className="g-4 justify-content-center">
                        <div className="col-md-8 text-center">
                          <Card border="primary" className="h-100 rounded-3">
                            <Card.Body className="d-flex flex-column justify-content-between">
                              <Card.Title className="mb-3">
                                Request a Donation
                              </Card.Title>
                              <Card.Text>
                                Kindly complete the donation request form
                                provided below, and our team will ensure that
                                your needs for stationary, raw food, and
                                clothing are fulfilled by connecting you with
                                donors who can provide the necessary support.
                              </Card.Text>
                              <Button
                                variant="primary"
                                size="lg"
                                className="align-self-center"
                                onClick={handleDonateNowClick}
                              >
                                Request Now
                              </Button>
                            </Card.Body>
                          </Card>
                        </div>
                      </Row>
                      {showForm && <DonationForm />}
                    </Col>
                  </Row>
                </Container>
              </Container>
            </>
          );
        } else {
          navigate("/recipientHome");
        }
      })()}
    </>
  );
}
