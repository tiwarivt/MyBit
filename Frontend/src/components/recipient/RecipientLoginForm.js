import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { recipientLogin } from "../../services/RecipientApiService";
import { NavigationBar } from "../NavigationBar";

export function RecipientLoginForm() {
  // Define state for form inputs and errors
  const [recipientDetails, setRecipientDetails] = useState({
    recipientEmail: "",
    recipientPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [recipientEmailError, setRecipientEmailError] = useState("");
  const [recipientPasswordError, setRecipientPasswordError] = useState("");
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRecipientDetails({
      ...recipientDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    if (!validate()) {
      return;
    } else {
      setLoading(true);
      try {
        const response = await recipientLogin(recipientDetails);

        if (response.status === 200) {
          if (response.data === "Successful Login") {
            setRecipientDetails({ recipientEmail: "", recipientPassword: "" });
            navigate("/recipientHome");
          } else {
            setErrors(response.data);
          }
        }
      } catch (error) {
        setErrors("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const validate = () => {
    let isValid = true;
    // recipientEmail validation
    if (recipientDetails.recipientEmail.trim() === "") {
      setRecipientEmailError("Email is required");
      isValid = false;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientDetails.recipientEmail)
    ) {
      setRecipientEmailError("Email is not valid");
      isValid = false;
    } else {
      setRecipientEmailError("");
    }

    // recipientPassword validation
    if (recipientDetails.recipientPassword.trim() === "") {
      setRecipientPasswordError("Password is required");
      isValid = false;
    } else if (recipientDetails.recipientPassword.length < 8) {
      setRecipientPasswordError(
        "Recipient Password must be atleast 8 characters long"
      );
      isValid = false;
    } else {
      setRecipientPasswordError("");
    }
    return isValid;
  };

  return (
    <>
      <NavigationBar></NavigationBar>
      <Container className="mt-4">
        <Form onSubmit={handleSubmit}>
          <h1 className="mb-4">Recipient Login Form</h1>
          <Row>
            <Col lg={12}>
              <Form.Group className="mb-3">
                <Form.Label>Recipient Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter email"
                  name="recipientEmail"
                  value={recipientDetails.recipientEmail}
                  onChange={handleChange}
                />
                {recipientEmailError && (
                  <span style={{ color: "red" }}>{recipientEmailError}</span>
                )}
              </Form.Group>
            </Col>
            <Col lg={12}>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="recipientPassword"
                  value={recipientDetails.recipientPassword}
                  onChange={handleChange}
                />
                {recipientPasswordError && (
                  <span style={{ color: "red" }}>{recipientPasswordError}</span>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Col>{errors && <span style={{ color: "red" }}>{errors} </span>}</Col>
          <Button type="submit" variant="success" disabled={loading}>
            {loading ? "Logging in..." : "Recipient Login"}
          </Button>
        </Form>
      </Container>
    </>
  );
}
