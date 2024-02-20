import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../services/AdminApiService";
import { NavigationBar } from "../NavigationBar";
import Captcha from "captcha-image";

export function AdminLoginForm() {
  const [formData, setFormData] = useState({ adminEmail: "", adminPassword: "" });
  const [loading, setLoading] = useState(false);
  const [adminEmailError, setAdminEmailError] = useState("");
  const [adminPasswordError, setAdminPasswordError] = useState("");
  const [errors, setErrors] = useState('');
  const [data, setData] = useState({ image: null });
  const navigate = useNavigate();
  const { image } = data;

  function handleClick() {
    const captchaImage = new Captcha(
      "25px Courier",
      "center",
      "middle",
      100,
      100,
      "white",
      "black",
      6
    ).createImage();
    setData({ ...data, image: captchaImage });
  }

  function createMarkup(source) {
    console.log(data);
    return { __html: source };
  }

  function MyCaptcha() {
    // if (image === null)
    //   return <p>Please click to generate a new captcha image.</p>;
    return <div dangerouslySetInnerHTML={createMarkup(image)} />;
  }

  useEffect(()=>{
    handleClick();
  },[]);
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    setErrors('');
    if (!validate()) {
      return;
    }
    setLoading(true);

    try {
      const response = await adminLogin(formData);

      if (response.status === 200) {
        if(response.data === 'Successful Login' ){
            setFormData({ adminEmail: "", adminPassword: "" });
            navigate('/adminDonationAssign');
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
    // adminEmail validation
    if (formData.adminEmail.trim() === "") {
      setAdminEmailError("Email is required");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.adminEmail)) {
      setAdminEmailError("Email is not valid");
      isValid = false;
    } else {
      setAdminEmailError("");
    }

    // adminPassword validation
    if (formData.adminPassword.trim() === "") {
      setAdminPasswordError("Password is required");
      isValid = false;
    } else if (formData.adminPassword.length < 8) {
      setAdminPasswordError("Admin Password must be atleast 8 characters long");
      isValid = false;
    } else {
      setAdminPasswordError("");
    }
    return isValid;
  };

  return (
    <>
      <NavigationBar></NavigationBar>
      <Container className="mt-4">
        <h1 className="mb-4">Admin Login Form</h1>
        <Form onSubmit={handleSubmitForm}>
          <Row>
            <Col lg={12}>
              <Form.Group className="mb-3">
                <Form.Label>Admin Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter email"
                  name="adminEmail"
                  value={formData.adminEmail}
                  onChange={handleChange}
                />
                {adminEmailError && (
                  <span style={{ color: "red" }}>{adminEmailError}</span>
                )}
              </Form.Group>
            </Col>
            <Col lg={12}>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="adminPassword"
                  value={formData.adminPassword}
                  onChange={handleChange}
                />
                {adminPasswordError && (
                  <span style={{ color: "red" }}>{adminPasswordError}</span>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Col>
            {errors && <span  style={{ color: "red" }}>{errors}  </span> }
          </Col>
          <Col>
            {/* <h1>Captcha Image</h1>
            <h2>Generate a random captcha image!</h2> */}
            <MyCaptcha />
            <button onClick={() => handleClick()}>Generate New</button>
          </Col>
          
          <br></br>

          <Button type= "submit" variant="success" disabled={loading}>
            {loading ? "Logging in..." : "Admin Login"}
          </Button>
        </Form>
      </Container>
    </>
  );
}