const express = require('express');
const router = express.Router();
const request = require('superagent');

router.post('/', function(req, res) {  // Ensure it's handling POST requests at the root path
  const { code } = req.body;

  console.log(`Received code: ${code}`);

  if (!code) {
    return res.status(400).send('Authorization code not provided');
  }

  requestAccessToken(code)
    .then((response) => {
      console.log('Access Token Response:', response.body);
      return requestProfile(response.body.access_token);
    })
    .then(response => {
      console.log('LinkedIn Profile:', response.body);
      res.json(response.body);
    })
    .catch((error) => {
      console.error('Error during code exchange or profile request:', error.response ? error.response.body : error.message);
      res.status(500).send(`Authentication failed: ${error.message}`);
    });
});

function requestAccessToken(code) {
  return request.post('https://www.linkedin.com/oauth/v2/accessToken')
    .send('grant_type=authorization_code')
    .send(`redirect_uri=http://localhost:3000`)
    .send(`client_id=861y7pqrcdz1yz`)
    .send(`client_secret=OlHJDnbqf95KpsiN`)
    .send(`code=${code}`);
}

function requestProfile(token) {
  return request.get('https://api.linkedin.com/v2/me?projection=(id,localizedFirstName,localizedLastName,profilePicture(displayImage~digitalmediaAsset:playableStreams))')
    .set('Authorization', `Bearer ${token}`);
}

module.exports = router;