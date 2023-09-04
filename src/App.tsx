import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import ResetPassword from "./page/ResetPassword/Reset";
import { SignupPage } from "./page/UserRegistrationPage/userRegistration";
import Forgot from "./page/ForgotPassword/Forgot";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LandingPage } from "./page/LandingPage/LandingPage";
import { LoginPage } from "./page/LoginPage/LoginPage";
import { AccountVerification } from "./Component/AccountVerificationComponent/AccountVerification";
import Dashboard from "./page/Dashboard/Dashboard";
import PrivateRoute from "./Component/PrivateRoute/PrivateRoute";
import JoinedGroupPage from "./page/JoinedGroupPage/joinedgroup"

const App = () => {
  return (
    <div>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/verify-otp" element={<AccountVerification />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}  />
          <Route path="/joinedgroup" element={<JoinedGroupPage />} />

        </Routes>
      </Router>
    </div>
  );
};

export default App;




// import { ChatPage } from "./page/ChatPage/ChatPage";
// import Navbar from "./Component/NavbarComponent/navbar";
// import HomePage from './page/HomePage/HomePage'
// import NavTabs from "./page/NavTabs/NavTabsMUI";
// import { Post } from "./page/PostPage/Post";
// import HomePage from "./page/HomePage/HomePage";

{/* <Route element={<HomePage />} path="/home" /> */}
          {/* <Route path="/" element={<LandingPage />} /> */}
          {/* <Route path="/dashboard" element={<Navbar />} />
          <Route path="/PostPage" element={<Post />} />
          <Route path="/chatpage" element={<ChatPage />} /> */}
          {/* <Route path="/home/" element={<HomePage />} /> */}
          {/* <Route path="/PostPage" element={<Post />} /> */}
          {/* <Route element={<NavTabs />} path="/navtabs" /> */}