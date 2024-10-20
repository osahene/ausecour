import { useMutation, gql } from "@apollo/client";
import { useState, useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";

const VALIDATE_OTP = gql`
  mutation validateOTP($emailOrPhone: String!, $otp: String!) {
    validateOTP(emailOrPhone: $emailOrPhone, otp: $otp) {
      success
      accessToken
      refreshToken
    }
  }
`;

export default function OTPpage() {
  const [validateOTP] = useMutation(VALIDATE_OTP);
  const [otp, setOtp] = useState("");
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const handleResendSuccess = (message) => {
    if (message.includes("Error")) {
      setOtpError(message);
    } else {
      setOtpSuccess(message);
    }
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const phoneNumber = localStorage.getItem("userPhoneNumber");
    try {
      const res = await validateOTP({
        variables: { emailOrPhone: phoneNumber, otp },
      });
      if (res.data.validateOTP.success) {
        setIsOtpValid(true);
        setOtpSuccess("OTP validated successfully!");
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 5000);
      } else {
        setOtpError("Invalid OTP, please try again.");
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 5000);
      }
    } catch (error) {
      setOtpError("OTP validation failed. Please try again.");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    }
  };

  const OtpResend = () => {
    const [countdown, setCountdown] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
      // Start countdown only if timerRef is null
      if (timerRef.current === null) {
        timerRef.current = setInterval(() => {
          setCountdown((prevCountdown) => {
            if (prevCountdown > 1) {
              return prevCountdown - 1;
            } else {
              clearInterval(timerRef.current); // Stop the timer
              setCanResend(true); // Allow OTP to be resent
              return 0;
            }
          });
        }, 1000);
      }

      // Cleanup the timer on component unmount or when countdown ends
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }, []);

    const handleResendOtp = async ({ onResendSuccess }) => {
      if (canResend) {
        setCountdown(60); // Reset the countdown
        setCanResend(false);
        timerRef.current = null; // Reset the timer reference

        console.log("Resending OTP...");

        try {
          const phoneNumber = localStorage.getItem("userPhoneNumber");
          // Simulating a request to resend OTP
          const res = await validateOTP({
            variables: { emailOrPhone: phoneNumber, otp: "" }, // Adjust as needed
          });

          if (res.data.validateOTP.success) {
            onResendSuccess("OTP resent successfully!"); // Pass success message to parent
          } else {
            onResendSuccess("Error resending OTP"); // Pass error message to parent
          }
        } catch (error) {
          console.error("Error resending OTP", error);
          onResendSuccess("Error resending OTP");
        }
      }
    };

    return (
      <p className="text-lg font-light text-gray-500 dark:text-gray-400">
        {showNotification && (
          <div
            className={`alert ${otpError ? "alert-danger" : "alert-success"}`}
          >
            {otpError ? otpError : otpSuccess}
          </div>
        )}

        {canResend ? (
          <a
            href="#resend"
            onClick={handleResendOtp}
            className="font-medium p-2 text-blue-600 hover:underline dark:text-blue-500"
          >
            Resend code
          </a>
        ) : (
          <>
            Resend code in{" "}
            <span className="font-medium p-2 text-blue-600 dark:text-blue-500">
              {countdown}
            </span>
            <span> second(s)</span>
          </>
        )}
      </p>
    );
  };

  return (
    <>
      {/* Redirect if OTP is valid */}
      {isOtpValid && <Navigate to="/" />}

      <div className="App-header">
        <div className="">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a
              href="#as"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <img
                className="w-8 h-8 mr-2"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                alt="logo"
              />
              Help OO Help
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Enter your One Time Password
                </h1>

                {showNotification && (
                  <div
                    className={`alert ${
                      otpError ? "alert-danger" : "alert-success"
                    }`}
                  >
                    {otpError ? otpError : otpSuccess}
                  </div>
                )}
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="otp"
                      className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                    >
                      OTP
                    </label>
                    <input
                      type="text"
                      name="otp"
                      id="otp"
                      placeholder="_ _ _ _ _ _"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-8 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Submit
                  </button>

                  {/* OTP Resend Section */}
                  <OtpResend onResendSuccess={handleResendSuccess} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
