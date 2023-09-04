import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import GoogleLogo from "../../assets/images/google.svg.png";
import "./login.css";

const api = axios.create({
  baseURL: "http://localhost:4000",
});

// const CLIENT_ID =
//   "1032466284052-30k4m8r06b1jbikvjl78ogje7amg74mm.apps.googleusercontent.com";

export const Login = (): JSX.Element => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [googleButtonDisabled, setGoogleButtonDisabled] = useState(true);
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/dashboard" } };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await api.post("/user/login", {
        email,
        password,
      });
  
      // Handle the response from the backend
      // You can redirect the user or perform any necessary actions
      console.log(response.data);
  
      // Store the token in localStorage
      const token = response.data.token;
      localStorage.setItem("token", token);
  
      //  localStorage.setItem("token", response.data.token)
      // Display toast notification for successful login
      toast.success("Logged in successfully");
  
      // Clear input fields
      setEmail("");
      setPassword("");
  
      // Redirect to home page
      navigate("/dashboard");
    } catch (error: any) {
      // Handle error
      console.error(error);
  
      // Inside the catch block of handleLogin
      if (error.response && error.response.status === 400) {
        if (error.response.data && error.response.data.Error) {
          toast.error(error.response.data.Error);
        } else {
          toast.error("User does not exist");
        }
      } else {
        toast.error("An error occurred during login.");
      }
    }
  };
  

  const responseGoogle = () => {
    window.location.href = "http://localhost:4000/auth/google/url";
  };

  return (
    <div className="wrapper">
      {location.state && location.state.error && (
        <div className="error-message">{location.state.error}</div>
      )}
      <div className="body-div">
        <div className="image">{/* <img src={Image1} alt="bg" /> */}</div>
        <div className="input">
          <div className="row-two">
            <h1 className="head1">Hi, Welcome Back</h1>
            <span className="span"></span>
            <div className="inputDiv">
              <form onSubmit={handleLogin}>
                <div className="input-control">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input-control">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <a className="forgotPassword" href="/forgot-password">
                    Forgot password?
                  </a>
                  <div>
                    <button className="loginButton" type="submit">
                      Login
                    </button>
                  </div>
                </div>
                <div className="rowUp2">
                  <div className="hr"></div>Or<div className="hr"></div>
                </div>
                <span
                  className="google"
                  onClick={responseGoogle}
                >
                  <img src={GoogleLogo} alt="" className="google-icon" />
                  Sign in with Google
                </span>

                <p className="accountStyle">
                  Don’t have an account? <a href="/register">Create account</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
