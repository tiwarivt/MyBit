import { useEffect, useMemo, useState } from "react";
import { Alert, Container, Row, Col, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getRecipientFromServer } from "../../services/RecipientApiService";
import { RecipientNavigationBar } from "./RecipientNavigationBar";

export function RecipientHome() {
  const [recipientDetails, setRecipientDetails] = useState({});
  const recipientObj = JSON.parse(localStorage.getItem("recipient"));
  const navigate = useNavigate();

  const fetchRecipientDetails = async () => {
    const response = await getRecipientFromServer(recipientObj.recipientId);
    console.log("inside fetchRecipientFromServer " + response.data);
    setRecipientDetails(response.data);
  };

  useMemo(() => {
    fetchRecipientDetails();
    console.log("this will run the first time the component renders!");
  }, []);

  useEffect(() => {
    if (recipientObj == null) {
      navigate("/");
    }
    console.log("this will run the second time the component renders!");
  }, []);

  //having different elements to render based on kyc-status
  if (recipientDetails.kycverified) {
    console.log("inside if");
    return (
      <>
        {" "}
        <RecipientNavigationBar
          status={recipientDetails.kycverified}
        ></RecipientNavigationBar>
        <Container fluid className="mt-3 mb-3">
          <Row className="justify-content-center align-items-center">
            <Col xs={12} md={8} lg={6} className="text-center">
              <div className="card shadow-lg rounded-lg border-0">
                <div className="card-body p-5">
                  <h1 className="mb-4 text-primary">
                    Verified Recipient under Indian Law
                  </h1>
                  <Alert variant="success">
                    You are now eligible to receive donations from
                    CharityXChange
                  </Alert>
                  <p
                    className="mt-4"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    Congratulations! You are now a verified recipient under
                    Indian law, and eligible to receive donations from
                    CharityXChange to support your organization's cause. Our
                    platform makes it easy for donors to find and support your
                    organization, and for you to manage and track your donations
                    in one place.
                  </p>
                  <p
                    className="mt-4"
                    style={{ fontFamily: "Roboto, sans-serif" }}
                  >
                    As a verified recipient, you can now create requests for
                    specific donation needs, such as stationary, clothing, and
                    raw food, which will be fulfilled by CharityXChange. Our
                    platform ensures that your donation requests are seen by our
                    network of donors, who are passionate about making a
                    difference in the world.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  } else if (!recipientDetails.kycverified) {
    console.log("inside else if");
    return (
      <>
        <RecipientNavigationBar
          status={recipientDetails.kycverified}
        ></RecipientNavigationBar>
        <Container className="mt-5 mb-5">
          <Row className="justify-content-center align-items-center">
            <Col xs={12} md={8} lg={6}>
              <Card className="p-4 shadow">
                <Card.Title
                  className="text-primary text-center mb-4"
                  style={{ fontSize: "2.5rem" }}
                >
                  Welcome to the Recipient Interface!
                </Card.Title>
                <div style={{ fontFamily: "Roboto, sans-serif" }}>
                  <p>
                    Thank you for choosing to use the Recipient Interface of
                    CharityXChange.
                  </p>
                  <p className="mt-4">
                    Our platform is designed to provide a secure and efficient
                    way for verified recipients to fill request forms for
                    donations of food, clothing, and stationary. Once your KYC
                    has been verified by CharityXChange, you will be able to
                    access your own profile page and start filling request forms
                    for donations.
                  </p>
                  <p>
                    We are committed to making your experience as a recipient as
                    seamless as possible, so you can focus on achieving your
                    goals and making a positive impact on the world.
                  </p>
                </div>
                <Alert variant="warning" className="mt-4">
                  <strong>
                    Your Registration ID verification is currently in progress.
                    Please wait!
                  </strong>
                </Alert>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
