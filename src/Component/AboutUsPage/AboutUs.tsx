import React from "react";
import "./AboutUs.css";
import AboutUsImage from "../../assets/images/image_about.png"

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="left-subsection">
        <img
          src={AboutUsImage}
          alt="About Us Image"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
      <div className="right-subsection">
        <h1>About Us</h1>
        <p>
          MindConnect is a social network for mental health. It is a digital
          platform designed to provide a safe and supportive community for
          people to share their mental health and experiences and connect with
          others going through similar challenges. The platform will allow users
          to learn more about their symptoms, share their stories and exchange
          tips to stay healthy.
        </p><br />
        <p>
          Mental health conditions affect millions of people worldwide. Many
          people striggle to find the support they need to cope with their
          conditions, and stigma often prevents them from seeking help. There is
          a need for a safe and confidential platform where people can express
          their thoughts and feelings without fear of judgement or stigma.
        </p><br />
        <p>
          The app has strong privacy and security measures in place to protect
          user's personal information and prevent unauthorized access.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
