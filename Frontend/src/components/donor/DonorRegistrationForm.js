import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Modal } from "react-bootstrap";
import { saveDonor } from "../../services/DonerApiService";
import { NavigationBar } from "../NavigationBar";
import emailjs from "emailjs-com";

export function DonorRegistrationForm() {
  // Define state for form inputs and errors
  const [modalOpen, setModalOpen] = useState(false);
  const [donorDetails, setDonorDetails] = useState({
    donorName: "",
    donorPhone: "",
    donorEmail: "",
    donorPassword: "",
    donorConfirmPassword: "",
    donorAddress: "",
    donorZipCode: "",
  });

  //for error State
  const [donorNameError, setDonorNameError] = useState("");
  const [donorPhoneError, setDonorPhoneError] = useState("");
  const [donorEmailError, setDonorEmailError] = useState("");
  const [donorPasswordError, setDonorPasswordError] = useState("");
  const [confirmDonorPasswordError, setConfirmDonorPasswordError] =
    useState("");
  const [donorAddressError, setDonorAddressError] = useState("");
  const [donorZipCodeError, setDonorZipCodeError] = useState("");

  const handleChange = (e) => {
    setDonorDetails({ ...donorDetails, [e.target.name]: e.target.value });
  };

  //function to send email using emailjs
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
        donorName: donorDetails.donorName,
        donorPhone: donorDetails.donorPhone,
        donorEmail: donorDetails.donorEmail,
        donorPassword: donorDetails.donorPassword,
        donorAddress: donorDetails.donorAddress,
        donorZipCode: donorDetails.donorZipCode,
      };

      console.log(formData);
      const response = await saveDonor(formData);
      console.log(response.data);
      if (response.status === 200) {
        sendEmail(formData);
        setDonorDetails({
          donorName: "",
          donorPhone: "",
          donorEmail: "",
          donorPassword: "",
          donorConfirmPassword: "",
          donorAddress: "",
          donorZipCode: "",
        });
        setModalOpen(true);
      }
    }
  };

  //validation of field
  const validate = () => {
    let isValid = true;
    // donorName validation
    if (donorDetails.donorName.trim() === "") {
      setDonorNameError("DonorName is required");
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(donorDetails.donorName)) {
      setDonorNameError("Donor name can only contain letters");
      isValid = false;
    } else {
      setDonorNameError("");
    }

    // DonorPhone validation
    if (donorDetails.donorPhone.trim() === "") {
      setDonorPhoneError("Donor Phone number is required");
      isValid = false;
    } else if (!/^[6-9]{1}[0-9]{9}$/.test(donorDetails.donorPhone)) {
      setDonorPhoneError(
        "Donor Phone number can only contain numbers and of 10 digits and first digit(6-9) "
      );
      isValid = false;
    } else {
      setDonorPhoneError("");
    }

    // DonorEmail validation
    if (donorDetails.donorEmail.trim() === "") {
      setDonorEmailError("Donor Email ID is required");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorDetails.donorEmail)) {
      setDonorEmailError("Email is not valid");
      isValid = false;
    } else {
      setDonorEmailError("");
    }

    // Donor Address validation
    if (!donorDetails.donorAddress.trim()) {
      setDonorAddressError("Donor Address is required");
      isValid = false;
    } else {
      setDonorAddressError("");
    }

    // Donor ZIP code validation
    if (!donorDetails.donorZipCode.trim()) {
      setDonorZipCodeError("Donor ZIP code is required");
      isValid = false;
    } else if (!/^4[0-4]\d{4}$/.test(donorDetails.donorZipCode)) {
      setDonorZipCodeError("Please enter a valid 6-digit ZIP code and for mh first 2 digit (40-44)");
      isValid = false;
    } else {
      setDonorZipCodeError("");
    }

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
    // Confirm password validation
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
      <NavigationBar></NavigationBar>
      <Container className="mt-4 shadow p-4 bg-light h-500 mb-4">
        <Form onSubmit={handleSubmit}>
          <h1 className="text-center mb-4 text-primary">
            Donor Registration Form
          </h1>
          <Row>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Donor Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="donorName"
                  value={donorDetails.donorName}
                  onChange={handleChange}
                  className="rounded-0"
                />
                {donorNameError && (
                  <span style={{ color: "red" }}>{donorNameError} </span>
                )}
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Donor Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="donorEmail"
                  value={donorDetails.donorEmail}
                  onChange={handleChange}
                  className="rounded-0"
                />
                {donorEmailError && (
                  <span style={{ color: "red" }}>{donorEmailError}</span>
                )}
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label> Donor Phone Number:</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter phone"
                  name="donorPhone"
                  value={donorDetails.donorPhone}
                  onChange={handleChange}
                  className="rounded-0"
                />
                {donorPhoneError && (
                  <span style={{ color: "red" }}>{donorPhoneError}</span>
                )}
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Donor Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address"
                  name="donorAddress"
                  value={donorDetails.donorAddress}
                  onChange={handleChange}
                  className="rounded-0"
                />
                {donorAddressError && (
                  <span style={{ color: "red" }}>{donorAddressError}</span>
                )}
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Donor ZIP Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter ZIP code"
                  name="donorZipCode"
                  value={donorDetails.donorZipCode}
                  onChange={handleChange}
                  className="rounded-0"
                />
                {donorZipCodeError && (
                  <span style={{ color: "red" }}>{donorZipCodeError}</span>
                )}
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Donor Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  name="donorPassword"
                  value={donorDetails.donorPassword}
                  onChange={handleChange}
                  className="rounded-0"
                />
                {donorPasswordError && (
                  <span style={{ color: "red" }}>{donorPasswordError}</span>
                )}
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Donor Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="donorConfirmPassword"
                  value={donorDetails.donorConfirmPassword}
                  onChange={handleChange}
                  className="rounded-0"
                />
                {confirmDonorPasswordError && (
                  <span style={{ color: "red" }}>
                    {confirmDonorPasswordError}
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
            Register Donor
          </Button>
        </Form>
      </Container>
      <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
        <Modal.Header>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Donor Registration successful!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setModalOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
