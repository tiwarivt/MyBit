import { useEffect, useState } from "react";
import { Table,Image, Container, Card, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getDonorFromServer } from "../../services/DonerApiService";
import { DonorNavigationBar } from "./DonorNavigationBar";


export function DonorProfile() {
  const [donorDetails, setDonorDetails] = useState({});
  const donorObj = JSON.parse(localStorage.getItem("donor"));
  const navigate = useNavigate();

  const getDonorDetails = async () => {
    const response = await getDonorFromServer(donorObj.donorId);
    if (response.status === 200) {
      setDonorDetails(response.data);
      console.log(response.data);
    }
  };

  //componentDidMount
  useEffect(() => {
    if (donorObj == null) {
      navigate("/");
    }
    getDonorDetails();
  }, []);

  return (
    <>
      <DonorNavigationBar></DonorNavigationBar>
      <Container className="mt-1 mb-2">
      <Row className="justify-content-center">
        <Col md={6}>
        <Card className="shadow-lg p-5">
          <h1 className="text-center mb-5">Donor Profile</h1>
          <div className="d-flex justify-content-center align-items-center mb-4">
          <Image src={"https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"} roundedCircle className="mr-3" width={100} height={100} />
          </div>
          <Table responsive striped bordered hover>
            <tbody>
              <tr>
                <th>Name</th>
                <td>{donorDetails.donorName}</td>
              </tr>
              <tr>
                <th>Phone Number</th>
                <td>{donorDetails.donorPhone}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{donorDetails.donorEmail}</td>
              </tr>
              <tr>
                <th>Address</th>
                <td>{donorDetails.donorAddress}</td>
              </tr>
              <tr>
                <th>ZIP code</th>
                <td>{donorDetails.donorZipCode}</td>
              </tr>
            </tbody>
          </Table>
          <div className="d-flex justify-content-center align-items-center mb-4">
          <Link to={"/donorEditProfile"}>
            <Button className="mt-3 " variant="primary">
              Edit Profile
            </Button>
          </Link>
          </div>
         
        </Card>
        </Col>
      </Row>
      </Container>
    </>
  );
}
