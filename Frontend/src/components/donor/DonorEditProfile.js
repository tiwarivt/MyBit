import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  getDonorFromServer,
  updatedDonor,
} from "../../services/DonerApiService";
import { DonorNavigationBar } from "./DonorNavigationBar";
import { Card } from "react-bootstrap";

export function DonorEditProfile() {
  const [donorDetails, setDonorDetails] = useState({});
  const donorObj = JSON.parse(localStorage.getItem("donor"));
  const navigate = useNavigate();

  //for error State
  const [donorNameError, setDonorNameError] = useState("");
  const [donorPhoneError, setDonorPhoneError] = useState("");
  const [donorPasswordError, setDonorPasswordError] = useState("");
  const [confirmDonorPasswordError, setConfirmDonorPasswordError] =
    useState("");
  const [donorAddressError, setDonorAddressError] = useState("");
  const [donorZipCodeError, setDonorZipCodeError] = useState("");

  async function getDonorDetails() {
    const response = await getDonorFromServer(donorObj.donorId);
    if (response.status === 200) {
      const updatedDonorDetails = {
        ...response.data,
        donorPassword: "",
        donorConfirmPassword: "",
      };
      setDonorDetails(updatedDonorDetails);
      console.log(donorDetails);
    }
  }

  //componentDidMount
  useEffect(() => {
    if (donorObj == null) {
      navigate("/");
    }
    getDonorDetails();
  }, []);

  const handleChange = (e) => {
    setDonorDetails({ ...donorDetails, [e.target.name]: e.target.value });
  };

  // Define function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form inputs
    if (!validate()) {
      return;
    } else {
      const formData = {
        ...donorDetails,
        donorName: donorDetails.donorName,
        donorPhone: donorDetails.donorPhone,
        donorPassword: donorDetails.donorPassword,
        donorAddress: donorDetails.donorAddress,
        donorZipCode: donorDetails.donorZipCode,
      };

      const response = await updatedDonor(formData);
      console.log(response.data);
      if (response.status === 200) {
        navigate("/donorProfile");
      }
    }
  };

  //validation of field
  const validate = () => {
    let isValid = true;
    // donorName validation
    if (donorDetails.donorName.trim() === "") {
      setDonorNameError("donorName is required");
      isValid = false;
    } else if (!/^[a-zA-Z0-9\s]+$/.test(donorDetails.donorName)) {
      setDonorNameError("donorName can only contain letters and numbers");
      isValid = false;
    } else {
      setDonorNameError("");
    }

    // donorPhone validation
    if (donorDetails.donorPhone.trim() === "") {
      setDonorPhoneError("donorPhone number is required");
      isValid = false;
    } else if (!/^[0-9]+$/.test(donorDetails.donorPhone)) {
      setDonorPhoneError("donorPhone number can only contain numbers");
      isValid = false;
    } else if (donorDetails.donorPhone.length != 10) {
      setDonorPhoneError("donorPhone number must be 10 digit");
      isValid = false;
    } else {
      setDonorPhoneError("");
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
    } else if (!/^\d{6}$/.test(donorDetails.donorZipCode)) {
      setDonorZipCodeError("Please enter a valid 6-digit ZIP code");
      isValid = false;
    } else {
      setDonorZipCodeError("");
    }

    // password validation
    if (donorDetails.donorPassword.trim() === "") {
      setDonorPasswordError("donorPassword is required");
      isValid = false;
    } else if (donorDetails.donorPassword.length < 8) {
      setDonorPasswordError("donorPassword must be at least 8 characters long");
      isValid = false;
    } else {
      setDonorPasswordError("");
    }
    // Confirm password validation
    if (donorDetails.donorConfirmPassword.trim() === "") {
      setConfirmDonorPasswordError("confirmDonorPassword is required");
      isValid = false;
    } else if (
      donorDetails.donorConfirmPassword !== donorDetails.donorPassword
    ) {
      setConfirmDonorPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmDonorPasswordError("");
    }

    return isValid;
  };

  return (
    <>
      <DonorNavigationBar />
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
                    name="donorName"
                    value={donorDetails.donorName || ""}
                    onChange={handleChange}
                  />
                  {donorNameError && (
                    <span style={{ color: "red" }}>{donorNameError}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    name="donorPhone"
                    value={donorDetails.donorPhone || ""}
                    onChange={handleChange}
                  />
                  {donorPhoneError && (
                    <span style={{ color: "red" }}>{donorPhoneError}</span>
                  )}
                  <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="donorAddress"
                      value={donorDetails.donorAddress || ""}
                      onChange={handleChange}
                    />
                    {donorAddressError && (
                      <span style={{ color: "red" }}>{donorAddressError}</span>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="donorZipCode"
                      value={donorDetails.donorZipCode || ""}
                      onChange={handleChange}
                    />
                    {donorZipCodeError && (
                      <span style={{ color: "red" }}>{donorZipCodeError}</span>
                    )}
                  </Form.Group>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="donorPassword"
                    value={donorDetails.donorPassword || ""}
                    onChange={handleChange}
                  />
                  {donorPasswordError && (
                    <span style={{ color: "red" }}>{donorPasswordError}</span>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="donorConfirmPassword"
                    value={donorDetails.donorConfirmPassword || ""}
                    onChange={handleChange}
                  />
                  {confirmDonorPasswordError && (
                    <span style={{ color: "red" }}>
                      {confirmDonorPasswordError}
                    </span>
                  )}
                </Form.Group>
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Form>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
}
