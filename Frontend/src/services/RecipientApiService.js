import axios from "axios";

const BASE_URL = "http://localhost:8080/";

export async function saveRecipient(recipient) {
  console.log("inside saveRecipient");
  console.log(recipient);
  return axios.post(BASE_URL + "recipientRegister", recipient);
}
export async function recipientLogin(recipient) {
  return axios.post(BASE_URL + "recipientLogin", recipient);
}
export async function getRecipientFromServer(recipientId) {
  return axios.get(`${BASE_URL}getRecipient/${recipientId}`);
}
export async function saveRecipientRequest(recipientRequest) {
  return axios.post(BASE_URL + "updateDemands", recipientRequest);
}
export async function getUnverifiedRecipientList() {
  return axios.get(BASE_URL + "selectUnverifiedRecipients");
}
//for admin side
export async function updateRecipientKYCStatus(recipient) {
  return axios.post(BASE_URL + "recipientApproval", recipient);
}
//for admin side
export async function getRecipientList() {
  return axios.get(BASE_URL + "selectAllRecipients");
}
//for admin side
export async function getVerifiedRecipientList() {
  return axios.get(BASE_URL + "selectVerifiedRecipients");
}
//to update recp recieved data
export async function updateRecipientRecievedDonationDetails(donorDonationObj) {
  return axios.post(
    BASE_URL + "updateRecipientRecievedDonationDetails",
    donorDonationObj
  );
}

//getting all quantities
export async function fetchRawFoodPercentage() {
  return axios.get(BASE_URL + "getRawFoodPercentage");
}
export async function fetchClothesPercentage() {
  return axios.get(BASE_URL + "getClothesPercentage");
}
export async function fetchStationaryPercentage() {
  return axios.get(BASE_URL + "getStationaryPercentage");
}
