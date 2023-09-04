import React, { useState } from 'react';
import verifyIcon from "./Images/Icon.png"
import "./verify.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AccountVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleChange = (element: EventTarget & HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    setOtp([...otp.map((d, idx) => (idx === index) ? element.value : d)]);

    const nextInput = element.nextSibling as HTMLInputElement | null;
    if (nextInput) {
      nextInput.focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const previousInput = event.currentTarget.previousSibling as HTMLInputElement | null;
    const nextInput = event.currentTarget.nextSibling as HTMLInputElement | null;
    const currentInput = event.currentTarget as HTMLInputElement;

    if (event.key === 'ArrowRight' && nextInput) {
      event.preventDefault();
      nextInput.focus();
    } else if (event.key === 'ArrowLeft' && previousInput) {
      event.preventDefault();
      previousInput.focus();
    } else if (event.key === 'Backspace') {
      event.preventDefault();
      currentInput.value = '';
      if (previousInput) {
        previousInput.focus();
      }
    }
  }

  const verifyOTP = async () => {
    const joinedOTP = otp.join('');
  
    try {
      const response = await fetch('http://localhost:4000/user/verify-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp: joinedOTP }),
      });
  
      if (response.ok) {
        // OTP verification succeeded, redirect the user to the login page
        // You can use React Router or any other method for redirection
        window.location.href = '/login';
      } else {
        const errorMessage = await response.text();
        // Display error message using Toastify
        toast.error(errorMessage);
      }
    } catch (error) {
      // Handle network or other errors
      console.log(error);
    }
  };

  return (
    <div className='verify-container'>
      <img src={verifyIcon} alt="This is a verify Icon " />
      <h1 className='verify-text'>Verify your email</h1>
      <p className='otp-text'>Kindly input the OTP that was sent to your mail in the boxes provided below</p>

      <div className="col verifytext-center">
        {otp.map((data, index) => (
          <input
            className='verifyOtp-field'
            type="text"
            name='otp'
            maxLength={1}
            key={index}
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onFocus={(e) => e.target.select()}
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        ))}
      </div>

      <button
        className='verify-btn'
        onClick={verifyOTP}
      >
        Verify email
      </button>
    </div>
  );
}
