import axios from "axios";

const BASE_URL = "http://localhost:8080/";

export async function adminLogin(admin) {
  console.log(admin);
  return axios.post(BASE_URL + "adminLogin", admin);
}

//checkEmail
export async function checkEmail(email) {
  console.log("email :" + email);
  return axios.post(BASE_URL + "checkEmail", email);
}

//update forget password
export async function userPasswordUpdate(donor) {
  console.log(donor);
  return axios.post(BASE_URL + "userPasswordUpdate", donor);
}
