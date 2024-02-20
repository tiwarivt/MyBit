import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  getVolunteerFromServer,
  saveVolunteer,
  updateVolunteer,
} from "../../services/VolunteerApiService";
import { VolunteerNavigationBar } from "./VolunteerNavigationBar";
import { Card } from "react-bootstrap";

export function VolunteerEditProfile() {
  const [volunteerDetails, setVolunteerDetails] = useState({});
  const volunteerObj = JSON.parse(localStorage.getItem("volunteer"));
  const navigate = useNavigate();

  //for error State
  const [volunteerNameError, setVolunteerNameError] = useState("");
  const [volunteerPhoneError, setVolunteerPhoneError] = useState("");
  const [volunteerAlternatePhoneError, setVolunteerAlternatePhoneError] =
    useState("");
  const [volunteerPasswordError, setVolunteerPasswordError] = useState("");
  const [confirmVolunteerPasswordError, setConfirmVolunteerPasswordError] =
    useState("");
  const [volunteerZipCodeError, setVolunteerZipCodeError] = useState("");
  const [volunteerAgeError, setVolunteerAgeError] = useState("");

  async function getVolunteerDetails() {
    const response = await getVolunteerFromServer(volunteerObj.volunteerId);
    if (response.status === 200) {
      const updatedVolunteerDetails = {
        ...response.data,
        volunteerPassword: "",
        volunteerConfirmPassword: "",
      };
      setVolunteerDetails(updatedVolunteerDetails);
      console.log(volunteerDetails);
    }
  }

  //componentDidMount
  useEffect(() => {
    if (volunteerObj == null) {
      navigate("/");
    }
    getVolunteerDetails();
  }, []);

  const handleChange = (e) => {
    setVolunteerDetails({
      ...volunteerDetails,
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
        ...volunteerDetails,
        volunteerName: volunteerDetails.volunteerName,
        volunteerPhone: volunteerDetails.volunteerPhone,
        volunteerAlternatePhone: volunteerDetails.volunteerAlternatePhone,
        volunteerPassword: volunteerDetails.volunteerPassword,
        volunteerZipCode: volunteerDetails.volunteerZipCode,
        volunteerAge: volunteerDetails.volunteerAge,
      };

      const response = await updateVolunteer(formData);
      console.log(response.data);
      if (response.status === 200) {
        navigate("/volunteerProfile");
      }
    }
  };

  //validation of field
  const validate = () => {
    let isValid = true;
    // volunteerName validation
    if (volunteerDetails.volunteerName.trim() === "") {
      setVolunteerNameError("Name is required");
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(volunteerDetails.volunteerName)) {
      setVolunteerNameError("Name can only contain letters");
      isValid = false;
    } else {
      setVolunteerNameError("");
    }

    // volunteerPhone validation
    if (volunteerDetails.volunteerPhone.trim() === "") {
      setVolunteerPhoneError("Phone number is required");
      isValid = false;
    } else if (!/^[0-9]+$/.test(volunteerDetails.volunteerPhone)) {
      setVolunteerPhoneError("Phone number can only contain numbers");
      isValid = false;
    } else if (volunteerDetails.volunteerPhone.length !== 10) {
      setVolunteerPhoneError("Phone number must be 10 digit");
      isValid = false;
    } else {
      setVolunteerPhoneError("");
    }

    // volunteerAlternatePhone validation
    if (volunteerDetails.volunteerAlternatePhone.trim() === "") {
      //dont do anything, allow it
    } else if (!/^[0-9]+$/.test(volunteerDetails.volunteerAlternatePhone)) {
      setVolunteerAlternatePhoneError("Number can only contain numbers");
      isValid = false;
    } else if (volunteerDetails.volunteerAlternatePhone.length !== 10) {
      setVolunteerAlternatePhoneError("Number must be 10 digit");
      isValid = false;
    } else {
      setVolunteerAlternatePhoneError("");
    }

    // Volunteer ZIP code validation
    if (volunteerDetails.volunteerZipCode.trim() === "") {
      setVolunteerZipCodeError("ZIP code is required");
      isValid = false;
    } else if (!/^[0-9]{6}$/.test(volunteerDetails.volunteerZipCode)) {
      setVolunteerZipCodeError("Please enter a valid 6-digit ZIP code");
      isValid = false;
    } else {
      setVolunteerZipCodeError("");
    }

    // Volunteer age validation
    if (volunteerDetails.volunteerAge == null) {
      setVolunteerAgeError("Age is required");
      isValid = false;
    } else if (volunteerDetails.volunteerAge < 18) {
      setVolunteerAgeError("Age should be greater than or equal to 18");
      isValid = false;
    } else {
      setVolunteerAgeError("");
    }

    // password validation
    if (volunteerDetails.volunteerPassword.trim() === "") {
      setVolunteerPasswordError("Password is required");
      isValid = false;
    } else if (volunteerDetails.volunteerPassword.length < 8) {
      setVolunteerPasswordError("Password must be at least 8 characters long");
      isValid = false;
    } else {
      setVolunteerPasswordError("");
    }
    // Confirm password validation
    if (volunteerDetails.volunteerConfirmPassword.trim() === "") {
      setConfirmVolunteerPasswordError("confirm Password is required");
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
      <VolunteerNavigationBar></VolunteerNavigationBar>
      <Container className="mt-3 mb-3">
        <Card
          className="shadow-lg p-5 mx-auto"
          style={{ width: "75%", height: "50%" }}
        >
          <Row className="justify-content-md-center">
            <Col md={{ span: 6 }}>
              <h3 className="text-center mb-3">Edit Profile</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="volunteerName"
                    value={volunteerDetails.volunteerName}
                    onChange={handleChange}
                  />
                  {volunteerNameError && (
                    <span style={{ color: "red" }}>{volunteerNameError} </span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone"
                    name="volunteerPhone"
                    value={volunteerDetails.volunteerPhone}
                    onChange={handleChange}
                  />
                  {volunteerPhoneError && (
                    <span style={{ color: "red" }}>{volunteerPhoneError}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label> Alternate Phone Number (optional)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter alternate phone"
                    name="volunteerAlternatePhone"
                    value={volunteerDetails.volunteerAlternatePhone}
                    onChange={handleChange}
                  />
                  {volunteerAlternatePhoneError && (
                    <span style={{ color: "red" }}>
                      {volunteerAlternatePhoneError}
                    </span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>ZIP Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter ZIP code"
                    name="volunteerZipCode"
                    value={volunteerDetails.volunteerZipCode}
                    onChange={handleChange}
                  />
                  {volunteerZipCodeError && (
                    <span style={{ color: "red" }}>
                      {volunteerZipCodeError}
                    </span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter age"
                    name="volunteerAge"
                    value={volunteerDetails.volunteerAge}
                    onChange={handleChange}
                  />
                  {volunteerAgeError && (
                    <span style={{ color: "red" }}>{volunteerAgeError}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    name="volunteerPassword"
                    value={volunteerDetails.volunteerPassword}
                    onChange={handleChange}
                  />
                  {volunteerPasswordError && (
                    <span style={{ color: "red" }}>
                      {volunteerPasswordError}
                    </span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    name="volunteerConfirmPassword"
                    value={volunteerDetails.volunteerConfirmPassword}
                    onChange={handleChange}
                  />
                  {confirmVolunteerPasswordError && (
                    <span style={{ color: "red" }}>
                      {confirmVolunteerPasswordError}
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
}
