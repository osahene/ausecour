import axios from "axios";
import jwtDecode from "jwt-decode"; // Adjusted to correct import syntax
import dayjs from "dayjs";
import { notify } from "react-notify-toast";

// Creating Axios instance with default configuration
const $axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
  "Content-type": "application/json",
});

// Function to refresh access token
const TakeRefreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) return null;
  try {
    const response = await axios.post(
      `${$axios.defaults.baseURL}account/token/refresh/`,
      {
        refresh: refreshToken,
      }
    );
    const { access, refresh } = response.data;
    if (access) {
      $axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
      localStorage.setItem("accessToken", access);
      // Update refresh token if a new one is provided
      if (refresh) {
        localStorage.setItem("refreshToken", refresh);
      }
      return { accessToken: access, refreshToken: refresh || refreshToken };
    }
  } catch (e) {
    let errorMessage = "Error refreshing token";

    if (e.response && e.response.data && e.response.data.detail) {
      errorMessage = e.response.data.detail;
    } else if (e.message) {
      errorMessage = e.message;
    }

    notify.show(errorMessage, "error");
    return null;
  }
};

// Function to schedule token refresh checks
const scheduleTokenRefresh = () => {
  setInterval(async () => {
    const accessTokens = localStorage.getItem("accessToken");
    const refreshTokens = localStorage.getItem("refreshToken");

    if (accessTokens && refreshTokens) {
      const user = jwtDecode(accessTokens);
      const accessExpTime = dayjs.unix(user.exp);
      const now = dayjs();

      const refreshTokenExpTime = dayjs.unix(jwtDecode(refreshTokens).exp);

      // Refresh the access token if it will expire in the next minute and the user is active
      if (accessExpTime.diff(now, "minute") <= 1) {
        await TakeRefreshToken();
      }

      // Log out user if the refresh token will expire in the next minute
      const lastActive = dayjs(localStorage.getItem("lastActive"));
      if (
        now.diff(lastActive, "minute") >= 10 &&
        refreshTokenExpTime.diff(now, "minute") <= 1
      ) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // Redirect to login page
      }
    }
  }, 30000); // Check every minute
};

scheduleTokenRefresh();

// Axios request interceptor to handle GraphQL queries
$axios.interceptors.request.use(async (req) => {
  let accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    const user = jwtDecode(accessToken);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      const tokens = await TakeRefreshToken();
      if (tokens && tokens.accessToken) {
        req.headers.Authorization = `Bearer ${tokens.accessToken}`;
      } else {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // Redirect to login page
      }
    }
  }

  return req;
});

// Axios response interceptor to handle errors
$axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Handle unauthorized errors
      notify.show("Session expired. Please log in again.", "error");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Function to send GraphQL queries
export const graphqlRequest = async (query, variables = {}) => {
  try {
    const response = await $axios.post("", {
      query,
      variables,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response.data.errors[0].message || "GraphQL request failed"
    );
  }
};

export { $axios };
