import React, { useState } from "react";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { BsCheckCircleFill } from 'react-icons/bs';
import "./JoinedModal.css";

interface JoinedModalProps {
  group: any;
  onClose: () => void;
}

const JoinedModal: React.FC<JoinedModalProps> = ({ group, onClose }) => {
  const [join, setJoin] = useState(true);

  const handleDoneClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setJoin(false);
    onClose();
  };

  if (!join) {
    return null;
  }

  return (
    <div className="joinedModal">
      <div className="">
        <span><BsCheckCircleFill className="icon" /></span>
      </div>
      <div className="joinedBody">
        <h4 className="joinedhead">Joined group</h4>
      </div>
      <div className="joinedBody">
        <p className="joinedP">
          You can now view, interact, and make posts in the {group.groupName} group.
        </p>
      </div>
      <div className="button">
        <div>
          <Button
            height="44px"
            width="67px"
            backgroundColor="#F2F4F7"
            color="#101828"
            onClick={handleDoneClick}
          >
            Done
          </Button>
        </div>
        <div>
          <Link to="/joinedgroup">
            <Button
              height="44px"
              width="119px"
              backgroundColor="#175CD3"
              color="#fff"
            >
              Visit group
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinedModal;
