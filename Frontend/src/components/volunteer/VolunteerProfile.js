import { useEffect, useState } from "react";
import { Table, Container, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getVolunteerFromServer } from "../../services/VolunteerApiService";
import { VolunteerNavigationBar } from "./VolunteerNavigationBar";

export function VolunteerProfile() {
  const [volunteerDetails, setVolunteerDetails] = useState({});
  const volunteerObj = JSON.parse(localStorage.getItem("volunteer"));
  const navigate = useNavigate();

  const getVolunteerDetails = async () => {
    const response = await getVolunteerFromServer(volunteerObj.volunteerId);
    if (response.status === 200) {
      setVolunteerDetails(response.data);
      console.log(response.data);
    }
  };

  //componentDidMount
  useEffect(() => {
    if (volunteerObj == null) {
      navigate("/");
    }
    getVolunteerDetails();
  }, []);

  return (
    <>
      <VolunteerNavigationBar></VolunteerNavigationBar>
      <Container className="mt-3 mb-3">
        <Card className="shadow-lg p-5">
          <h1 className="text-center mb-5">User Profile</h1>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <th>Name</th>
                <td>{volunteerDetails.volunteerName}</td>
              </tr>
              <tr>
                <th>Age</th>
                <td>{volunteerDetails.volunteerAge}</td>
              </tr>
              <tr>
                <th>Phone Number</th>
                <td>{volunteerDetails.volunteerPhone}</td>
              </tr>
              <tr>
                <th>Alternate Phone Number</th>
                <td>{volunteerDetails.volunteerAlternatePhone || "--"}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{volunteerDetails.volunteerEmail}</td>
              </tr>
              <tr>
                <th>ZipCode</th>
                <td>{volunteerDetails.volunteerZipCode}</td>
              </tr>
            </tbody>
          </Table>
          <Link to={"/volunteerEditProfile"}>
            <Button className="mt-3" variant="primary">
              Edit Profile
            </Button>
          </Link>
        </Card>
      </Container>
    </>
  );
}
