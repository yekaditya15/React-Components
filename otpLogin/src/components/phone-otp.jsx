import React from "react";
import { useState } from "react";
import OtpInput from "./otp-input";

const PhoneOtpForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isError, setIsError] = useState(false);
  const regex = new RegExp(/^\d{10}$/);
  const [showOtpInput, setshowOtpInput] = useState(false);

  const handlePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
    if (!regex.test(event.target.value)) setIsError(true);
    else setIsError(false);
  };

  const handlePhoneSubmit = (event) => {
    event.preventDefault();
    // Phone Validations
    if (phoneNumber.length !== 10 || !regex.test(phoneNumber)) {
      alert("Invalid Phone Number");
      return;
    }
    //Implement the Backend API
    setshowOtpInput(true);
  };
  const onOtpSubmit = (otp) => {
    console.log("Login Sucesssfull", otp);
  };

  return (
    <div>
      {!showOtpInput ? (
        <form onSubmit={handlePhoneSubmit}>
          <input
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumber}
            placeholder="Enter Your Number"
          />
          <button type="submit">Submit</button>
          <h3>
            Your Mobile Number is:
            {isError ? "Invalid" : "+91" + phoneNumber}
          </h3>
        </form>
      ) : (
        <div>
          <p>Enter OTP Sent to {phoneNumber}</p>
          <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
        </div>
      )}
    </div>
  );
};

export default PhoneOtpForm;
