import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  getRecipientFromServer,
  saveRecipient,
} from "../../services/RecipientApiService";
import { RecipientNavigationBar } from "./RecipientNavigationBar";
import { Card } from "react-bootstrap";

export function RecipientEditProfile() {
  const [recipientDetails, setRecipientDetails] = useState({});
  const recipientObj = JSON.parse(localStorage.getItem("recipient"));
  const navigate = useNavigate();

  //for error State
  const [recipientNameError, setReipientNameError] = useState("");
  const [recipientPhoneError, setReipientPhoneError] = useState("");
  const [recipientPasswordError, setReipientPasswordError] = useState("");
  const [confirmrecipientPasswordError, setConfirmrecipientPasswordError] =
    useState("");
  const [recipientZipCodeError, setReipientZipCodeError] = useState("");
  const [recipientAddressError, setRecipientAddressError] = useState("");
  const [recipientRegistrationIdError, setRecipientRegistrationIdError] =
    useState("");

  async function fetchRecipientDetails() {
    const response = await getRecipientFromServer(recipientObj.recipientId);
    if (response.status === 200) {
      const updatedRecipientDetails = {
        ...response.data,
        recipientPassword: "",
        recipientConfirmPassword: "",
      };
      setRecipientDetails(updatedRecipientDetails);
    }
  }

  //componentDidMount
  useEffect(() => {
    if (recipientObj == null) {
      navigate("/");
    }
    fetchRecipientDetails();
  }, []);

  const handleChange = (e) => {
    setRecipientDetails({
      ...recipientDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Define function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form inputs
    if (!validate()) {
      return;
    } else {
      const formData = {
        ...recipientDetails,
        recipientName: recipientDetails.recipientName,
        recipientPhone: recipientDetails.recipientPhone,
        recipientPassword: recipientDetails.recipientPassword,
        recipientAddress: recipientDetails.recipientAddress,
        recipientZipCode: recipientDetails.recipientZipCode,
        recipientRegistrationId: recipientDetails.recipientRegistrationId,
      };

      const response = await saveRecipient(formData);
      console.log(response.data);
      if (response.status === 200) {
        navigate("/recipientProfile");
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
    } else if (!/^[0-9]+$/.test(recipientDetails.recipientPhone)) {
      setReipientPhoneError("recipient Phone number can only contain numbers");
      isValid = false;
    } else if (recipientDetails.recipientPhone.length !== 10) {
      setReipientPhoneError("recipient Phone number must be 10 digit");
      isValid = false;
    } else {
      setReipientPhoneError("");
    }

    // Recipient ZIP code validation
    if (!/^\d{6}$/.test(recipientDetails.recipientZipCode.trim())) {
      setReipientZipCodeError("Please enter a valid 6-digit ZIP code");
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

  if (recipientDetails.kycverified) {
    return (
      <>
        <RecipientNavigationBar
          status={recipientDetails.kycverified}
        ></RecipientNavigationBar>
        <Container className="mt-3 mb-3">
          <Card
            className="shadow-lg p-5 mx-auto"
            style={{ width: "75%", height: "50%" }}
          >
            <Row className="justify-content-md-center">
              <Col md={{ span: 6 }}>
                <h3 className="text-center mb-3">Edit Profile</h3>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter name"
                      name="recipientName"
                      value={recipientDetails.recipientName}
                      onChange={handleChange}
                    />
                    {recipientNameError && (
                      <span style={{ color: "red" }}>{recipientNameError}</span>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label> Recipient Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter phone"
                      name="recipientPhone"
                      value={recipientDetails.recipientPhone}
                      onChange={handleChange}
                    />
                    {recipientPhoneError && (
                      <span style={{ color: "red" }}>
                        {recipientPhoneError}
                      </span>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Enter Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter address"
                      name="recipientAddress"
                      value={recipientDetails.recipientAddress}
                      onChange={handleChange}
                    />
                    {recipientAddressError && (
                      <span style={{ color: "red" }}>
                        {recipientAddressError}
                      </span>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label> Enter RegistrationId</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter RegistrationId"
                      name="recipientRegistrationId"
                      value={recipientDetails.recipientRegistrationId}
                      onChange={handleChange}
                    />
                    {recipientRegistrationIdError && (
                      <span style={{ color: "red" }}>
                        {recipientRegistrationIdError}
                      </span>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Enter ZIP Code</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter ZIP code"
                      name="recipientZipCode"
                      value={recipientDetails.recipientZipCode}
                      onChange={handleChange}
                    />
                    {recipientZipCodeError && (
                      <span style={{ color: "red" }}>
                        {recipientZipCodeError}
                      </span>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Enter Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      name="recipientPassword"
                      value={recipientDetails.recipientPassword}
                      onChange={handleChange}
                    />
                    {recipientPasswordError && (
                      <span style={{ color: "red" }}>
                        {recipientPasswordError}
                      </span>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      name="recipientConfirmPassword"
                      value={recipientDetails.recipientConfirmPassword}
                      onChange={handleChange}
                    />
                    {confirmrecipientPasswordError && (
                      <span style={{ color: "red" }}>
                        {confirmrecipientPasswordError}
                      </span>
                    )}
                  </Form.Group>
                  <Button type="submit" variant="primary">
                    Update Profile
                  </Button>
                </Form>
              </Col>
            </Row>
          </Card>
        </Container>
      </>
    );
  } else {
    navigate("/recipientHome");
  }
}
