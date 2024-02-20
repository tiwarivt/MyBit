import React, { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { saveRecipient } from "../../services/RecipientApiService";
import { NavigationBar } from "../NavigationBar";
import emailjs from "emailjs-com";

export function RecipientRegistrationForm() {
  // Define state for form inputs and errors
  const [modalOpen, setModalOpen] = useState(false);
  const [recipientDetails, setReipientDetails] = useState({
    recipientName: "",
    recipientPhone: "",
    recipientEmail: "",
    recipientPassword: "",
    recipientConfirmPassword: "",
    recipientZipCode: "",
    recipientAddress: "",
    recipientRegistrationId: "",
  });

  //for error State
  const [recipientNameError, setReipientNameError] = useState("");
  const [recipientPhoneError, setReipientPhoneError] = useState("");
  const [recipientEmailError, setReipientEmailError] = useState("");
  const [recipientPasswordError, setReipientPasswordError] = useState("");
  const [confirmrecipientPasswordError, setConfirmrecipientPasswordError] =
    useState("");
  const [recipientZipCodeError, setReipientZipCodeError] = useState("");
  const [recipientAddressError, setRecipientAddressError] = useState("");
  const [recipientRegistrationIdError, setRecipientRegistrationIdError] =
    useState("");

  const handleChange = (e) => {
    setReipientDetails({
      ...recipientDetails,
      [e.target.name]: e.target.value,
    });
  };
  const sendEmail = (formData) => {
    emailjs
      .send(
        "service_iwmii1r",
        "template_8yummw1",
        {
          from_name: "CharityXchange",
          to_name: formData.donorName,
          email: formData.donorEmail,
        },

        "nIhHAx-RhF227btcV"
      )

      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  // Define function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form inputs
    if (!validate()) {
      return;
    } else {
      const formData = {
        recipientName: recipientDetails.recipientName,
        recipientPhone: recipientDetails.recipientPhone,
        recipientEmail: recipientDetails.recipientEmail,
        recipientPassword: recipientDetails.recipientPassword,
        recipientAddress: recipientDetails.recipientAddress,
        recipientZipCode: recipientDetails.recipientZipCode,
        recipientRegistrationId: recipientDetails.recipientRegistrationId,
      };

      console.log(formData);
      const response = await saveRecipient(formData);

      console.log(response.data);
      if (response.status === 200) {
        sendEmail(formData);
        setReipientDetails({
          recipientName: "",
          recipientPhone: "",
          recipientEmail: "",
          recipientZipCode: "",
          recipientAddress: "",
          recipientPassword: "",
          recipientConfirmPassword: "",
          recipientRegistrationId: "",
        });
        setModalOpen(true);
      }
    }
  };

  //validation of field
  const validate = () => {
    let isValid = true;
    // recipientName validation
    if (recipientDetails.recipientName.trim() === "") {
      setReipientNameError("recipient Name is required");
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(recipientDetails.recipientName)) {
      setReipientNameError("recipient name can only contain letters");
      isValid = false;
    } else {
      setReipientNameError("");
    }

    // recipientPhone validation
    if (recipientDetails.recipientPhone.trim() === "") {
      setReipientPhoneError("recipient Phone number is required");
      isValid = false;
    } else if (!/^[6-9]{1}[0-9]{9}$/.test(recipientDetails.recipientPhone)) {
      setReipientPhoneError("recipient Phone number can only contain numbers");
      isValid = false;
    } else if (recipientDetails.recipientPhone.length !== 10) {
      setReipientPhoneError("recipient Phone number must be 10 digit");
      isValid = false;
    } else {
      setReipientPhoneError("");
    }

    // recipientEmail validation
    if (recipientDetails.recipientEmail.trim() === "") {
      setReipientEmailError("recipient Email is required");
      isValid = false;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientDetails.recipientEmail)
    ) {
      setReipientEmailError("Email is not valid");
      isValid = false;
    } else {
      setReipientEmailError("");
    }
    
    // Recipient ZIP code validation
    if (!/^4[0-4]\d{4}$/.test(recipientDetails.recipientZipCode.trim())) {
      setReipientZipCodeError("Please enter a valid 6-digit ZIP code  and for mh first 2 digit (40-44)");
    } else {
      setReipientZipCodeError("");
    }

    // Recipient Address validation
    if (!recipientDetails.recipientAddress.trim()) {
      setRecipientAddressError("Recipient Address is required");
      isValid = false;
    } else {
      setRecipientAddressError("");
    }

    // recipientRegistrationId validation
    if (recipientDetails.recipientRegistrationId.trim() === "") {
      setRecipientRegistrationIdError("recipient registrationId is required");
      isValid = false;
    } else if (!/^[0-9]+$/.test(recipientDetails.recipientRegistrationId)) {
      setRecipientRegistrationIdError(
        "recipient registrationId can only contain numbers"
      );
      isValid = false;
    } else if (recipientDetails.recipientRegistrationId.length !== 10) {
      setRecipientRegistrationIdError(
        "recipient RegistrationId must be 10 digit"
      );
      isValid = false;
    } else {
      setRecipientRegistrationIdError("");
    }

    // password validation
    if (recipientDetails.recipientPassword.trim() === "") {
      setReipientPasswordError("recipient Password is required");
      isValid = false;
    } else if (recipientDetails.recipientPassword.length < 8) {
      setReipientPasswordError(
        "recipientPassword must be at least 8 characters long"
      );
      isValid = false;
    } else {
      setReipientPasswordError("");
    }

    // Confirm password validation
    if (recipientDetails.recipientConfirmPassword.trim() === "") {
      setConfirmrecipientPasswordError(
        "confirm recipient Password is required"
      );
      isValid = false;
    } else if (
      recipientDetails.recipientPassword !==
      recipientDetails.recipientConfirmPassword
    ) {
      setConfirmrecipientPasswordError("Password Not Matched");
      isValid = false;
    } else {
      setConfirmrecipientPasswordError("");
    }
    return isValid;
  };

  return (
    <>
      <NavigationBar></NavigationBar>
      <Container className="mt-4 shadow p-4 bg-light h-500 mb-4">
        <Form onSubmit={handleSubmit}>
          <h1 className="text-center mb-4 text-primary">
            Recipient Registration Form
          </h1>
          <Row>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Recipient Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="recipientName"
                  value={recipientDetails.recipientName}
                  onChange={handleChange}
                  className="rounded-0"
                />
                {recipientNameError && (
                  <span style={{ color: "red" }}>{recipientNameError} </span>
                )}
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Recipient Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="recipientEmail"
                  value={recipientDetails.recipientEmail}
                  onChange={handleChange}
                  className="rounded-0"
                />
                {recipientEmailError && (
                  <span style={{ color: "red" }}>{recipientEmailError}</span>
                )}
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label> Recipient Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone"
                  name="recipientPhone"
                  value={recipientDetails.recipientPhone}
                  onChange={handleChange}
                  className="rounded-0"
                />
                {recipientPhoneError && (
                  <span style={{ color: "red" }}>{recipientPhoneError}</span>
                )}
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Recipient Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address"
                  name="recipientAddress"
                  value={recipientDetails.recipientAddress}
                  onChange={handleChange}
                  className="rounded-0"
                />
                {recipientAddressError && (
                  <span style={{ color: "red" }}>{recipientAddressError}</span>
                )}
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label> Recipient RegistrationId</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter RegistrationId"
                  name="recipientRegistrationId"
                  value={recipientDetails.recipientRegistrationId}
                  onChange={handleChange}
                  className="rounded-0"
                />
                {recipientRegistrationIdError && (
                  <span style={{ color: "red" }}>
                    {recipientRegistrationIdError}
                  </span>
                )}
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Recipient ZIP Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter ZIP code"
                  name="recipientZipCode"
                  value={recipientDetails.recipientZipCode}
                  onChange={handleChange}
                  className="rounded-0"
                />
                {recipientZipCodeError && (
                  <span style={{ color: "red" }}>{recipientZipCodeError}</span>
                )}
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Recipient Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  name="recipientPassword"
                  value={recipientDetails.recipientPassword}
                  onChange={handleChange}
                  className="rounded-0"
                />
                {recipientPasswordError && (
                  <span style={{ color: "red" }}>{recipientPasswordError}</span>
                )}
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Recipient Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="recipientConfirmPassword"
                  value={recipientDetails.recipientConfirmPassword}
                  onChange={handleChange}
                  className="rounded-0"
                />
                {confirmrecipientPasswordError && (
                  <span style={{ color: "red" }}>
                    {confirmrecipientPasswordError}
                  </span>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Button
            type="submit"
            variant="success"
            className="rounded-pill bg-primary"
          >
            Register recipient
          </Button>
        </Form>
      </Container>
      <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
        <Modal.Header>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Recipient has been registered successfully !</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setModalOpen(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
