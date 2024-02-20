import { useEffect, useState } from "react";
import {
  getVolunteerDonationDetailsIsCollected,
  updateDonorDonationDetail,
} from "../../services/DonationApiService";
import { Alert, Button, Container, Table } from "react-bootstrap";
import { VolunteerNavigationBar } from "./VolunteerNavigationBar";
import { updateRecipientRecievedDonationDetails } from "../../services/RecipientApiService";
import { useNavigate } from "react-router-dom";

export function VolunteerDonationIsCollected() {
  const [donorDonationDetails, setDonorDonationDetails] = useState([]);
  const volunteerObj = JSON.parse(localStorage.getItem("volunteer"));
  const navigate = useNavigate();

  const fetchDonorDonationData = async () => {
    const response = await getVolunteerDonationDetailsIsCollected(
      volunteerObj.volunteerId
    );
    setDonorDonationDetails(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    if (volunteerObj == null) {
      navigate("/");
    }
    fetchDonorDonationData();
  }, []);

  function handleChange(e, donorDonationObj) {
    donorDonationObj.donationStatus = e.target.value;
  }

  async function saveChanges(donorDonationObj) {
    const response = await updateDonorDonationDetail(donorDonationObj);
    console.log(response.data);
    //fetching updated details into state

    updateRecipientRecievedDonationDetails(donorDonationObj);
    fetchDonorDonationData();
  }

  return (
    <>
      <VolunteerNavigationBar></VolunteerNavigationBar>
      <Container style={{ minHeight: "488px" }}>
        <Container className="mt-4 mb-4 text-center">
          <Alert className="bg-primary text-white shadow-lg">
            <h3 className="mb-0">Donation to be delivered by the Volunteer</h3>
          </Alert>
        </Container>
        <Container className="p-3 border border-primary rounded">
          <Table responsive striped bordered>
            <thead>
              <tr>
                <th>Serial ID</th>
                <th>Recipient Name</th>
                <th>Recipient Contact Details</th>
                <th>Recipient Address</th>
                <th>Recipient ZIP Code</th>
                <th>Donation Status</th>
                <th>Click To Update</th>
              </tr>
            </thead>
            <tbody>
              {donorDonationDetails.map((dd, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{dd.recipient.recipientName}</td>
                    <td>{dd.recipient.recipientPhone}</td>
                    <td>{dd.recipient.recipientAddress}</td>
                    <td>{dd.recipient.recipientZipCode}</td>
                    <td>
                      <select
                        className="form-select"
                        name="donationStatus"
                        required
                        onChange={(e) => {
                          handleChange(e, dd);
                        }}
                      >
                        <option value="isCollected">
                          Donation is Collected
                        </option>
                        <option value="isDelivered">
                          Donation is Delivered
                        </option>
                      </select>
                    </td>
                    <td>
                      <Button
                        onClick={() => saveChanges(dd)}
                        className="btn-sm"
                      >
                        Save
                      </Button>{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </Container>
    </>
  );
}
