import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3004/';

async function getDayOffById(userId: any) {
  try {
    const response = await axios.get('dayOff', userId);
    return response.data;
  } catch (error) {
    return error;
  }
}
export default getDayOffById;
