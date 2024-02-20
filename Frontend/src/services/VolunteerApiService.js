import axios from "axios";

const BASE_URL = "http://localhost:8080/";

export async function saveVolunteer(volunteer) {
  console.log(volunteer);
  return axios.post(BASE_URL + "volunteerRegister", volunteer);
}
export async function volunteerLogin(volunteer) {
  console.log(volunteer);
  return axios.post(BASE_URL + "volunteerLogin", volunteer);
}
export async function getVolunteerList() {
  return axios.get(BASE_URL + "listOfVolunteers");
}
export async function getVolunteerFromServer(volunteerId) {
  console.log(`${BASE_URL}volunteerProfile/${volunteerId}`);
  return axios.get(`${BASE_URL}volunteerProfile/${volunteerId}`);
}
export async function updateVolunteer(volunteer) {
  console.log(volunteer);
  return axios.post(BASE_URL + "volunteerUpdate", volunteer);
}
