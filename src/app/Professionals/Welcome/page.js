"use client";

import WelcomeDesignContainer from "@/components/welcomeComponents/WelcomeDesignContainer";
import style from "../../../components/welcomeComponents/welcomePage.module.css";
import LoginContainer from "@/components/welcomeComponents/LoginContainer";
import RegisterContainer from "@/components/welcomeComponents/RegisterContainer";
import { useState } from "react";
import { motion } from "framer-motion";

export default function ProfessionalsWelcome() {
  const [showLogin, setShowLogin] = useState(true);
  const handleShowLogin = () => {
    setShowLogin(!showLogin);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 45, transition: { duration: 0 } }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 0.1 },
      }}
    >
      <div className={style['welcome-container']}>
        <div className={style['welcome-left-container']}>
          <WelcomeDesignContainer />
        </div>
        <div className={style['welcome-right-container']}>
          {showLogin ? (
            <LoginContainer handleShowLogin={handleShowLogin} />
          ) : (
            <RegisterContainer handleShowLogin={handleShowLogin} />
          )}
        </div>
      </div>
    </motion.div>
  );
}
