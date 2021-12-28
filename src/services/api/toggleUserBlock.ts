import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

async function toggleUserBlock(id: number, token: string) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  try {
    const response = await axios.post(`/user/block/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
}
export default toggleUserBlock;
