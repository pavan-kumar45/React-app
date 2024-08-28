"use client"

import React from "react";
import Link from "next/link";
import './home.css'

export default function page() {
  return (
    <div className="homepage">
      <div className="assessmentpage">
        <Link href="./assessment/" className="link-assessment">
          Write Exam
        </Link>
      </div>
      <div className="profilepage">
        <Link href="./PersonalProfile/" className="link-profile">
          Personal Profile
        </Link>
      </div>
    </div>
  );
}
