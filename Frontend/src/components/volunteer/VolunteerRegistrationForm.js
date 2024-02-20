import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Modal } from "react-bootstrap";
import { saveVolunteer } from "../../services/VolunteerApiService";
import { NavigationBar } from "../NavigationBar";
import Footer from "./Footer";
import emailjs from "emailjs-com";

export function VolunteerRegistrationForm() {
  // Define state for form inputs and errors
  const [modalOpen, setModalOpen] = useState(false);
  const [volunteerDetails, setVolunteerDetails] = useState({
    volunteerName: "",
    volunteerPhone: "",
    volunteerAlternatePhone: "",
    volunteerEmail: "",
    volunteerPassword: "",
    volunteerConfirmPassword: "",
    volunteerZipCode: "",
    volunteerAge: "",
  });

  //for error State
  const [volunteerNameError, setVolunteerNameError] = useState("");
  const [volunteerPhoneError, setVolunteerPhoneError] = useState("");
  const [volunteerAlternatePhoneError, setVolunteerAlternatePhoneError] =
    useState("");
  const [volunteerEmailError, setVolunteerEmailError] = useState("");
  const [volunteerPasswordError, setVolunteerPasswordError] = useState("");
  const [confirmVolunteerPasswordError, setConfirmVolunteerPasswordError] =
    useState("");
  const [volunteerZipCodeError, setVolunteerZipCodeError] = useState("");
  const [volunteerAgeError, setVolunteerAgeError] = useState("");

  const handleChange = (e) => {
    setVolunteerDetails({
      ...volunteerDetails,
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
        volunteerName: volunteerDetails.volunteerName,
        volunteerPhone: volunteerDetails.volunteerPhone,
        volunteerAlternatePhone: volunteerDetails.volunteerAlternatePhone,
        volunteerEmail: volunteerDetails.volunteerEmail,
        volunteerPassword: volunteerDetails.volunteerPassword,
        volunteerZipCode: volunteerDetails.volunteerZipCode,
        volunteerAge: volunteerDetails.volunteerAge,
      };
      // try {
      //   const response = await saveVolunteer(formData);
      const response = await saveVolunteer(formData);
      console.log(response.data);
      if (response.status === 200) {
        sendEmail(formData);
        setVolunteerDetails({
          volunteerName: "",
          volunteerPhone: "",
          volunteerAlternatePhone: "",
          volunteerEmail: "",
          volunteerZipCode: "",
          volunteerPassword: "",
          volunteerConfirmPassword: "",
          volunteerAge: "",
        });
        setModalOpen(true);
        // alert("Volunteer registered successfully");
      }
      // } catch (error) {
      //   console.log(error);
      //   alert("Failed to register volunteer");
      // }
    }
  };

  //validation of field
  const validate = () => {
    let isValid = true;
    // volunteerName validation
    if (volunteerDetails.volunteerName.trim() === "") {
      setVolunteerNameError("VolunteerName is required");
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(volunteerDetails.volunteerName)) {
      setVolunteerNameError("Volunteer name can only contain letters");
      isValid = false;
    } else {
      setVolunteerNameError("");
    }

    // volunteerPhone validation
    if (volunteerDetails.volunteerPhone.trim() === "") {
      setVolunteerPhoneError("Volunteer Phone number is required");
      isValid = false;
    } else if (!/^[6-9]{1}[0-9]{9}$/.test(volunteerDetails.volunteerPhone)) {
      setVolunteerPhoneError("Volunteer Phone number can only contain numbers and start with(6-9)");
      isValid = false;
    } else if (volunteerDetails.volunteerPhone.length !== 10) {
      setVolunteerPhoneError("Volunteer Phone number must be 10 digit");
      isValid = false;
    } else {
      setVolunteerPhoneError("");
    }

    // volunteerAlternatePhone validation
    if (volunteerDetails.volunteerAlternatePhone.trim() === "") {
      //dont do anything, allow it
    } else if (!/^[0-9]+$/.test(volunteerDetails.volunteerAlternatePhone)) {
      setVolunteerAlternatePhoneError(
        "Volunteer Phone number can only contain numbers"
      );
      isValid = false;
    } else if (volunteerDetails.volunteerAlternatePhone.length !== 10) {
      setVolunteerAlternatePhoneError(
        "Volunteer Phone number must be 10 digit"
      );
      isValid = false;
    } else {
      setVolunteerAlternatePhoneError("");
    }

    // VolunteerEmail validation
    if (volunteerDetails.volunteerEmail.trim() === "") {
      setVolunteerEmailError("Volunteer Email is required");
      isValid = false;
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(volunteerDetails.volunteerEmail)
    ) {
      setVolunteerEmailError("Email is not valid");
      isValid = false;
    } else {
      setVolunteerEmailError("");
    }

    // Volunteer ZIP code validation
    if (volunteerDetails.volunteerZipCode.trim() === "") {
      setVolunteerZipCodeError("Volunteer ZIP code is required");
      isValid = false;
    } else if (!/^4[0-4]\d{4}$/.test(volunteerDetails.volunteerZipCode)) {
      setVolunteerZipCodeError("Please enter a valid 6-digit ZIP code and for mh first 2 digit (40-44)");
      isValid = false;
    } else {
      setVolunteerZipCodeError("");
    }

    // Volunteer age validation
    if (volunteerDetails.volunteerAge.trim() === "") {
      setVolunteerAgeError("Volunteer Age is required");
      isValid = false;
    } else if (volunteerDetails.volunteerAge < 18 && volunteerDetails.volunteerAge > 80) {
      setVolunteerAgeError("Age should be greater than or equal to 18");
      isValid = false;
    } else {
      setVolunteerAgeError("");
    }

    // password validation
    if (volunteerDetails.volunteerPassword.trim() === "") {
      setVolunteerPasswordError("Volunteer Password is required");
      isValid = false;
    } else if (volunteerDetails.volunteerPassword.length < 8) {
      setVolunteerPasswordError(
        "VolunteerPassword must be at least 8 characters long"
      );
      isValid = false;
    } else {
      setVolunteerPasswordError("");
    }
    // Confirm password validation
    if (volunteerDetails.volunteerConfirmPassword.trim() === "") {
      setConfirmVolunteerPasswordError(
        "confirm Volunteer Password is required"
      );
      isValid = false;
    } else if (
      volunteerDetails.volunteerPassword !==
      volunteerDetails.volunteerConfirmPassword
    ) {
      setConfirmVolunteerPasswordError("Password Not Matched");
      isValid = false;
    } else {
      setConfirmVolunteerPasswordError("");
    }
    return isValid;
  };

  return (
    <>
      <NavigationBar></NavigationBar>
      <Container className="mt-4 shadow p-4 bg-light h-500 mb-4">
        <Form onSubmit={handleSubmit}>
          <h1 className="text-center mb-4 text-primary">
            Volunteer Registration Form
          </h1>
          <Row>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Volunteer Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="volunteerName"
                  value={volunteerDetails.volunteerName}
                  onChange={handleChange}
                  className="rounded-0"
                />
                {volunteerNameError && (
                  <span style={{ color: "red" }}>{volunteerNameError} </span>
                )}
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Volunteer Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="volunteerEmail"
                  value={volunteerDetails.volunteerEmail}
                  onChange={handleChange}
                  className="rounded-0"
                />
                {volunteerEmailError && (
                  <span style={{ color: "red" }}>{volunteerEmailError}</span>
                )}
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label> Volunteer Phone Number:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone"
                  name="volunteerPhone"
                  value={volunteerDetails.volunteerPhone}
                  onChange={handleChange}
                  className="rounded-0"
                />
                {volunteerPhoneError && (
                  <span style={{ color: "red" }}>{volunteerPhoneError}</span>
                )}
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  {" "}
                  Volunteer Alternate Phone Number: (optional)
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter alternate phone"
                  name="volunteerAlternatePhone"
                  value={volunteerDetails.volunteerAlternatePhone}
                  onChange={handleChange}
                  className="rounded-0"
                />
                {volunteerAlternatePhoneError && (
                  <span style={{ color: "red" }}>
                    {volunteerAlternatePhoneError}
                  </span>
                )}
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Volunteer ZIP Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter ZIP code"
                  name="volunteerZipCode"
                  value={volunteerDetails.volunteerZipCode}
                  onChange={handleChange}
                  className="rounded-0"
                />
                {volunteerZipCodeError && (
                  <span style={{ color: "red" }}>{volunteerZipCodeError}</span>
                )}
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Volunteer Age</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter age"
                  name="volunteerAge"
                  value={volunteerDetails.volunteerAge}
                  onChange={handleChange}
                  className="rounded-0"
                />
                {volunteerAgeError && (
                  <span style={{ color: "red" }}>{volunteerAgeError}</span>
                )}
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Volunteer Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  name="volunteerPassword"
                  value={volunteerDetails.volunteerPassword}
                  onChange={handleChange}
                  className="rounded-0"
                />
                {volunteerPasswordError && (
                  <span style={{ color: "red" }}>{volunteerPasswordError}</span>
                )}
              </Form.Group>
            </Col>
            <Col lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Confirm Volunteer Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="volunteerConfirmPassword"
                  value={volunteerDetails.volunteerConfirmPassword}
                  onChange={handleChange}
                  className="rounded-0"
                />
                {confirmVolunteerPasswordError && (
                  <span style={{ color: "red" }}>
                    {confirmVolunteerPasswordError}
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
            Register Volunteer
          </Button>
        </Form>
      </Container>
      <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
        <Modal.Header>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Volunteer registered successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setModalOpen(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer></Footer>
    </>
  );
}
