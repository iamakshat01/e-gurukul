import axios from 'axios';
import decode from 'jwt-decode';

const host = 'http://localhost:3000';

// call this without token for logout
export const setToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// for calling the api 
// method -> get, put, post etc
// path -> routes after host as string
// data -> which you need to send in body
export const call = async (method, path, data) => {
  const response = await axios[method](`${host}/${path}`, data);
  return response.data;
};

// check authentication
export const isAuthenticated = () => {
    if (localStorage.jwtToken)
        return (decode(localStorage.jwtToken))
    else
      return false
}


export default { setToken, call, isAuthenticated };