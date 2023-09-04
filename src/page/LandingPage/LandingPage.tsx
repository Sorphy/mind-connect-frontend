import React from "react";
import Hero from "../../Component/Hero/Hero";
import About from "../../Component/AboutUs/About";
import Navbar from "../../Component/Navbar/Navbar";
import AboutUs from "../../Component/AboutUsPage/AboutUs";
import LandingPageFour from "../../Component/EnjoyPrivacyAndInclusivity/LandingPageFour";
import Footer from "../../Component/FooterComponent/footer";

export const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <AboutUs />
      <LandingPageFour />
      <Footer />
    </div>
  );
};
