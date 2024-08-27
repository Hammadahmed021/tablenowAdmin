import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_APP_KEY;
// const token = 'RGV8JpfbC9J4vgwkKRZvooC3rQVXIuINJlB2CkF6QgEy9i1qMhTyxWjw5TRs'

// utils/tokenUtils.js

// Import environment variables
const BASE_URL_LOCAL = import.meta.env.VITE_BASE_URL_LOCAL; // '/'
const BASE_URL_PRODUCTION = import.meta.env.VITE_BASE_URL_PRODUCTION; // '/tablenow-admin/'

// Function to get the appropriate token
export const getToken = () => {
  // Determine if running locally or in production
  const isLocal = window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1');
  
  // Get the current pathname
  const path = window.location.pathname;
  
  // Determine if the current path is for the admin panel
  const isAdminPanel = isLocal
    ? path.startsWith(BASE_URL_LOCAL)
    : path.startsWith(BASE_URL_PRODUCTION);

  // Return the appropriate token based on the path
  return isAdminPanel
    ? localStorage.getItem("adminToken")
    : localStorage.getItem("webToken");
};


export const getListDetails = async (url, params) => {
  const token = getToken();
  try {
    const response = await axios.get(`${BASE_URL}${url}`, {
      params: {
        ...params,
        api_key: API_KEY,
      },
      headers: {
        "Content-Type": "application/json",
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

export const approveHotel = async (id, params) => {
  const token = getToken();

  try {
    const response = await fetch(`${BASE_URL}admin/approveHotel/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...params,
        api_key: API_KEY,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${errorData.message}`
      );
    }

    const data = await response.json();
    console.log("ApproveHotel Response:", data);

    return data;
  } catch (error) {
    console.error("Error approving hotel:", error.message);
    throw error;
  }
};

export const toggleBlockUnblockHotel = async (id, params) => {
  const token = getToken();

  try {
    const response = await fetch(`${BASE_URL}admin/blockUnblockHotel/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...params,
        api_key: API_KEY,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${errorData.message}`
      );
    }

    const data = await response.json();
    console.log("ToggleBlockUnblockHotel Response:", data);

    return data;
  } catch (error) {
    console.error("Error blocking/unblocking hotel:", error.message);
    throw error;
  }
};

export const Login = async (userData) => {
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

/* facilities */
export const getFacilities = async () => {
  const token = getToken();

  try {
    const response = await fetch(`${BASE_URL}facilities`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching facilities:", error.message);
    throw error;
  }
};

export const addFacility = async (facility) => {
  const token = getToken();

  try {
    const response = await fetch(`${BASE_URL}facilities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(facility),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding facility:", error.message);
    throw error;
  }
};

export const updateFacility = async (id, facility) => {
  const token = getToken();

  try {
    const response = await fetch(`${BASE_URL}facilities/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(facility),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating facility:", error.message);
    throw error;
  }
};

export const deleteFacility = async (id) => {
  const token = getToken();

  try {
    const response = await fetch(`${BASE_URL}facilities/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting facility:", error.message);
    throw error;
  }
};

/* Areas */

export const getAreas = async () => {
  const token = getToken();

  try {
    const response = await fetch(`${BASE_URL}areas`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching areas:", error.message);
    throw error;
  }
};

export const addArea = async (facility) => {
  const token = localStorage.getItem("adminToken");

  try {
    const response = await fetch(`${BASE_URL}areas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(facility),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding areas:", error.message);
    throw error;
  }
};

export const updateArea = async (id, facility) => {
  const token = getToken();

  try {
    const response = await fetch(`${BASE_URL}areas/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(facility),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating areas:", error.message);
    throw error;
  }
};

export const deleteArea = async (id) => {
  const token = getToken();

  try {
    const response = await fetch(`${BASE_URL}areas/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting areas:", error.message);
    throw error;
  }
};
