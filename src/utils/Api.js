import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_APP_KEY;
// const token = 'RGV8JpfbC9J4vgwkKRZvooC3rQVXIuINJlB2CkF6QgEy9i1qMhTyxWjw5TRs'

export const getListDetails = async (url, params, token) => {
  try {
    const response = await axios.get(`${BASE_URL}${url}`, {
      params: {
        ...params,
        api_key: API_KEY,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Full Response:", response.data); // Log the full response object
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error.response || error.message); // Detailed error logging
    throw error;
  }
};

export const approveHotel = async (id, params, token) => {
  console.log('Token:', token);
  console.log('ID:', id);

  try {
    const response = await fetch(`${BASE_URL}admin/approveHotel/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...params,
        api_key: API_KEY,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message}`);
    }

    const data = await response.json();
    console.log('ApproveHotel Response:', data);

    return data;
  } catch (error) {
    console.error('Error approving hotel:', error.message);
    throw error;
  }
};

export const toggleBlockUnblockHotel = async (id, params, token) => {
  console.log('Token:', token);
  console.log('ID:', id);
  console.log('Params:', params);

  try {
    const response = await fetch(`${BASE_URL}admin/blockUnblockHotel/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...params,
        api_key: API_KEY,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message}`);
    }

    const data = await response.json();
    console.log('ToggleBlockUnblockHotel Response:', data);

    return data;
  } catch (error) {
    console.error('Error blocking/unblocking hotel:', error.message);
    throw error;
  }
};


export const Login = async (userData) => {
  console.log(userData, "userData");
  try {
    const { email, fname, password } = userData;
    const payload = {
      // name: fname,
      email,
      password,
      type: "admin",
    };
    console.log(payload, "payload");

    const response = await axios.post(`${BASE_URL}login`, payload);
    console.log(response, "payload");

    return response.data;
  } catch (error) {
    console.error("API Login request failed:", error.response);
    throw error;
  }
};
