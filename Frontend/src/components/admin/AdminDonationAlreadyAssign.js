import { useEffect, useState } from "react";
import { getAssignedDonationDetails } from "../../services/DonationApiService";
import { Alert, Container, Table } from "react-bootstrap";
import { AdminNavigationBar } from "./AdminNavigationBar";
import { useNavigate } from "react-router-dom";

export function AdminDonationAlreadyAssign() {
  const [donorDonationDetails, setDonorDonationDetails] = useState([]);
  const adminObj = JSON.parse(localStorage.getItem("admin"));
  const navigate = useNavigate();

  async function fetchDonorDonationData() {
    const response = await getAssignedDonationDetails();
    console.log("donor donation data");
    console.log(response.data);
    setDonorDonationDetails(response.data);
  }

  //for fetching the initial data
  useEffect(() => {
    console.log("inside" + adminObj);
    if (adminObj == null) {
      navigate("/");
    }
    fetchDonorDonationData();
  }, []);

  return (
    <>
      <AdminNavigationBar></AdminNavigationBar>
      <Container className="mt-4 mb-4 text-center">
        <Alert className="bg-primary text-white shadow-lg">
          <h3 className="mb-0">
            List of Volunteers Assigned to Collect Donations
          </h3>
        </Alert>
      </Container>

      <Container
        style={{ minHeight: "380px" }}
        className="mt-4 mb-4 text-center"
      >
        {" "}
        <Table className="table-bordered shadow-sm">
          <thead>
            <tr>
              <th>Serial ID</th>
              <th>Donor Assigned</th>
              <th>Volunteer Assigned</th>
              <th>Recipient Assigned</th>
              <th>Donation Status</th>
            </tr>
          </thead>
          <tbody>
            {donorDonationDetails.map((dd, index) => {
              return (
                <tr key={dd.donationId}>
                  <td>{index + 1}</td>
                  <td>{dd.donor.donorName}</td>
                  <td>{dd.volunteer.volunteerName}</td>
                  <td>{dd.recipient.recipientName}</td>
                  <td>
                    {dd.donationStatus == "isCollected"
                      ? "Donation is collected"
                      : dd.donationStatus == "toBeCollected"
                      ? "Donation to be collected"
                      : "Donation is delivered"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
