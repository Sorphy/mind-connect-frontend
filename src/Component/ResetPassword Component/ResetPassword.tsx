import React, { useState } from "react";
import "./resetpassword.css";
import { IoKeyOutline } from "react-icons/io5";
import axios from "axios";
import SuccessModal from "./SuccessModal";
import { useSearchParams } from "react-router-dom";
import Otp from "./Otp";
import { toast } from "react-toastify";
import { API_URL } from "../../constants";

const ResetPassword = () => {
  const [searchParams, ] = useSearchParams();
  const email = searchParams.get("email")!;
  const [screen, setScreen] = useState<"success" | "otp" | "reset">("otp");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      if (newPassword.length < 0) {
        toast.warning("Please enter a password", { toastId: "nopassword" });
        return;
      }
      if (newPassword != confirmPassword) {
        toast.warning("Passwords do not match", {
          toastId: "passwordnotmatch",
        });
        return;
      }
      const response = await axios.post(`${API_URL}/user/reset-password`, {
        newPassword,
        confirmPassword,
      }, {withCredentials: true});
      if (response.status === 200) {
        toast.success(response.data.message, { toastId: "reset-password" });
        setScreen("success");
      }
    } catch (err: any) {
      console.log(err);
      const message = "An error occurred";
      if (err.code === "ERR_NETWORK") {
        toast.error(message, { toastId: "errorResendingPassword" });
        return;
      }
      toast(err.response.data?.message || message, {
        toastId: "errorResending",
      });
    }
  };

  const renderError = () => {
    setTimeout(() => {
      setError("");
    }, 5000);
    return <p style={{ color: "red" }}>{error}</p>;
  };

  return (
    <div className="reset-password-main">
      {screen === "success" ? (
        // <p>Password has been reset successfully!</p>
        <SuccessModal />
      ) : screen === "reset" ? (
        <div className="reset-container">
          <form onSubmit={handleSubmit} className="reset-form">
            <div className="reset-main-form">
              <h2 className="reset-heading">Reset Password</h2>

              <label htmlFor="newpass">New Password</label>
              <div className="input-container">
                <IoKeyOutline className="icon" />
                <input
                  type="password"
                  placeholder="Enter your new password"
                  id="newpass"
                  name="newpass"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                />
              </div>
              <label htmlFor="confirmpass">Confirm Password</label>
              <div className="input-container">
                <IoKeyOutline className="icon" />
                <input
                  type="password"
                  placeholder="Confirm password"
                  id="confirmpass"
                  name="confirmpass"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>
            </div>

            <button type="submit">Reset Password</button>
          </form>
        </div>
      ) : (
        <div className="reset-container">
          <Otp email={email} setScreen={setScreen} />
        </div>
      )}
      <div>{error && renderError()}</div>
    </div>
  );
};

export default ResetPassword;
