import axios from "axios";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "../../index.css"; // for fade-in/out effect

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

  return (
    <CSSTransition in={showModal} timeout={300} classNames="fade" unmountOnExit>
      <div className=" modal-backdrop fixed inset-0 z-50 flex justify-center items-center">
        <div className="relative bg-red-300 p-4 w-full max-w-sm max-h-full rounded-lg shadow">
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
    </CSSTransition>
  );
}
