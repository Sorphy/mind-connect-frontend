import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import './LandingPageFour.css';
 import React from 'react'

const LandingPageFour = () => {
  return (
    <div className='lpfourcontainer'>
      <h1 className='landingpagefourtitle'>Enjoy Privacy and Inclusivity</h1>
      <div className='landingpagefourparagraph'>
        <p className='p-landingpage4'>
        MindConnect is a social network for mental health. It is a digital platform designed to provide a safe and supportive community for people to share their mental health and experiences and connect with others going through similar challenges. The platform will allow users to learn more about their symptoms, share their stories and exchange tips to stay healthy.
        </p>
      </div>
      <div className="landingpagefourbutton">
        <Link to="/register">
        <Button width="185px" height="46px" backgroundColor="#175cd3" color="#fff">Click here to join us</Button>
        </Link>
      </div>
</div>
  )
}
export default LandingPageFour