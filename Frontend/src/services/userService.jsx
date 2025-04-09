import axios from "../axiosInstance.js"

// Register a new user
export const registerUser = async (formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const response = await axios.post("/register", formData, config);
  return response.data;
};

// Login a user
export const loginUser = async (credentials) => {
  const response = await axios.post("/login", credentials, {
    withCredentials: true,
  });
  return response.data;
};

// Logout the user
export const logoutUser = async () => {
  const response = await axios.post(
    "/logout",
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
