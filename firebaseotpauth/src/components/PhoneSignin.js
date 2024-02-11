// components/PhoneSignin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./Phone.css";
import { auth } from "../firebase.config";
import { Button, TextField, CircularProgress } from "@mui/material";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const PhoneSignin = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");
  const [verificationError, setVerificationError] = useState(null);
  const [loadingSendOtp, setLoadingSendOtp] = useState(false);
  const [loadingVerifyOtp, setLoadingVerifyOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false); // new state to track OTP sent status

  const sendOtp = async () => {
    try {
      setLoadingSendOtp(true);
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
      console.log(confirmation);
      setUser(confirmation);
      setOtpSent(true); // set the OTP sent status to true
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSendOtp(false);
    }
  };

  const VerifyOtp = async () => {
    try {
      setLoadingVerifyOtp(true);
      const data = await user.confirm(otp);
      console.log(data);
      navigate("/home");
    } catch (err) {
      console.error(err);
      setVerificationError("Invalid verification code. Please try again.");
    } finally {
      setLoadingVerifyOtp(false);
    }
  };

  return (
    <div className="phone-signin">
      <div className="phone-content">
        <PhoneInput
          country={"in"}
          value={phone}
          onChange={(phone) => setPhone("+" + phone)}
        />
        <Button
          sx={{ marginTop: "10px" }}
          variant="contained"
          onClick={sendOtp}
          disabled={otpSent} // disable the button if OTP has already been sent
        >
          {
            loadingSendOtp ? (
              <CircularProgress size={24} color="inherit" />
            ) : otpSent ? (
              "OTP Sent"
            ) : (
              "Send OTP"
            ) // change button text based on OTP sent status
          }
        </Button>
        {otpSent ? null : (
          <div style={{ marginTop: "10px" }} id="recaptcha"></div>
        )}

        <br />
        <TextField
          onChange={(e) => setOtp(e.target.value)}
          sx={{ marginTop: "10px", width: "300px" }}
          variant="outlined"
          size="small"
          label="Enter OTP"
        />
        <br />
        <Button
          onClick={VerifyOtp}
          sx={{ marginTop: "10px" }}
          variant="contained"
          color="success"
        >
          {loadingVerifyOtp ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Verify OTP"
          )}
        </Button>

        {verificationError && (
          <div style={{ color: "red", marginTop: "10px" }}>
            {verificationError}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneSignin;
