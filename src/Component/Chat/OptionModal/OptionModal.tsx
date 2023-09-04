import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs'
import './optionmodal.css'
import blockuserIcon from '../../../assets/chatpageImage/blockuserIcon.png'
import reportIcon from '../../../assets/chatpageImage/reportIcon.png'

export const OptionModal = () => {
    const [isOpen, setIsOpen] = useState(false);
  
  
    const toggleModal = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div>
        <BsThreeDotsVertical className="threedots" onClick={toggleModal}  />
  
        {isOpen && (
          <div className="modal">
            <div className='blockuser'>
            <img className="blockaccimg" src={blockuserIcon}  /><span>Block Account</span>
            </div>
  
            <div className='reportIcon'>
            <img className="reportaccimg" src={reportIcon}  /><span>Report account</span>
            </div>
         
              <span className="close-button" onClick={toggleModal}>
            
              </span>
         
          </div>
        )}
      </div>
    );
  };