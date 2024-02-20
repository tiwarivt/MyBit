import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { volunteerLogin } from "../../services/VolunteerApiService";
import { NavigationBar } from "../NavigationBar";

export function VolunteerLoginForm() {
  // Define state for form inputs and errors
  const [volunteerDetails, setVolunteerDetails] = useState({
    volunteerEmail: "",
    volunteerPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [volunteerEmailError, setVolunteerEmailError] = useState("");
  const [volunteerPasswordError, setVolunteerPasswordError] = useState("");
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setVolunteerDetails({
      ...volunteerDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors('');
    if (!validate()) {
      return;
    } 
    setLoading(true);

    try {
      const response = await volunteerLogin(volunteerDetails);

      if (response.status === 200) {
        if(response.data === 'Successful Login' ){
            navigate('/volunteerHome');
        }
        else {
            setErrors(response.data);
          }
      }
    } catch (error) {
      setErrors("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }

  };

  const validate = () => {
    let isValid = true;
    // volunteerEmail validation
    if (volunteerDetails.volunteerEmail.trim() === "") {
      setVolunteerEmailError("Email is required");
      isValid = false;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(volunteerDetails.volunteerEmail)
    ) {
      setVolunteerEmailError("Email is not valid");
      isValid = false;
    } else {
      setVolunteerEmailError("");
    }

    // volunteerPassword validation
    if (volunteerDetails.volunteerPassword.trim() === "") {
      setVolunteerPasswordError("Password is required");
      isValid = false;
    } else if (volunteerDetails.volunteerPassword.length < 8) {
      setVolunteerPasswordError(
        "Volunteer Password must be atleast 8 characters long"
      );
      isValid = false;
    } else {
      setVolunteerPasswordError("");
    }
    return isValid;
  };

  return (
    <>
      <NavigationBar></NavigationBar>
      <Container className="mt-4">
        <Form onSubmit={handleSubmit}>
          <h1 className="mb-4">Volunteer Login Form</h1>
          <Row>
            <Col lg={12}>
              <Form.Group className="mb-3">
                <Form.Label>Volunteer Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter email"
                  name="volunteerEmail"
                  value={volunteerDetails.volunteerEmail}
                  onChange={handleChange}
                />
                {volunteerEmailError && (
                  <span style={{ color: "red" }}>{volunteerEmailError}</span>
                )}
              </Form.Group>
            </Col>
            <Col lg={12}>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="volunteerPassword"
                  value={volunteerDetails.volunteerPassword}
                  onChange={handleChange}
                />
                {volunteerPasswordError && (
                  <span style={{ color: "red" }}>{volunteerPasswordError}</span>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Col>
            {errors && <span  style={{ color: "red" }}>{errors}  </span> }
          </Col>

          <Button type="submit" variant="success" disabled={loading}>
            {loading ? "Logging in..." : "Volunteer Login"}
          </Button>
        </Form>
      </Container>
    </>
  );
}
