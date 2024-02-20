import { useEffect } from "react";
import { Alert, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { VolunteerNavigationBar } from "./VolunteerNavigationBar";

export function VolunteerHome() {
  const volunteerObj = JSON.parse(localStorage.getItem("volunteer"));
  const navigate = useNavigate();

  useEffect(() => {
    if (volunteerObj == null) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <VolunteerNavigationBar></VolunteerNavigationBar>
      <Container className="mt-5 mb-5" style={{ minHeight: "420px" }}>
        <Row className="justify-content-center align-items-center">
          <Col xs={12} md={8} lg={6} className="text-center">
            <h1 className="mb-4 text-primary">Thank You, Volunteer!</h1>
            <p className="mt-4" style={{ fontFamily: "Roboto, sans-serif" }}>
              Your help is essential in making a positive impact on our
              community. By using our platform, you can see the details of the
              donations that need to be collected, verify them, and deliver them
              to assigned recipients.
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={6} lg={4} className="text-center">
            <Card className="shadow-lg">
              <Card.Body>
                <Card.Title>View Donations</Card.Title>
                <Card.Text>
                  Browse through the list of donations that need to be collected
                  and delivered.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={4} className="text-center">
            <Card className="shadow-lg">
              <Card.Body>
                <Card.Title>Verify Donations</Card.Title>
                <Card.Text>
                  Make sure that the donations you collect are in good condition
                  and match the details listed in the platform.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={4} className="text-center">
            <Card className="shadow-lg">
              <Card.Body>
                <Card.Title>Deliver Donations</Card.Title>
                <Card.Text>
                  Deliver the donations to the assigned recipients and make a
                  difference in their lives.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
