import axios from "axios";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "../../index.css"; // for fade-in/out effect
import { useAuth } from "../../AuthContext";
import userImg from "../../assets/img/user.svg";
import { Link } from "react-router-dom";

export default function TriggerCard({
  cardName,
  cardName2,
  cardLogo,
  logoAlt,
  onClose,
}) {
  const [showModal, setShowModal] = useState(true);

  const handleTriggerAlert = async () => {
    try {
      await axios.post("/api/trigger-alert", {
        alertType: `${cardName} ${cardName2}`,
      });
      alert("Alert triggered successfully");
    } catch (error) {
      console.error("Error triggering alert", error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setTimeout(onClose, 300); // Delay to match animation duration
  };

  const { isAuthenticated } = useAuth();

  return (
    <CSSTransition in={showModal} timeout={300} classNames="fade" unmountOnExit>
      {isAuthenticated ? (
        <>
          <div className=" modal-backdrop fixed inset-0 z-50 flex justify-center items-center">
            <div className="relative bg-white p-4 w-full max-w-sm max-h-full rounded-lg shadow">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400"
                onClick={handleClose}
              >
                <span className="sr-only">Close modal</span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h1 className="text-red-400">Heads Up</h1>
              <div className="p-4 text-center">
                <h3 className="mb-5 text-lg font-normal text-gray-500">
                  You have triggered <span>{cardName}</span>{" "}
                  <span>{cardName2}</span>
                </h3>
                <img
                  src={cardLogo}
                  alt={logoAlt}
                  className="mx-auto mb-4 w-10 h-10"
                />
                <button
                  onClick={handleTriggerAlert}
                  className="text-white bg-red-600 hover:bg-red-800 px-5 py-2 rounded"
                >
                  Trigger Alert
                </button>
                <button
                  onClick={handleClose}
                  className="py-2 px-5 ms-3 text-gray-900 bg-white border border-gray-200 rounded-lg"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="modal-backdrop fixed inset-0 z-50 flex justify-center items-center">
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-end px-4 pt-4">
                <button
                  type="button"
                  className="top-3 right-2.5 text-gray-400"
                  onClick={handleClose}
                >
                  <span className="sr-only">Close modal</span>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col items-center pb-10 mx-5">
                <img
                  className="w-24 h-24 mb-3 rounded-full shadow-lg"
                  src={userImg}
                  alt="Auth"
                />
                <h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white">
                  Authentication
                </h5>
                <span className="text-lg text-gray-500 dark:text-gray-400">
                  This service is for only authenticated user.
                </span>
                <div className="flex mt-4 md:mt-6">
                  <Link to={"register"}>
                    <button className="inline-flex items-center px-4 py-2 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Register
                    </button>
                  </Link>
                  <Link to={"login"}>
                    <button className="py-2 px-4 ms-2 text-lg font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                      Login
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </CSSTransition>
  );
}
