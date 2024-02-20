import axios from "axios";

const BASE_URL = "http://localhost:8080/";

export async function saveDonor(donor) {
  console.log(donor);
  return axios.post(BASE_URL + "donorRegister", donor);
}
export async function donorLogin(donor) {
  // console.log(donor);
  return axios.post(BASE_URL + "donorLogin", donor);
}
export async function getDonorFromServer(donorId) {
  //console.log(`${BASE_URL}donorProfile/${donorId}`);
  return axios.get(`${BASE_URL}donorProfile/${donorId}`);
}

export async function getDonor(donor) {
  return axios.get(BASE_URL, donor);
}
export function getDetails(id) {
  return axios.get(`${BASE_URL}/${id}`);
}

export function updatedDonor(donor) {
  return axios.post(BASE_URL + "donorUpdate", donor);
}
