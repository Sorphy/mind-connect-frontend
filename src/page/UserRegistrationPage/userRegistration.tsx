import React from "react";
import { Registration } from "../../Component/RegistrationComponent/Registration";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SignupPage = () => {
  return (
    <React.Fragment>
      <Registration />
      <ToastContainer />
    </React.Fragment>
  );
};
