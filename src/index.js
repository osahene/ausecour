import React from "react"; // { useState }
import ReactDOM from "react-dom/client";
// import Cookies from "js-cookie";
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
import OTPRegisterPage from "./components/auth/otpRegister";
import Subscriptions from "./components/subscription/subscription";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import dayjs from "dayjs";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import HashLoader from "react-spinners/HashLoader";
import {
  LoadingProvider,
  useLoading,
  setGlobalLoading,
} from "./LoadingContext";

const router = createBrowserRouter([
  { path: "/", element: <App />, errorElement: <ErrorPage /> },
  { path: "/contact", element: <ContactBook /> },
  { path: "/settings", element: <Usersettings /> },
  { path: "/accept/:contactId", element: <Accept /> },
  { path: "/accept/invite", element: <Invitation /> },
  { path: "/register", element: <Register /> },
  { path: "/otp", element: <OTPpage /> },
  { path: "/otpRegister", element: <OTPRegisterPage /> },
  { path: "/login", element: <Login /> },
  { path: "/subscribe", element: <Subscriptions /> },
]);

// Axios instance
const $axios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://127.0.0.1:8000",
  withCredentials: true,
  headers: { "Content-type": "application/json" },
});

const AppWithLoading = () => {
  const { loading } = useLoading();

  return (
    <>
      {loading && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            background: "rgba(255, 255, 255, 0.5)",
            minHeight: "122vh",
            zIndex: 1000,
          }}
        >
          <HashLoader color="rgba(132, 113, 209, 1)" size={70} />
        </div>
      )}
      <RouterProvider router={router} />
    </>
  );
};

const TakeRefreshToken = async () => {
  let refresh_token = localStorage.getItem("refresh_token");
  if (!refresh_token) return null;

  try {
    if (refresh_token) {
      if (refresh_token.startsWith('"') && refresh_token.endsWith('"')) {
        refresh_token = refresh_token.slice(1, -1);
      }
      const response = await axios.post(
        `${$axios.defaults.baseURL}/account/token/refresh/`,
        {
          refresh: refresh_token,
        }
      );
      const { access, refresh } = response.data;
      if (access) {
        $axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
        localStorage.setItem("access_token", access);
        if (refresh) {
          localStorage.setItem("refresh_token", refresh);
        }
        return {
          access_token: access,
          refresh_token: refresh || refresh_token,
        };
      }
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
    setGlobalLoading(true);
    let accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      if (accessToken.startsWith('"') && accessToken.endsWith('"')) {
        accessToken = accessToken.slice(1, -1);
      }

      try {
        const user = jwtDecode(accessToken);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired) {
          req.headers.Authorization = `Bearer ${accessToken}`;
        } else {
          // Refresh the token if expired
          const tokens = await TakeRefreshToken();
          if (tokens && tokens.access_token) {
            req.headers.Authorization = `Bearer ${tokens.access_token}`;
          } else {
            // Clear tokens and redirect to login if unable to refresh
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.href = "/login";
          }
        }
      } catch (error) {
        console.error("Token decoding error:", error);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
    }
    return req;
  },
  (error) => {
    setGlobalLoading(false);
    Promise.reject(error);
  }
);

$axios.interceptors.response.use(
  (response) => {
    setGlobalLoading(false);
    Store.addNotification({
      title: "Success",
      message: response.data.message || "Request completed successfully",
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
    setGlobalLoading(false);
    Store.addNotification({
      title: "Error",
      message:
        error.response?.data?.detail || error.message || "Request failed",
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
      <LoadingProvider>
        <ReactNotifications />
        <AppWithLoading />
      </LoadingProvider>
    </AuthProvider>
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
