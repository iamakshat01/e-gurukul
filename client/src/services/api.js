import axios from 'axios';
import decode from 'jwt-decode';

const host = 'http://localhost:3000';

// call this without token for logout
export const setToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('jwtToken', token);
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

export const formcall = async (method, path, data) => {
  const response = await axios({
    method: method,
    url: `${host}/${path}`,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
  return response.data;
};

export const getHost = () => {
  return host;
}

// check authentication
export const isAuthenticated = () => {

  if (localStorage.jwtToken)
    return (decode(localStorage.jwtToken))
  else
    return false
}

export const removeToken = () => {
  localStorage.removeItem('jwtToken');
}


export default { setToken, call, isAuthenticated, removeToken, formcall, getHost };