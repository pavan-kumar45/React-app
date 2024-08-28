import { useState } from "react";
import "./authComponentStyle.css";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";

export default function AssessmentHeader() {
  const [responsiveAssessmentMenu, setResponsiveAssessmentMenu] = useState(
    "responsive-assessment-menu-hidden ahm"
  );

  const handleAssessmentMenuVisibility = () => {
    setResponsiveAssessmentMenu("responsive-assessment-menu-visible ahm");
  };

  const closeAssessmentModal = () => {
    setResponsiveAssessmentMenu("responsive-assessment-menu-hidden ahm")
  }
  return (
    <div className="assessmentheader-maincontent assessment-content">
      <div className="assessmentheader-leftcontent">
        <Link href="./Home/">Hiregloo</Link>
      </div>
      <div className="assessmentheader-rightcontent">
        <div className="countdowntime">
          <p>01:25:15</p>
        </div>
        <button className="assessment-submit">
          <p>Submit Exam</p>
        </button>
        <button
          type="button"
          className="navbar-hamburger assessment-hamburger"
          onClick={handleAssessmentMenuVisibility}
          aria-label="Menu"
          title="Menu"
        >
          <GiHamburgerMenu className="hamburger-icon" aria-hidden="true" />
        </button>
      </div>
      <div className={responsiveAssessmentMenu}>
        <div className="countdowntime responsive-countdowntime">
          <p>01:25:15</p>
        </div>
        <button className="assessment-submit responsive-assessment-submit">
          <p>Submit Exam</p>
        </button>

        <button className="close-assessment-modal" onClick={closeAssessmentModal}>
          close
        </button>
      </div>
    </div>
  );
}
