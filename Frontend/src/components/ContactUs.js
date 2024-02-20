import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { NavigationBar } from "./NavigationBar";
import Footer from "./Footer";

export function Contact() {
  return (
    <>
      <NavigationBar />
      <Container className="bg-light text-center mt-2 p-2 pb-1 rounded">
        <h1 className="display-4 text-primary mb-4 font-weight-bold">
          MyBit: NGO Donation Platform
        </h1>
        <p className="lead">
          Our mission is to help you make a positive impact on the world by
          enabling you to easily donate to causes you care about.
        </p>
      </Container>
      <Container
        className="bg-lighter mt-0 p-0 rounded"
        style={{ marginBottom: "100px" }}
      >
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="bg-lighter mt-0 p-0 rounded">
              <h1 className="text-center font-weight-bold mb-4">Contact Us</h1>
              <p className="text-center font-weight-bold mb-4 lead">
                In India, we often see NGOs and donors working in silos lacking
                a common standardized platform to handle end-to-end donation
                processes.
                <span className="text-primary"> MyBit</span> aims to
                address this critical issue by bridging this gap between donors
                and recipients. In this system, donors will be assisted
                throughout the donation decision-making process. Verified
                recipients’ demands will be fulfilled swiftly through
                volunteers. This platform promises to bring credibility and
                efficiency in the existing system.
              </p>
              <p className="text-center lead">
                If you have any questions, feedback, or want to get involved
                with
                <span className="text-primary"> MyBit</span>, please
                don't hesitate to reach out to us.
              </p>
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div className="card shadow">
                    <div className="card-body">
                      <h2 className="text-primary font-weight-bold mb-4">
                        Contact Information:
                      </h2>
                      <p className="mb-0">
                        <i className="fas fa-map-marker-alt mr-2"></i>
                        Address: XYZ street, ABC city, India
                      </p>
                      <p className="mb-0">
                        <i className="fas fa-envelope mr-2"></i>
                        Email: info@mybit.com
                      </p>
                      <p className="mb-0">
                        <i className="fas fa-phone-alt mr-2"></i>
                        Phone: +91-1234567890
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card shadow">
                    <div className="card-body">
                      <p className="text-primary font-weight-bold mb-4">
                        For inquiries or partnership opportunities, please
                        contact us:
                        <br />
                        Email:{" "}
                        <a
                          href="mailto:info@MyBit.com"
                          style={{ color: "black" }}
                        >
                          info@mybit.com
                        </a>
                      </p>
                      <p>Phone: +91-1234567890</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

    </>
  );
}
