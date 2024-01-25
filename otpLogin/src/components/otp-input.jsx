import React, { useEffect, useRef, useState } from "react";

const OtpInput = ({ length = 4, onOtpSubmit = () => {} }) => {
  const [otp, setOtp] = useState(Array.from({ length }, () => ""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value.trim(); // Trim leading and trailing spaces
    if (isNaN(value)) return;
    const newotp = [...otp];
    newotp[index] = value.substring(value.length - 1);
    setOtp(newotp);
    const combineOtp = newotp.join("");

    // submit trigger
    if (combineOtp.length === length) onOtpSubmit(combineOtp);

    // Move to the next input if the current input is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    // Your logic for handling input click goes here
    inputRefs.current[index].setSelectionRange(1, 1);

    //if previous index it empty it will move focus to Emptyt index
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Backspace for previous indices
    if (e.key === "Backspace" && index > 0) {
      if (!otp[index] && inputRefs.current[index - 1]) {
        // Move focus to the previous input if the current input is empty
        inputRefs.current[index - 1].focus();
      } else if (inputRefs.current[index]) {
        // Clear the current input if not empty
        const newotp = [...otp];
        newotp[index] = "";
        setOtp(newotp);
        inputRefs.current[index].focus();
      }
    }
  };

  return (
    <div>
      {otp.map((value, index) => {
        return (
          <input
            key={index}
            type="text"
            value={value}
            ref={(input) => (inputRefs.current[index] = input)}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="otpInput"
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
