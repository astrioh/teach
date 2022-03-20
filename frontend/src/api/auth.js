import axios from 'axios';
import { API_URL } from '../constants';

const register = (username, email, password) => {
  return axios.post(API_URL + 'signup', {
    username,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + 'signin', {
      email,
      password,
    })
    .then((response) => {
      return response.data;
    });
};

const auth = {
  register,
  login,
};

export default auth;
