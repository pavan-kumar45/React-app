"use client";

import PPNavBar from "@/components/authComponents/PersonalProfileComponents/PPNavBar";
import PPBasicDetails from "@/components/authComponents/PersonalProfileComponents/PPBasicDetails";
import PPQuickLinks from "@/components/authComponents/PersonalProfileComponents/PPQuickLinks";
import PPSummary from "@/components/authComponents/PersonalProfileComponents/PPSummary";
import PPSkills from "@/components/authComponents/PersonalProfileComponents/PPSkills";
import PPExperience from "@/components/authComponents/PersonalProfileComponents/PPExperience";
import PPEducation from "@/components/authComponents/PersonalProfileComponents/PPEducation";
import PPCertifications from "@/components/authComponents/PersonalProfileComponents/PPCertifications";
import PPDetails from "@/components/authComponents/PersonalProfileComponents/PPDetails";
import CommonFooter from "@/components/authComponents/CommonComponents/CommonFooter";
import { useEffect, useRef, useState } from "react";
import styles from './style.module.css'
import style from '../../../Components/authComponents/PersonalProfileComponents/PPStyle.module.css';


import { useRecoilState } from "recoil";
import {
  userBasicDetailsStore,
  userCertificationStore,
  userDataStore,
  userEducationStore,
  userExperienceStore,
  userPersonalDetailsStore,
  userSkillsStore,
  userSummaryStore,
  userProfileStore,
  userResumeDetailsStore
} from "@/store/atoms/ProfileEntities/UserPersonalProfileDetailsStore";
import Loading from "@/app/loading";

export default function PersonalProfile() {
  // Logic for sticky quick links section-------------------------------------------------
  
const [isSticky, setIsSticky] = useState(`${style["non-sticky-content"]} ${style["quick-links-content"]}`);

  const [extraContentClassName, setExtraContentClassName] = useState(
    style["dont-use-extra-content"]
  );
  const footerRef = useRef(null);

  useEffect(() => {
    const handleVerticalScrollForQuickLinks = () => {
      const scrollPosition = window.scrollY;
      const footerPosition = footerRef.current.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      if (
        scrollPosition > 400 &&
        parseInt(footerPosition) > viewportHeight
      ) {
        setIsSticky(`${style["sticky-content"]} ${style["quick-links-content"]}`);
        setExtraContentClassName(style["use-extra-content"]);
      } else {
        setIsSticky(`${style["non-sticky-content"]} ${style["quick-links-content"]}`);
        setExtraContentClassName(style["dont-use-extra-content"]);
      }
    };
    window.addEventListener("scroll", handleVerticalScrollForQuickLinks);
    return () => {
      window.removeEventListener("scroll", handleVerticalScrollForQuickLinks);
    };
  }, []);
  // -----------------------------------------------------------------------------------

  // Logic for destructuring userPersonalData

  const [userData, setUserData] = useRecoilState(userDataStore);
  const [userBasicDetails, setUserBasicDetails] = useRecoilState(
    userBasicDetailsStore
  );
  const [userProfileDetails, setUserProfileDetails] = useRecoilState(userProfileStore);
  const [userSummary, setUserSummary] = useRecoilState(userSummaryStore);
  const [userSkills, setUserSkills] = useRecoilState(userSkillsStore);
  const [userExperience, setUserExperience] =
    useRecoilState(userExperienceStore);
  const [userEducation, setUserEducation] = useRecoilState(userEducationStore);
  const [userCertifications, setUserCertifications] = useRecoilState(
    userCertificationStore
  );
  const [userPersonalDetails, setUserPersonalDetails] = useRecoilState(
    userPersonalDetailsStore
  );
  const [userResumeDetails, setUserResumeDetails] = useRecoilState(
    userResumeDetailsStore
  );

  useEffect(() => {
    function fetchUserPersonalData() {
      fetch("/data/UserData.json", { cache: "no-store" })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("--------------------------------------------");
          console.log("This is user personal data", data);
          console.log("--------------------------------------------");
          destructureUserDataIntoEntities(data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
    fetchUserPersonalData();
  }, []);

  function destructureUserDataIntoEntities(data) {
    setUserData(data);
    setUserBasicDetails(data.basicDetails);
    setUserSummary(data.summary);
    setUserSkills(data.skills);
    setUserExperience(data.experience);
    setUserEducation(data.education);
    setUserCertifications(data.certifications);
    setUserPersonalDetails(data.personaldetails);
    setUserProfileDetails({ userProfilePicLink: data.userProfilePicLink, userProfileCompletion: data.userProfileCompletion });
    setUserResumeDetails(data.resume);
  }

  return (userData &&
    userBasicDetails &&
    userSummary &&
    userSkills &&
    userExperience &&
    userEducation &&
    userCertifications &&
    userPersonalDetails && userProfileDetails && userResumeDetails) ? (
    <>
      <div className={styles["personal-profile-main-container"]}>
        <div className={styles["pp-nav-div"]}>
          <PPNavBar />
        </div>
        <div className={styles["pp-summary-div"]}>
          <PPBasicDetails />
        </div>
        <div className={styles["user-profile-content"]}>
          <div className={isSticky}>
            <PPQuickLinks />
          </div>

          <div className={extraContentClassName}></div>
          <div className={style["user-info-content"]}>
            <div className={styles["pp-overview-div"]}>
              <PPSummary />
            </div>
            <div className={styles["pp-skills-div"]}>
              <PPSkills />
            </div>
            <div className={styles["pp-experience-div"]}>
              <PPExperience />
            </div>
            <div className={styles["pp-education-div"]}>
              <PPEducation />
            </div>
            <div className={styles["pp-certifications-div"]}>
              <PPCertifications />
            </div>
            <div className={styles["pp-details-div"]}>
              <PPDetails />
            </div>
          </div>
        </div>
        <div className={styles["common-footer"]} ref={footerRef}>
          <CommonFooter />
        </div>
      </div>

    </>
  ) : (
    <Loading />
  );
}
