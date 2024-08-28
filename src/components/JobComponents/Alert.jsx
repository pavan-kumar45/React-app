import React from 'react';
import './Alert.css';

const alerts = [
  {
    id: 1,
    type: 'Today',
    items: [
      {
        imgSrc: '../AlertProfiles/profile1.png',
        text: '<strong>Andrew Philips</strong> have scheduled an interview on behalf of Google Developer community on 19 June 2024',
        time: '19h ago'
      },
      {
        imgSrc: '../AlertProfiles/profile1.png',
        text: 'You have an assessment for <strong>WebCohinsive Technologies</strong> company on 15 July 2025',
        time: '22h ago'
      },
      {
        imgSrc: '../AlertProfiles/profile1.png',
        text: 'Don’t forget to look at your score for the recently performed aptitude assessment by Walmart Industries',
        time: '23h ago'
      }
    ]
  },
  {
    id: 2,
    type: 'Yesterday',
    items: [
      {
        imgSrc: '../AlertProfiles/profile1.png',
        text: 'You missed an assessment by Google Inc on React Js dev last week that you applied on 22 Jan 2024',
        date: '08 June 2024'
      },
      {
        imgSrc: '../AlertProfiles/profile1.png',
        text: 'Your assessment results are back and you have some feedback from recruiters from Coca-Cola Beverages',
        date: '08 June 2024'
      },
      {
        imgSrc: '../AlertProfiles/profile1.png',
        text: 'Your profile is not shortlisted for Junior Web Developer. Update your resume with proper skills for better offers',
        date: '08 June 2024'
      }
    ]
  },
  {
    id: 3,
    type: '04 June 2024',
    items: [
      {
        imgSrc: '../AlertProfiles/profile1.png',
        text: 'You missed an assessment by Google Inc on React Js dev last week that you applied on 22 Jan 2024',
        date: '08 June 2024'
      }
    ]
  }
];

const Alert = () => {
  return (
    <div className="alert-container">
      <div className="alert-header">
        <p>Alerts</p>
      </div>
      {alerts.map((alert) => (
        <div key={alert.id}>
          <div className="alert-type">{alert.type}</div>
          {alert.items.map((item, index) => (
            <div className="alert-item" key={index}>
              <img src={item.imgSrc} alt="profile" className="alert-img" />
              <div className="alert-text">
                <p dangerouslySetInnerHTML={{ __html: item.text }} />
                {item.time && <span className="alert-time">{item.time}</span>}
                {item.date && <span className="alert-date">{item.date}</span>}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Alert;
