import { useEffect, useState } from "react";
import { Alert, Container, Table, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getRecipientList } from "../../services/RecipientApiService";
import { AdminNavigationBar } from "./AdminNavigationBar";

export function AdminRecipientDetails() {
  const [recipientDetails, setRecipientDetails] = useState([]);
  const adminObj = JSON.parse(localStorage.getItem("admin"));
  const navigate = useNavigate();

  async function fetchRecipientDetails() {
    const response = await getRecipientList();
    console.log(response.data);
    setRecipientDetails(response.data);
  }

  useEffect(() => {
    console.log("inside" + adminObj);
    if (adminObj == null) {
      navigate("/");
    }
    fetchRecipientDetails();
  }, []);

  return (
    <>
      <AdminNavigationBar></AdminNavigationBar>
      <Container className="mt-4 mb-4" style={{ minHeight: "470px" }}>
        <Card className="shadow">
          <Card.Header className="text-white text-center bg-primary">
            <h3 className="mb-0">All Recipient Details</h3>
          </Card.Header>
          <Card.Body>
            <Table responsive striped bordered hover>
              <thead>
                <tr className="text-center">
                  <th colSpan="3">Basic Info</th>
                  <th>||</th>
                  <th colSpan="3">Quantity Required</th>
                  <th>||</th>
                  <th colSpan="3">Quantity Received</th>
                </tr>
                <tr className="text-center">
                  <th>Serial ID</th>
                  <th>Recipient Name</th>
                  <th>Recipient KYC Status</th>
                  <th>||</th>
                  <th>Raw Food</th>
                  <th>Clothes</th>
                  <th>Stationary</th>
                  <th>||</th>
                  <th>Raw Food</th>
                  <th>Clothes</th>
                  <th>Stationary</th>
                </tr>
              </thead>
              <tbody>
                {recipientDetails.map((rd, index) => {
                  return (
                    <tr
                      key={index}
                      className={`text-center ${
                        index % 2 === 0 ? "bg-light" : ""
                      }`}
                    >
                      <td>{index + 1}</td>
                      <td>{rd.recipientName}</td>
                      <td>{rd.kycverified ? "Verified" : "Pending"}</td>
                      <td>||</td>
                      <td>{rd.rawFoodQuantityRequired}</td>
                      <td>{rd.clothesQuantityRequired}</td>
                      <td>{rd.stationaryQuantityRequired}</td>
                      <td>||</td>
                      <td>{rd.rawFoodQuantityReceived}</td>
                      <td>{rd.clothesQuantityReceived}</td>
                      <td>{rd.stationaryQuantityReceived}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
