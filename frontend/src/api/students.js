import axios from 'axios';
import { API_URL } from '../constants';

const getAllStudents = () => {
  return axios.get(`${API_URL}students`).then((response) => {
    return response.data;
  });
};

const getStudentTeachers = (studentId) => {
  return axios
    .get(`${API_URL}students/${studentId}/teachers`)
    .then((response) => {
      return response.data;
    });
};

const students = {
  getAllStudents,
  getStudentTeachers,
};

export default students;
