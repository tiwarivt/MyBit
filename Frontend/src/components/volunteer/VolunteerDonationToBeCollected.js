import { useEffect, useState } from "react";
import {
  getVolunteerDonationDetailsToBeCollected,
  updateDonorDonationDetail,
} from "../../services/DonationApiService";
import { Alert, Button, Container, Table } from "react-bootstrap";
import { VolunteerNavigationBar } from "./VolunteerNavigationBar";
import { useNavigate } from "react-router-dom";

export function VolunteerDonationToBeCollected() {
  const [donorDonationDetails, setDonorDonationDetails] = useState([]);
  const volunteerObj = JSON.parse(localStorage.getItem("volunteer"));
  const navigate = useNavigate();

  const fetchDonorDonationData = async () => {
    const response = await getVolunteerDonationDetailsToBeCollected(
      volunteerObj.volunteerId
    );
    //tobecollected data 1st page;

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
    fetchDonorDonationData();
  }

  return (
    <>
      <VolunteerNavigationBar></VolunteerNavigationBar>
      <Container style={{ minHeight: "488px" }}>
        <Container className="mt-4 mb-4 text-center">
          <Alert className="bg-primary text-white shadow-lg">
            <h3 className="mb-0">Donation to be collected</h3>
          </Alert>
        </Container>
        <Container className="p-3 border border-primary rounded">
          <Table responsive striped bordered>
            <thead>
              <tr>
                <th>Serial ID</th>
                <th>Donor Name</th>
                <th>Donor Contact Details</th>
                <th>Donor Address</th>
                <th>Donor ZIP Code</th>
                <th>Donation Status</th>
                <th>Click To Update</th>
              </tr>
            </thead>
            <tbody>
              {donorDonationDetails.map((dd, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{dd.donor.donorName}</td>
                    <td>{dd.donor.donorPhone}</td>
                    <td>{dd.donor.donorAddress}</td>
                    <td>{dd.donor.donorZipCode}</td>
                    <td>
                      <select
                        className="form-select"
                        name="donationStatus"
                        required
                        onChange={(e) => {
                          handleChange(e, dd);
                        }}
                      >
                        <option value="toBeCollected">
                          Donation To Be Collected
                        </option>
                        <option value="isCollected">
                          Donation is Collected
                        </option>
                      </select>
                    </td>
                    <td>
                      <Button
                        onClick={() => saveChanges(dd)}
                        className="btn-sm  btn-primary"
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
