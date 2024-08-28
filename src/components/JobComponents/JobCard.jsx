import React, { useState } from 'react';
import './JobCard.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const JobCard = ({ job }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="job-card" onClick={toggleExpand}>
      <div className="job-header">
        <img src={job.logo} alt={`${job.company} logo`} className="company-logo" />
        <div>
          <h3>{job.title}</h3>
          <div className='jjj'><p>{job.company}</p></div>
        </div>
      </div>
      <p className="job-description">{job.description}</p>
      <div className="job-details">
        <p><i className="fa-solid fa-briefcase" style={{ color: '#a1a1a1' }}></i> {job.experience}</p>
        <p><i className="fa-solid fa-indian-rupee-sign" style={{ color: '#a1a1a1' }}></i> {job.salary}</p>
        <p><i className="fa-solid fa-location-dot" style={{ color: '#a1a1a1' }}></i> {job.location}</p>
      </div>
      <div className='yyy'>
        <p><i className="fa-solid fa-clock" style={{ color: '#a1a1a1' }}></i> {job.datePosted}</p>
        <button className="save-button" onClick={(e) => { e.stopPropagation(); /* Add save logic here */ }}><i className="fa-regular fa-bookmark" style={{ color: '#a1a1a1' }}></i></button>
      </div>

      {isExpanded && (
        <div className="expanded-section">
          <div className='apply-button'>
            <button><i className="fa-solid fa-bolt"></i><h2>Apply Now</h2></button>
          </div>
          
          <div className="bs-container">
            <div className="base-pay">
              <h4>Base Pay: 24 Lakhs Per Annum{job.basePay}</h4>
              <p>This is an estimation by employer</p>
            </div>
            <div className="skill-match">
              <h4>Skill Match: 90%{job.skillMatch}</h4>
              <p>Your skills match 85% of this job profile</p>
            </div>
          </div>

  
          <div className="job-responsibilities">
            <h3>Job Responsibilities</h3>
            <ul>
              {job.responsibilities.map((responsibility, index) => (
                <li key={index}><p>{responsibility}</p></li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCard;
