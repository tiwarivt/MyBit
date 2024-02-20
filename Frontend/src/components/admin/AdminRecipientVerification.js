import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Container,
  Table,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  getUnverifiedRecipientList,
  updateRecipientKYCStatus,
} from "../../services/RecipientApiService";
import { AdminNavigationBar } from "./AdminNavigationBar";

export function AdminRecipientVerification() {
  const [recipientDetails, setRecipientDetails] = useState([]);
  const adminObj = JSON.parse(localStorage.getItem("admin"));
  const navigate = useNavigate();

  async function fetchRecipientData() {
    const response = await getUnverifiedRecipientList();
    setRecipientDetails(response.data);
    console.log(response.data);
  }

  //for fetching the initial data
  useEffect(() => {
    console.log("inside" + adminObj);
    if (adminObj == null) {
      navigate("/");
    }
    fetchRecipientData();
  }, []);

  function handleChange(e, recipientObj) {
    recipientObj.kycverified = e.target.value;
  }

  async function saveChanges(recipientObj) {
    if (recipientObj.kycverified != "true") return;

    console.log(recipientObj);
    const response = await updateRecipientKYCStatus(recipientObj);
    fetchRecipientData();
  }

  return (
    <>
      <AdminNavigationBar></AdminNavigationBar>
      <Container style={{ minHeight: "500px" }}>
        <Container className="mt-4 mb-4 text-center">
          <Alert className="bg-primary text-white shadow-lg">
            <h3 className="mb-0">Pending KYC verification of recipient</h3>
          </Alert>
        </Container>

        <Container>
          <Row>
            {recipientDetails.map((rd) => {
              return (
                <Col md={6} lg={4} className="mb-4">
                  <Card>
                    <Card.Header className="bg-primary text-white text-center">
                      <h4 className="mb-0">Recipient Details</h4>
                    </Card.Header>
                    <Card.Body>
                      <Table responsive striped bordered>
                        <tbody>
                          <tr>
                            <td>
                              <strong>Recipient ID</strong>
                            </td>
                            <td>{rd.recipientId}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Recipient Name</strong>
                            </td>
                            <td>{rd.recipientName}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Registration ID</strong>
                            </td>
                            <td>{rd.recipientRegistrationId}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Address</strong>
                            </td>
                            <td>{rd.recipientAddress}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Zip Code</strong>
                            </td>
                            <td>{rd.recipientZipCode}</td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Approve KYC</strong>
                            </td>
                            <td>
                              <select
                                name="kycverified"
                                onChange={(e) => {
                                  handleChange(e, rd);
                                }}
                              >
                                <option value={null}>Select</option>
                                <option value="false">Unverified</option>
                                <option value="true">Verified</option>
                              </select>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Card.Body>
                    <Card.Footer className="text-center">
                      <Button
                        onClick={() => saveChanges(rd)}
                        className="btn-primary"
                      >
                        Save
                      </Button>{" "}
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </Container>
    </>
  );
}
