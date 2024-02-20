import { useEffect, useState } from "react";
import { getDonorDonationDetails } from "../../services/DonationApiService";
import { Alert, Container, Table } from "react-bootstrap";
import { DonorNavigationBar } from "./DonorNavigationBar";
import { useNavigate } from "react-router-dom";

export function DonorDonationDetails() {
  const [donorDonationDetails, setDonorDonationDetails] = useState([]);
  const donorObj = JSON.parse(localStorage.getItem("donor"));
  const navigate = useNavigate();

  const fetchDonationDetails = async () => {
    const response = await getDonorDonationDetails(donorObj.donorId);
    console.log(response.data);
    setDonorDonationDetails(response.data);
  };

  useEffect(() => {
    if (donorObj == null) {
      navigate("/");
    }
    fetchDonationDetails();
  }, []);

  return (
    <>
      <DonorNavigationBar></DonorNavigationBar>
      <Container className="mt-4 mb-4" style={{ minHeight: "465px" }}>
        <h3 className="text-center mb-3">My Donations</h3>
        <div className="p-3 bg-light shadow">
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Serial ID</th>
                <th>Raw Food Quantity</th>
                <th>Clothes Quantity</th>
                <th>Stationary Quantity</th>
                <th>Volunteer Assigned</th>
                <th>Volunteer Contact Details</th>
                <th>Volunteer Alternate Contact Details</th>
              </tr>
            </thead>
            <tbody>
              {donorDonationDetails.map((dd, index) => {
                return (
                  <tr key={dd.donationId}>
                    <td>{index + 1}</td>
                    <td>{dd.rawFoodQuantity}</td>
                    <td>{dd.clothesQuantity}</td>
                    <td>{dd.stationaryQuantity}</td>
                    <td>
                      {(dd.volunteer && dd.volunteer.volunteerName) ||
                        "Not Assigned"}
                    </td>
                    <td>
                      {(dd.volunteer && dd.volunteer.volunteerPhone) || "--"}
                    </td>
                    <td>
                      {(dd.volunteer && dd.volunteer.volunteerAlternatePhone) ||
                        "--"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
}
