import React from "react";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";
import "./JoinedModal.css";

const JoinedModal = () => {
  return (
    <div className="joinedModal">
      <div className="">
        <span>
          <BsCheckCircleFill className="icon" />
        </span>
      </div>
      <div className="joinedBody">
        <h4 className="joinedhead">Joined group</h4>
      </div>
      <div className="joinedBody">
        <p className="joinedP">
          You can now view, interact, and make posts in the meditation group.
        </p>
      </div>
      <div className="button">
        <div>
          <Link to="#">
            <Button
              height="44px"
              width="67px"
              backgroundColor="#F2F4F7"
              color="#101828"
            >
              Done
            </Button>
          </Link>
        </div>
        <div>
          <Link to="/joinedgroup">
            <Button
              height="44px"
              width="119px"
              backgroundColor="#175CD3"
              color="#fff"
            >
              {" "}
              Visit group
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinedModal;
