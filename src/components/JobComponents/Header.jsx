import React from 'react';
import Link from "next/link";
import './Header.css'; // Make sure this path is correct

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <span>Hiregloo</span>
      </div>
      <nav className="nav">
        <Link href="#job-search" className="nav-link active">Job Search</Link>
        <Link href="#your-activity" className="nav-link">Your Activity</Link>
        <Link href="#events" className="nav-link">Events</Link>
      </nav>
      <Link href="./PersonalProfile" className="profile-link">
        <div className="profile">
          <img src="path_to_profile_image" alt="Profile" className="profile-img" />
          <div className="profile-info">
            <span className="profile-1">John Doe</span>
            <span className="profile-title">Web Designer</span>
          </div>
        </div>
      </Link>
    </header>
  );
};

export default Header;
