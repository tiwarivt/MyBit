import { useEffect, useState } from "react";
import { Alert, Card, Container, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getRecipientFromServer } from "../../services/RecipientApiService";
import { RecipientNavigationBar } from "./RecipientNavigationBar";

export function RecipientRequestDetails() {
  const [recipientDetails, setRecipientDetails] = useState({});
  const recipientObj = JSON.parse(localStorage.getItem("recipient"));
  const navigate = useNavigate();

  async function fetchRecipientDetails() {
    const response = await getRecipientFromServer(recipientObj.recipientId);
    console.log(response.data);
    setRecipientDetails(response.data);
  }

  useEffect(() => {
    if (recipientObj == null) {
      navigate("/");
    }
    fetchRecipientDetails();
  }, []);

  if (recipientDetails.kycverified) {
    return (
      <>
        <RecipientNavigationBar
          status={recipientDetails.kycverified}
        ></RecipientNavigationBar>
        <Container
          className="mt-4 mb-4 text-center"
          style={{ minHeight: "62vh", marginBottom: "5rem" }}
        >
          <h3 className="text-primary mb-3">
            Table for the recipient made donation requests
          </h3>
          <Card className="shadow-lg p-3 mb-5 bg-body rounded">
            <Table responsive striped bordered hover>
              <thead>
                <tr className="text-center">
                  <th colSpan="3">Quantity Required</th>
                  <th colSpan="3">Quantity Received</th>
                </tr>
                <tr className="text-center">
                  <th>Raw Food</th>
                  <th>Clothes</th>
                  <th>Stationary</th>
                  <th>Raw Food</th>
                  <th>Clothes</th>
                  <th>Stationary</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td>{recipientDetails.rawFoodQuantityRequired}</td>
                  <td>{recipientDetails.clothesQuantityRequired}</td>
                  <td>{recipientDetails.stationaryQuantityRequired}</td>
                  <td>{recipientDetails.rawFoodQuantityReceived}</td>
                  <td>{recipientDetails.clothesQuantityReceived}</td>
                  <td>{recipientDetails.stationaryQuantityReceived}</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Container>
      </>
    );
  } else {
    navigate("/recipientHome");
  }
}
