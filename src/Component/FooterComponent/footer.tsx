import React from "react";
import "./footer.css";
import {Link} from "react-router-dom"
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="head">
        <Link to="/" className="link">
      <h4 className="mindconnect-title">MindConnect</h4> 
      </Link>
        <p className="line"></p>
      </div>
        
      <div className="footer">
        <div className="all-rights">
          <p className="text">All rights reserved. &copy 2023 HR MindConnect</p>
        </div>
        <div className="all-rights">
          <p className="text">By creating an account you agree to our <span className="sub">Terms and conditions. Privacy Policies </span> and <span className="sub">Security Settings</span></p>
        </div>
        <div className="icons">
          <div className="icon-real">
            <InstagramIcon className="social-media" />
            <TwitterIcon className="social-media" />
            <YouTubeIcon className="social-media" />
          </div>
        <p className="text">info@mindconnect.com</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

  