import React from 'react';
import {useNavigate} from 'react-router-dom';
import "./resetpassword.css"
import {BsFillCheckCircleFill} from 'react-icons/bs'

interface SuccessModalProps {
    onClose?: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({onClose}) => {
    const navigate = useNavigate();

    const handleContinueToLogin = () => {
        if (onClose) onClose();
        navigate('/login');
    };
  return (
    <div className='success-main'>
        <div className='success-content'>
            <div className='success-icon'>
                <BsFillCheckCircleFill />
            </div>
            <h2 className='reset-heading'>Successful</h2>
            <p className='forgot-content'>Your password has been changed successfully. Login to access your account</p>
            <button className= "success-btn" onClick={handleContinueToLogin}>Continue to Login</button>
        </div>
    </div>
  );
};



export default SuccessModal;
