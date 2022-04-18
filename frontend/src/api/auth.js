import axios from 'axios';
import { API_URL } from '../constants';

/**
 *
 * @param {Object} userData Параметры регистрации
 * @param {String} userData.fullName
 * @param {String} userData.email
 * @param {String} userData.password
 * @param {String} userData.repeatPassword
 * @param {Text} userData.bio
 * @param {Int} userData.roleId
 */
const signUp = (userData) => {
  return axios.post(API_URL + 'auth/signup', userData).then((response) => {
    return response.data;
  });
};

const signIn = (email, password) => {
  return axios
    .post(API_URL + 'auth/signin', {
      email,
      password,
    })
    .then((response) => {
      return response.data;
    });
};

const auth = {
  signIn,
  signUp,
};

export default auth;
