import axios from 'axios';
import { API_URL } from '../constants';

const getTeacherLessons = (teacherId) => {
  return axios
    .get(`${API_URL}lessons/teachers`, {
      params: {
        teacherId: teacherId,
      },
    })
    .then((response) => {
      return response.data;
    });
};

const getStudentsLessons = (studentId) => {
  return axios
    .get(`${API_URL}lessons/students`, {
      params: {
        studentId: studentId,
      },
    })
    .then((response) => {
      return response.data;
    });
};

const createLesson = (data) => {
  return axios.post(`${API_URL}lessons/create`, data).then((response) => {
    return response.data;
  });
};

const lessons = {
  getTeacherLessons,
  getStudentsLessons,
  createLesson,
};

export default lessons;
