import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { checkEmail, sendOTP } from "../services/AdminApiService";
import emailjs from "emailjs-com";

import { NavigationBar } from "./NavigationBar";
import { EditPassword } from "./EditPassword";

export function ForgotPassword() {
  const [userData, setUserData] = useState({
    userEmail: "",
    otpValue: "",
  });
  const [otp, setOtp] = useState("");
  // const[isOtpSet,setIsOtpSet]=useState(false);
  const [otpError, setOtpError] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [userEmailError, setUserEmailError] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  //render verify otp
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  useEffect(() => {
    let timer;
    if (seconds > 0) {
      timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    } else if (!showPassword && otp) {
      // onTimerEnd();
      setModalOpen(true);
      setOtp("");
      userData.userEmail = "";
      userData.otpValue = "";
      setOtpError("");
    }
    return () => clearTimeout(timer);
  }, [seconds]);

  const sendEmail = (sendOtpDetails) => {
    emailjs
      .send(
        "service_qagaxij",
        "template_82vd2pt",
        {
          from_name: "CharityXchange",
          email: sendOtpDetails.userEmail,
          otp: sendOtpDetails.otpValue,
        },

        "YJgpazCfLXzl1Otma"
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    if (!validateEmail()) {
      return;
    } else if (!otp) {
      setLoading(true);
      try {
        console.log("62");
        console.log(userData.userEmail);
        let obj = {
          donorEmail: userData.userEmail,
        };
        const response = await checkEmail(obj);
        console.log("64");
        console.log(response);
        if (response.data) {
          console.log("66");
          const randomOtp = Math.floor(100000 + Math.random() * 900000);
          console.log(randomOtp); // prints a random 6-digit number
          setOtp(randomOtp);

          const sendOtpDetails = {
            userEmail: userData.userEmail,
            otpValue: randomOtp,
          };
          sendEmail(sendOtpDetails);
          setSeconds(300);
          console.log("done");
        } else {
          setUserEmailError("Email ID not registered");
        }
      } catch (error) {
        setErrors("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    //
    if (!validateOtp()) {
      return;
    } else {
      setShowPassword(true);
    }
  };

  const validateEmail = () => {
    let isValid = true;
    // donorEmail validation
    if (userData.userEmail.trim() === "") {
      setUserEmailError("Email is required");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.userEmail)) {
      setUserEmailError("Email is not valid");
      isValid = false;
    } else {
      setUserEmailError("");
    }

    return isValid;
  };

  const validateOtp = () => {
    let isValid = true;
    // donorEmail validation
    if (userData.otpValue == "") {
      isValid = false;
    } else if (userData.otpValue != otp) {
      setOtpError("Wrong OTP");
      isValid = false;
    } else {
      setOtpError("");
    }

    return isValid;
  };

  return (
    <>
      <NavigationBar></NavigationBar>
      <Container className="bg-light text-center mt-0 p-3 rounded">
        <Container style={{ minHeight: "512px" }}>
          <Card className="shadow-lg p-3 mb-5 mt-5 bg-white rounded text-center">
            <Card.Body className="text-center">
              <h3 style={{ color: 'red', fontSize: '15px' }}>

                * Kindly Do not Refresh or Reload page until process is completed *
              </h3>
              {!showPassword && (
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col lg={3}></Col>
                    <Col lg={6}>
                      <Form.Group className="mb-3 m-5">
                        <Form.Label>Enter Registered Email</Form.Label>
                        <Form.Control
                          className="mt-4"
                          type="text"
                          placeholder="Enter email"
                          name="userEmail"
                          value={userData.userEmail}
                          onChange={handleChange}
                          disabled={otp}
                        />
                        {userEmailError && (
                          <span style={{ color: "red" }}>{userEmailError}</span>
                        )}
                      </Form.Group>
                    </Col>
                    <Col lg={3}></Col>

                    {otp && (
                      <>
                        <Col lg={3}></Col>
                        <Col lg={6}>
                          <div>
                            remaining Time {minutes}:
                            {remainingSeconds < 10 ? "0" : ""}
                            {remainingSeconds}
                          </div>

                          <Form.Group className="mb-3 m-5">
                            <Form.Label>
                              Enter OTP (OTP send on Above Mail Pls Check)
                            </Form.Label>
                            <Form.Control
                              className="mt-4"
                              type="text"
                              placeholder="Enter OTP"
                              name="otpValue"
                              value={userData.otpValue}
                              onChange={handleChange}
                            />
                            {otpError && (
                              <span style={{ color: "red" }}>{otpError}</span>
                            )}
                          </Form.Group>
                        </Col>
                        <Col lg={3}></Col>
                      </>
                    )}
                  </Row>
                  <Button type="submit" variant="success" className="m-2">
                    {otp ? "Confirm OTP" : "Send OTP"}
                  </Button>
                </Form>
              )}
              {showPassword && (
                <EditPassword email={userData.userEmail}></EditPassword>
              )}
            </Card.Body>
          </Card>
        </Container>
      </Container>
      <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
        <Modal.Header>
          <Modal.Title>OTP Timeout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please enter email to generate new otp !</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setModalOpen(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
