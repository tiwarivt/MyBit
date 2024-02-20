import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import emailjs from "emailjs-com";

import { useNavigate } from "react-router-dom";
import { userPasswordUpdate } from "../services/AdminApiService";

export function EditPassword(props) {
  const [donorDetails, setDonorDetails] = useState({
    donorEmail: props.email,
    donorPassword: "",
    donorConfirmPassword: "",
  });

  const navigate = useNavigate();
  const [donorPasswordError, setDonorPasswordError] = useState("");
  const [confirmDonorPasswordError, setConfirmDonorPasswordError] =
    useState("");

  const handleChange = (e) => {
    setDonorDetails({ ...donorDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form inputs
    if (!validate()) {
      return;
    } else {
      const formData = {
        donorEmail: donorDetails.donorEmail,
        donorPassword: donorDetails.donorPassword,
      };

      console.log(formData);
      const response = await userPasswordUpdate(formData);
      console.log(response.data);
      console.log("added data in database");
      navigate("/login");
    }
  };
  //validation of field
  const validate = () => {
    let isValid = true;

    // password validation
    if (donorDetails.donorPassword.trim() === "") {
      setDonorPasswordError("Donor Password is required");
      isValid = false;
    } else if (donorDetails.donorPassword.length < 8) {
      setDonorPasswordError(
        "Donor Password must be at least 8 characters long"
      );
      isValid = false;
    } else {
      setDonorPasswordError("");
    }

    //Confirm password validation
    if (donorDetails.donorConfirmPassword.trim() === "") {
      setConfirmDonorPasswordError("Confirm Donor Password is required");
      isValid = false;
    } else if (
      donorDetails.donorPassword !== donorDetails.donorConfirmPassword
    ) {
      setConfirmDonorPasswordError("Password Not Matched");
      isValid = false;
    } else {
      setConfirmDonorPasswordError("");
    }

    return isValid;
  };

  return (
    <>
      <Container className="mt-4">
        <Form onSubmit={handleSubmit}>
          <h1 className="mb-4">Provide New Password</h1>
          <Row>
            <Col lg={3}></Col>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="donorPassword"
                  value={donorDetails.donorPassword}
                  onChange={handleChange}
                />
                {donorPasswordError && (
                  <span style={{ color: "red" }}>{donorPasswordError}</span>
                )}
              </Form.Group>
            </Col>
            <Col lg={3}></Col>
            <Col lg={3}></Col>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Confirm password"
                  name="donorConfirmPassword"
                  value={donorDetails.donorConfirmPassword}
                  onChange={handleChange}
                />
                {confirmDonorPasswordError && (
                  <span style={{ color: "red" }}>
                    {confirmDonorPasswordError}
                  </span>
                )}
              </Form.Group>
            </Col>
            <Col lg={3}></Col>
          </Row>
          <Button type="submit" variant="success">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}
