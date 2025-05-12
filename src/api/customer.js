import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';
// Cấu hình axios
const api = axios.create({
  baseURL: API_URL,  // Địa chỉ API của bạn
  headers: {
    'Content-Type': 'application/json',
  }
});

// Ví dụ gọi API login
export const customerCreate = async (name, phone, address, debt) => {
  try {
    const response = await api.post('customerCreate', {
      name,
      phone,
      address,
      debt
    });
    return response.data;
  } catch (error) {
    throw error.response || error;
  }
};