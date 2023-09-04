import React, { useState } from "react";
import "./resetpassword.css";
import { HiOutlineMail } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../constants";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  // const handleEmailChange =(event: React.ChangeEvent<HTMLFormElement>)=> {
  //     setEmail(event.target.value);
  // }
  const handleResetPassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      
      event.preventDefault();
      const response = await axios.post(`${API_URL}/user/forgot-password`, {
        email,
      });
      if (response.status === 200) {
        document.cookie = `token=${response.data.token}`;
        navigate(`/reset-password?email=${email}`);
      }
    } catch (err: any) {
      console.log(err);
      const message = "An error occurred";
      if (err.code === "ERR_NETWORK") {
        toast.error(message, { toastId: "errorResetingPassword" });
        return;
      }
      toast(err.response.data?.message || message, {
        toastId: "errorResetingPassword",
      });
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="reset-password-main">
      <div className="reset-container">
        <form onSubmit={handleResetPassword} className="reset-form">
          <div className="reset-main-form">
            <h2 className="reset-heading">Forgot Password</h2>
            <p className="forgot-content">
              Enter the email associated with your account and we’ll send an
              email with instructions to reset your password
            </p>
            <label htmlFor="email">Email</label>
            <div className="input-container">
              <HiOutlineMail className="icon" />
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                id="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>
          <button type="submit">Reset Password</button>
          <p className="backtologin" onClick={handleBackToLogin}>
            Back to Login
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
