import axios from "axios";

// Base URL
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

// Types
interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
}

// Login function
export const loginUser = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await API.post<LoginResponse>("/api/auth/login", credentials);
    return response.data; // ✅ Only data
  } catch (err: any) {
    return {
      success: false,
      message: err.response?.data?.message || err.message || "Login failed",
    };
  }
};

// upload photos




export default API;
