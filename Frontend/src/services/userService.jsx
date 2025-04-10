import axios from "axios";

// Register a new user
export const registerUser = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axios.post(
    "https://real-time-chat-app-3-axa5.onrender.com/api/v1/users/register",
    formData,
    config
  );
  return response.data;
};

// Login a user
export const loginUser = async (credentials) => {
  const response = await axios.post(
    "https://real-time-chat-app-3-axa5.onrender.com/api/v1/users/login",
    credentials,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

// Logout the user
export const logoutUser = async () => {
  const response = await axios.post(
    "https://real-time-chat-app-3-axa5.onrender.com/api/v1/users/logout",
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

// Refresh the access token
export const refreshAccessToken = async () => {
  const response = await axios.post(
    "/refresh-token",
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

// Search for a user by username
export const searchUserByUsername = async (username) => {
  try {
    const response = await axios.get(`/search-user?username=${username}`);
    return response.data;
  } catch (error) {
    throw new Error("User not found");
  }
};
