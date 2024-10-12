import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/contact",
    element: <ContactBook />,
  },
  {
    path: "/settings",
    element: <Usersettings />,
  },
  {
    path: "/accept",
    element: <Accept />,
  },
  {
    path: "/accept/invite",
    element: <Invitation />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/otp",
    element: <OTPpage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
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
