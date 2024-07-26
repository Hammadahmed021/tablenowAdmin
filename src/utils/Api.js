import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_APP_KEY;

export const getListDetails = async (url, params) => {
  try {
    const response = await axios.get(`${BASE_URL}${url}`, {
      params: {
        ...params,
        api_key: API_KEY,
      },
    });
    console.log('Full Response:', response.data); // Log the full response object
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.response || error.message); // Detailed error logging
    throw error;
  }
};
