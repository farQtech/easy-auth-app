import axios from 'axios';
import { getToken, setToken } from './auth';
import { API_ENDPOINTS } from './constants';

/**
 * Creates and configures an Axios API client with JWT authentication support.
 * Adds the Authorization header if a token is present.
 * @returns {AxiosInstance} Configured Axios client instance.
 */
export const getApiClient = () => {
  const client = axios.create({
    baseURL: API_ENDPOINTS.BASE, 
    headers: {
      'Content-Type': 'application/json',
    },
  });
  client.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }, (error) => Promise.reject(error));
  return client;
};

const apiClient = getApiClient();

/**
 * Registers a new user by sending their data to the backend API.
 * @param data - The user registration data (email, password, name).
 * @param client - Optional Axios client instance (default: apiClient).
 * @returns {Promise<any>} The response data from the API.
 * @throws Will throw if the API call fails.
 */
export const signUpUser = async (
  data: { email: string; password: string; name?: string },
  client = apiClient
) => {
  try {
    const response = await client.post(API_ENDPOINTS.REGISTER, data);
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

/**
 * Signs in a user by sending their credentials to the backend API.
 * Stores the access token if authentication is successful.
 * @param data - The user login data (email, password).
 * @param client - Optional Axios client instance (default: apiClient).
 * @returns {Promise<any>} The response data from the API.
 * @throws Will throw if the API call fails or no access token is received.
 */
export const signInUser = async (
  data: { email: string; password: string },
  client = apiClient
) => {
  try {
    const response = await client.post(API_ENDPOINTS.LOGIN, data);

    const accessToken = response.data?.access_token;
    if (accessToken) {
      setToken(accessToken);
    } else {
      throw new Error('No access token received');
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

