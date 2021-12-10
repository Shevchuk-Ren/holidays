import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
// axios.defaults.headers.common.Authorization = `Bearer ${token.token}`;

async function getUserList(token: any) {
  axios.defaults.headers.common.Authorization = `Bearer ${token.token}`;
  try {
    const response = await axios.post('/users/list', token);
    return response.data;
  } catch (error) {
    return error;
  }
}
export default getUserList;
