import axios from 'axios';
import { API_URL } from '../constants';

const getTeachersStudents = (teacherId) => {
  return axios
    .get(`${API_URL}teachers/${teacherId}/students`)
    .then((response) => {
      return response.data;
    });
};

const addStudent = (studentId, teacherId) => {
  return axios.post(`${API_URL}teachers/add_student`, {
    studentId,
    teacherId,
  });
};

const teachers = {
  getTeachersStudents,
  addStudent,
};

export default teachers;
