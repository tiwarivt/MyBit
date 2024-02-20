import axios from 'axios';

const BASE_URL = 'http://localhost:9800/students';

export async function saveDonor(student){
    return axios.post(BASE_URL,student)
}

export async function getDonor(student){
    return axios.get(BASE_URL,student)
}

export async function getAllStudentsFromServer(){
    return axios.get(BASE_URL);
}

export function deleteStudentFromServer(id){
    return axios.delete(`${BASE_URL}/${id}`);
}

export function getStudentsByNamePattern(pattern){
    return axios.get(`${BASE_URL}/name/${pattern}`);
}
