import { useMutation, gql } from "@apollo/client";
import React, { useState, useEffect } from "react";
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

const GENERATE_OTP = gql`
  mutation generateOTP($emailOrPhone: String!) {
    generateOTP(emailOrPhone: $emailOrPhone) {
      otpCode
    }
  }
`;

export default function OTPPage() {
  const [validateOTP] = useMutation(VALIDATE_OTP);
  const [generateOTP] = useMutation(GENERATE_OTP);
  const [otp, setOtp] = useState("");
  const [isOtpValid, setIsOtpValid] = useState(false);
  const [otpMessage, setOtpMessage] = useState({ type: "", message: "" });
  const [showNotification, setShowNotification] = useState(false);
  const [timer, setTimer] = useState({ minutes: 0, seconds: 5 });

  useEffect(() => {
    let interval;
    if (timer.seconds > 0 || timer.minutes > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev.seconds > 0) {
            return { ...prev, seconds: prev.seconds - 1 };
          } else if (prev.minutes > 0) {
            return { minutes: prev.minutes - 1, seconds: 59 };
          } else {
            clearInterval(interval);
            return prev;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const resendOTP = async () => {
    const phoneNumber = localStorage.getItem("userPhoneNumber");

    setTimer({ minutes: 0, seconds: 10 }); // Reset timer
    try {
      await generateOTP({ variables: { emailOrPhone: phoneNumber } });
      setOtpMessage({ type: "success", message: "OTP resent successfully." });
    } catch (error) {
      setOtpMessage({ type: "error", message: "Failed to resend OTP." });
    }
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const phoneNumber = localStorage.getItem("userPhoneNumber");

    try {
      const { data } = await validateOTP({
        variables: { emailOrPhone: phoneNumber, otp },
      });

      if (data.validateOTP.success) {
        setIsOtpValid(true);
        setOtpMessage({
          type: "success",
          message: "OTP validated successfully!",
        });
      } else {
        setOtpMessage({
          type: "error",
          message: "Invalid OTP. Please try again.",
        });
      }
    } catch (error) {
      setOtpMessage({
        type: "error",
        message: "OTP validation failed. Please try again.",
      });
    }

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 5000);
  };

  return (
    <>
      {isOtpValid && <Navigate to="/" />}

      <div className="App-header">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Enter your One-Time Password
              </h1>

              {showNotification && (
                <div
                  className={`alert ${
                    otpMessage.type === "error"
                      ? "alert-danger"
                      : "alert-success"
                  }`}
                >
                  {otpMessage.message}
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
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
                    placeholder="Enter OTP"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>

                {/* Resend OTP logic */}
                <div className="countdown-text">
                  {timer.minutes > 0 || timer.seconds > 0 ? (
                    <p>
                      Time Remaining:{" "}
                      <span style={{ fontWeight: 600 }}>
                        {timer.minutes < 10
                          ? `0${timer.minutes}`
                          : timer.minutes}
                        :
                        {timer.seconds < 10
                          ? `0${timer.seconds}`
                          : timer.seconds}
                      </span>
                    </p>
                  ) : (
                    <p>Didn't receive code?</p>
                  )}
                  <button
                    type="button"
                    disabled={timer.minutes > 0 || timer.seconds > 0}
                    onClick={resendOTP}
                    className={`${
                      timer.minutes > 0 || timer.seconds > 0
                        ? "text-gray-400"
                        : "text-red-500"
                    }`}
                  >
                    Resend OTP
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full mt-8 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 font-medium rounded-lg text-lg px-5 py-2.5"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
