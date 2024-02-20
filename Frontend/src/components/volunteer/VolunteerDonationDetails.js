import { useEffect, useState } from "react";
import { getVolunteerDonationDetails } from "../../services/DonationApiService";
import { Alert, Container, Table } from "react-bootstrap";
import { VolunteerNavigationBar } from "./VolunteerNavigationBar";
import { useNavigate } from "react-router-dom";

export function VolunteerDonationDetails(){

    const [ donorDonationDetails, setDonorDonationDetails ] = useState([]);
    const volunteerObj = JSON.parse(localStorage.getItem("volunteer"));
    const navigate = useNavigate();

    const fetchData = async () => {
        const response = await getVolunteerDonationDetails(volunteerObj.volunteerId);
        console.log(response.data);
        setDonorDonationDetails( response.data );
    }

    useEffect( () =>{
        if(volunteerObj == null){
            navigate("/");
        }
        fetchData();
    },[]);

    return(
        <>
            <VolunteerNavigationBar></VolunteerNavigationBar>
            <Container className="mt-4 mb-4 text-center">
                <Alert>
                Donation to be collected by volunteers
                </Alert>
            </Container>

            <Container>
                <Table>
                    <thead>
                        <tr>
                            <th>DonationId</th>
                            <th>RawFoodQuantity</th>
                            <th>ClothesQuantity</th>
                            <th>StationaryQuantity</th>
                            <th>DonorName</th>
                            <th>DonorContactDetails</th>
                            <th>DonorAddress</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            donorDonationDetails.map((dd) => {
                                return (
                                    <tr>
                                        <td>{dd.donationId}</td>
                                        <td>{dd.rawFoodQuantity}</td>
                                        <td>{dd.clothesQuantity}</td>
                                        <td>{dd.stationaryQuantity}</td>
                                        <td>{dd.donor.donorName}</td>
                                        <td>{dd.donor.donorPhone}</td>
                                        <td>~Donor Address!</td>

                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        </>
    )
}