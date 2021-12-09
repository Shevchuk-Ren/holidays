import axios from 'axios';
import { ILoginData } from '../reducers/user/api.types';

axios.defaults.baseURL = 'http://localhost:3030';

const jwtToken = {
  set(token:string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

async function loginUser(data: ILoginData) {
  try {
    const email = data.login;
    const { password } = data;
    const response = await axios.post('/auth/login', { email, password });
    jwtToken.set(response.data.token);

    return response.data;
  } catch (error) {
    return error;
  }
}

async function logoutUser() {
  try {
    await axios.post('/users/logout');
    jwtToken.unset();
    return 'ok';
  } catch (error) {
    return error;
  }
}
// async function fetchCurrentUser(token:string): Promise<ReturnUser> {

// }
const API = { loginUser, logoutUser };
export default API;
