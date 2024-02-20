import axios from 'axios';

const BASE_URL = 'http://localhost:8080/';

export async function saveDonation(donation){
    console.log(donation);
    return axios.post(BASE_URL+"donationDetailsAdd",donation);
}
//for donor side
export async function getDonorDonationDetails(donorId){
    return axios.get(`${BASE_URL}donationDetailsOrderByDonor/${donorId}`);
}

//for admin side
export async function getNotAssignedDonationDetails(){
    return axios.get(BASE_URL+"donationsForNotAssignedVolunteers");
}

//for admin side
export async function getAssignedDonationDetails(){
    return axios.get(BASE_URL+"donationsForAssignedVolunteers");
}

//for admin side
export async function updateDonorDonationDetail(donorDonationDetail){
    return axios.post(BASE_URL+"donationDetailsUpdate", donorDonationDetail);
}

//for volunteer side
export async function getVolunteerDonationDetails(volunteerId){
    return axios.get(`${BASE_URL}donationDetailsOrderByVolunteer/${volunteerId}`);
}

//volunter side donation donationToBeCollected 
export async function getVolunteerDonationDetailsToBeCollected(volunteerId){
    return axios.get(`${BASE_URL}donationToBeCollected/${volunteerId}`);
}

//volunter side donation isCollected 
export async function getVolunteerDonationDetailsIsCollected(volunteerId){
    return axios.get(`${BASE_URL}donationIsCollected/${volunteerId}`);
}

//for recipient side
// export async function getRecipientDonationDetails(){
//     return axios.get(BASE_URL+"donationDetailsOrderByRecipient");
// }