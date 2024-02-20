import { useEffect } from "react";
import { Alert, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DonorNavigationBar } from "./DonorNavigationBar";

export function DonorHome() {
  const donorObj = JSON.parse(localStorage.getItem("donor"));
  const navigate = useNavigate();

  useEffect(() => {
    if (donorObj == null) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <DonorNavigationBar></DonorNavigationBar>
      <Container className=" mb-2" style={{ minHeight: "375px" }} >
        {/* <Row className="justify-content-center align-items-center"> */}
        <Row >
          
          <Container className="d-flex justify-content-center p-2 mx-auto">
          <h1 className="mb-4 text-primary">
              Welcome to the Donor Interface!
          </h1>
            
          </Container>
       
          <Col lg={6} ><img width={500} src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"></img>
          </Col>
          <Col xs={12} md={8} lg={6} className="text-center">
           <Alert variant="primary">
              Donate to Support Your Favorite Causes
            </Alert>
            <p className="mt-4" style={{ fontFamily: "Roboto, sans-serif" }}>
              The Donor Interface makes it easy to support the causes that
              matter most to you. With our platform, you can donate to
              organizations focused on providing stationary, clothing, and raw
              food to those in need. And with our donation tracking system, you
              can keep track of all your donations in one place.
            </p>
            <p className="mt-4" style={{ fontFamily: "Roboto, sans-serif" }}>
              When you sign up for a Donor account, you'll have access to your
              own profile page where you can view your donation history. Our
              platform is designed to make giving easy, so you can focus on
              making a difference in the world.
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
