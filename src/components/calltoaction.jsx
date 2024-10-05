import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faContactBook,
  faReceipt,
  faBell,
  faGasPump,
} from "@fortawesome/free-solid-svg-icons";

const ActionButton = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const actionButtonRef = useRef(null);

  // Toggle menu open/close
  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        actionButtonRef.current &&
        !actionButtonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={actionButtonRef}
      className="fixed bottom-0 right-0 p-2 flex items-end justify-end w-20 h-20"
    >
      <div
        onClick={toggleMenu}
        className="text-white shadow-xl flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 z-50 cursor-pointer"
      >
        <FontAwesomeIcon
          className={`w-8 h-8 transition-all duration-[0.6s] ${
            menuOpen ? "rotate-90" : ""
          }`}
          icon={faAdd}
        />
      </div>

      {/* Menu items */}
      <div
        className={`absolute mb-5 transition-all duration-[0.3s] ease-out flex flex-col items-center space-y-4 ${
          menuOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
        style={{ bottom: "4rem" }} // Adjust position slightly above the button
      >
        <div className="rounded-full p-2 bg-green-300 hover:bg-green-400 text-white">
          <FontAwesomeIcon className="w-8 h-8" icon={faContactBook} />
        </div>
        <div className="rounded-full p-2 bg-blue-300 hover:bg-blue-400 text-white">
          <FontAwesomeIcon className="w-8 h-8" icon={faReceipt} />
        </div>
        <div className="rounded-full p-2 bg-yellow-300 hover:bg-yellow-400 text-white">
          <FontAwesomeIcon className="w-8 h-8" icon={faBell} />
        </div>
        <div className="rounded-full p-2 mb-5 p bg-yellow-300 hover:bg-yellow-400 text-white">
          <FontAwesomeIcon className="w-8 h-8" icon={faGasPump} />
        </div>
      </div>
    </div>
  );
};

export default ActionButton;
