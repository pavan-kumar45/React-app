import React from 'react';
import axios from 'axios';
import styles from './LoginRegister.module.css'; 
// import './LoginRegister.module.css'
import style from './welcomePage.module.css'
const LinkedInLogin = () => {

  const requestLinkedInProfile = () => {
    const oauthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=861y7pqrcdz1yz&scope=email%20profile&redirect_uri=http://localhost:3000`;
    const width = 450,
      height = 730,
      left = window.screen.width / 2 - width / 2,
      top = window.screen.height / 2 - height / 2;

    const popup = window.open(
      oauthUrl,
      "Linkedin",
      "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
        width +
        ", height=" +
        height +
        ", top=" +
        top +
        ", left=" +
        left
    );

    const interval = setInterval(() => {
      try {
        if (popup.closed) {
          clearInterval(interval);
        } else if (popup.location.href.includes('code=')) {
          const urlParams = new URLSearchParams(popup.location.search);
          const code = urlParams.get('code');

          console.log('Authorization code captured in popup:', code);

          // Send the authorization code to the backend from the popup
          axios.post('/callback', { code })
            .then((response) => {
              console.log('Profile data:', response.data);
              // Optionally pass the data to the main window or handle it here
              // window.opener.postMessage({ profile: response.data }, '*');
              popup.close();  // Close the popup after successful backend communication
            })
            .catch((error) => {
              console.error('Error during LinkedIn authentication:', error);
              popup.close();  // Close the popup even if there's an error
            });
        }
      } catch (error) {
        // Ignore DOMExceptions caused by cross-origin access until LinkedIn redirects back
      }
    }, 2000);
  };

  return (
<div className={style['auth-button']}>
  <div className={style['logo']}>
    <img src="../linkedin.png" alt="LinkedIn auth Logo" />
  </div>
  <div className="auth-text-1">
    <button onClick={requestLinkedInProfile} className={styles.customButton}>
      Login with <b>LinkedIn</b>
    </button>
  </div>
</div>

  );
};

export default LinkedInLogin;
