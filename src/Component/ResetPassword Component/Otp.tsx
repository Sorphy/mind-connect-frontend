import axios from "axios";
import React, { useRef, useState } from "react";
import { HiOutlineMailOpen } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL } from "../../constants";

const Otp = ({ email, setScreen }: { email: string; setScreen:Function }) => {
  const firstRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);
  const thirdRef = useRef<HTMLInputElement>(null);
  const fourthRef = useRef<HTMLInputElement>(null);
  const [otp, setOtp] = useState<string[]>([]);
  const navigate = useNavigate()
  const Input = ({
    innerRef,
    name,
  }: {
    innerRef: React.LegacyRef<HTMLInputElement>;
    name: string;
  }) => {
    const handleFocus = (event: React.KeyboardEvent<HTMLInputElement>) => {
      switch (name) {
        case "first":
          if (event.key == "Backspace") {
            return;
          }
          secondRef.current!.focus();
          break;
        case "second":
          if (event.key == "Backspace") {
            firstRef.current!.focus();
            return;
          }
          thirdRef.current!.focus();
          break;
        case "third":
          if (event.key == "Backspace") {
            secondRef.current!.focus();
            return;
          }
          fourthRef.current!.focus();
          break;
        case "fourth":
          if (event.key == "Backspace") {
            thirdRef.current!.focus();
            return;
          }
          break;
        default:
          break;
      }
    };
    const handleChange = (event: any) => {
      // console.log(event.target.value);
      const inputValue = event.target.value;
      if (inputValue !== ""){
        let index = 0;
        switch (name) {
          case "first":
            index = 0;
            break;
          case "second":
            index = 1;
            break;
          case "third":
            index = 2;
            break;
          case "fourth":
            index = 3;
            break;
          default:
            break;
        }
        setOtp((prev) => {
          console.log(prev);
          prev[index] = event.target.value;
          return prev;
        });
      }
    };

    return (
      <input
        ref={innerRef}
        onKeyUp={(e) => handleFocus(e)}
        onChange={handleChange}
        className="single-number"
        type="text"
        maxLength={1}
      />
    );
  };

  const handleVerifyOtp = async(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try{
        e.preventDefault();
        const nums ="0123456789";
        const otpStr = otp.filter(item=>nums.includes(item)).join("");
        if(otpStr.length<4){
            toast.warning("invalid otp ", {toastId: "invalid otp length"})
            return;
        }
        const response = await axios.post(`${API_URL}/user/verify-otp`, {otp: otpStr})
        if(response.status === 200){
            toast.success(response.data.message, {toastId:"verify otp success"})
            setScreen("reset")
        }
    }
    catch(err:any){
        console.log(err);
        const message = "An error occurred";
        if (err.code === "ERR_NETWORK") {
          toast.error(message, { toastId: "errorResendingPassword" });
          return;
        }
        if(err.response && err.response.status === 404){
            navigate("/register");
        }
        toast(err.response.data?.message || message, {
          toastId: "errorResending",
        });
    }
  };

  const handleResendEmail = async () => {
    try{
        const response = await axios.post(`${API_URL}/user/forgot-password`, {email})
        toast.success(response.data.message, {toastId:"verify otp success"})
    }
    catch(err:any){
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

  return (
    <div className="otp">
      <HiOutlineMailOpen className="success-icon" />
      <h2 className="reset-heading">Check your mail</h2>
      <p className="forgot-content">
        We sent an otp to {email}. Kindly input the otp to reset your password.
      </p>
      <div className="number-div">
        <Input innerRef={firstRef} name="first" />
        <Input innerRef={secondRef} name="second" />
        <Input innerRef={thirdRef} name="third" />
        <Input innerRef={fourthRef} name="fourth" />
      </div>
      <button onClick={handleVerifyOtp}>OK</button>
      <p className="forgot-content">
        Didn’t receive an email?{" "}
        <span className="resend" onClick={() => handleResendEmail()}>
          Click to Resend
        </span>
      </p>
    </div>
  );
};

export default Otp;
