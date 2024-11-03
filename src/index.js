import React from "react"; // { useState }
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./AuthContext";
import App from "./App";
import ContactBook from "./components/contactbook";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import Usersettings from "./components/settings/usersettings";
import Accept from "./components/acceptance/accept";
import Invitation from "./components/acceptance/invitation";
import Login from "./components/auth/login";
import ErrorPage from "./components/errorpage";
import Register from "./components/auth/register";
import OTPpage from "./components/auth/otp";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import dayjs from "dayjs";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import ClipLoader from "react-spinners/ClipLoader";

const router = createBrowserRouter([
  { path: "/", element: <App />, errorElement: <ErrorPage /> },
  { path: "/contact", element: <ContactBook /> },
  { path: "/settings", element: <Usersettings /> },
  { path: "/accept", element: <Accept /> },
  { path: "/accept/invite", element: <Invitation /> },
  { path: "/register", element: <Register /> },
  { path: "/otp", element: <OTPpage /> },
  { path: "/login", element: <Login /> },
]);

// Axios instance
const $axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://127.0.0.1:8000",
  withCredentials: true,
  headers: { "Content-type": "application/json" },
});

// React spinner and notification setup
const LoadingSpinner = ({ loading }) => (
  <ClipLoader
    color="blue"
    loading={loading}
    cssOverride={{ display: "block", margin: "0 auto" }}
    size={150}
  />
);

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
      if (refresh) {
        localStorage.setItem("refreshToken", refresh);
      }
      return { accessToken: access, refreshToken: refresh || refreshToken };
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.detail || error.message || "Error refreshing token";
    Store.addNotification({
      title: "Token Error",
      message: errorMessage,
      type: "danger",
      insert: "top",
      container: "top-right",
      dismiss: {
        duration: 3000,
        onScreen: true,
      },
    });
    return null;
  }
};

// Axios interceptors for requests and responses
$axios.interceptors.request.use(
  async (req) => {
    // const [loading, setLoading] = useState(false);
    // setLoading(true);

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
          window.location.href = "/login";
        }
      }
    }

    // setLoading(false);
    return req;
  },
  (error) => {
    // setLoading(false);
    return Promise.reject(error);
  }
);

$axios.interceptors.response.use(
  (response) => {
    Store.addNotification({
      title: "Success",
      message: "Request completed successfully",
      type: "success",
      insert: "top",
      container: "top-right",
      dismiss: {
        duration: 2000,
        onScreen: true,
      },
    });
    return response;
  },
  (error) => {
    Store.addNotification({
      title: "Error",
      message: error.message || "Request failed",
      type: "danger",
      insert: "top",
      container: "top-right",
      dismiss: {
        duration: 3000,
        onScreen: true,
      },
    });
    return Promise.reject(error);
  }
);
export default $axios;
// Render the React app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ReactNotifications />
      <RouterProvider router={router} />
    </AuthProvider>
    <LoadingSpinner loading={false} />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
