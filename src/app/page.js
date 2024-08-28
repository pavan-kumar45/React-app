"use client";

import NavBar from "@/components/NavBar";
import OnBoardingContent from "@/components/OnBoardingContent";
import AboutUs from "@/components/AboutUs";
import ChooseUs from "@/components/ChooseUs";
import LogoSlider from "@/components/LogoSlider";
import Footer from "@/components/Footer";
import "./page.css";

export default function Home() {
  return (
    <main className="main">
      <div className="navbar-main main-div">
        <NavBar />
      </div>
      <div className="main-div">
        <OnBoardingContent />
      </div>
      <div className="aboutus main-div"> 
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="circle-design-element1 circle-svg"
        >
          <circle cx="17" cy="17" r="17" fill="#1797FF" />
        </svg>
        <svg
          width="96"
          height="88"
          viewBox="0 0 96 88"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="polygon-design-element1 polygon-svg"
        >
          <path
            d="M2.33013 51.5C-0.349363 46.859 -0.349365 41.141 2.33013 36.5L18.6699 8.19873C21.3494 3.55772 26.3013 0.69873 31.6603 0.69873L64.3397 0.69873C69.6987 0.69873 74.6506 3.55771 77.3301 8.19873L93.6699 36.5C96.3494 41.141 96.3494 46.859 93.6699 51.5L77.3301 79.8013C74.6506 84.4423 69.6987 87.3013 64.3397 87.3013L31.6603 87.3013C26.3013 87.3013 21.3494 84.4423 18.6699 79.8013L2.33013 51.5Z"
            fill="#DDEAF7"
          />
        </svg>
        <AboutUs />
      </div>
      <div className="main-div chooseus">
        <div className=".svg-container design-element">
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="circle-design-element2 circle-svg"
          >
            <circle cx="17" cy="17" r="17" fill="#1797FF" />
          </svg>
          <svg
            width="96"
            height="88"
            viewBox="0 0 96 88"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="polygon-design-element2 polygon-svg"
          >
            <path
              d="M2.33013 51.5C-0.349363 46.859 -0.349365 41.141 2.33013 36.5L18.6699 8.19873C21.3494 3.55772 26.3013 0.69873 31.6603 0.69873L64.3397 0.69873C69.6987 0.69873 74.6506 3.55771 77.3301 8.19873L93.6699 36.5C96.3494 41.141 96.3494 46.859 93.6699 51.5L77.3301 79.8013C74.6506 84.4423 69.6987 87.3013 64.3397 87.3013L31.6603 87.3013C26.3013 87.3013 21.3494 84.4423 18.6699 79.8013L2.33013 51.5Z"
              fill="#DDEAF7"
            />
          </svg>
        </div>
        <ChooseUs />
      </div>
      {/* <div className="main-div logoslider">
        <LogoSlider />
      </div> */}
      <div className="main-div footer">
        <Footer />
      </div>
    </main>
  );
}
