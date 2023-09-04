import React, { useState, useEffect } from "react";
import "./hero.css";
import heroImage from "../../assets/heroImage.png";
import frame1 from '../../assets/frame/Property 1=Frame 8410.png';
import frame2 from '../../assets/frame/Property 1=Frame 8411.png';
import frame3 from '../../assets/frame/Property 1=Frame 8412.png';
import frame4 from '../../assets/frame/Property 1=Frame 8413.png';
import frame5 from '../../assets/frame/Property 1=Frame 8414.png';
import frame6 from '../../assets/frame/Property 1=Frame 8415.png';
import frame7 from '../../assets/frame/Property 1=Frame 8416.png';
import frame8 from '../../assets/frame/Property 1=Frame 8417.png';
import frame9 from '../../assets/frame/Property 1=Frame 8418.png';
import frame10 from '../../assets/frame/Property 1=Frame 8419.png';
import frame11 from '../../assets/frame/Property 1=Frame 8421.png';
import { Link } from "react-router-dom";

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(frame1);

  useEffect(() => {
    const imageTimeout = setTimeout(() => {
      const frameImages = [frame1, frame2, frame3, frame4, frame5, frame6, frame7, frame8, frame9, frame10, frame11];

      const currentIndex = frameImages.findIndex(image => image === currentImage);

      const nextIndex = (currentIndex + 1) % frameImages.length;

      setCurrentImage(frameImages[nextIndex]);
    }, 1000); 

    return () => clearTimeout(imageTimeout);
  }, [currentImage]);

  return (
    <div>
      <main className="hero">
      <section id="a">
          <h1>Mental Health Matters</h1>

          <p id="numberOne">
            Share, connect, and provide support in a safe space for mental
            health. A community of empatics where you get to unburden your mind.
          </p>

          <p id="numberTwo">
            Mental health conditions affect millions of people worldwide. Many
            people struggle to find the support they need to cope with their
            conditions, stigma often prevents them from seeking help.
          </p>
         <Link to="/login" >
          <button id="first">Sign In</button>
          </Link>
          <Link to="/register"> 
          <button id="second">Register Here</button>
          </Link>
        </section>
        <section id="b">
          <img src={heroImage} alt="logo" height="640" width="617" />
          <div className="image-container">
            <img src={currentImage} alt="logo" className="imag" />
          </div>
        </section>
      </main>
    </div>
  );
}
