const axios = require('axios');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Disables SSL certificate verification

function turnOnHueLight(req, res) {
  const postData = req.body;

  if (postData.event === 'tip') {
    const hueApiEndpoint = 'https://10.10.10.101/lights/1/state'; // Replace with your Philips Hue API endpoint and light ID
    const hueApiKey = 'your-philips-hue-api-key'; // Replace with your Philips Hue API key

    const turnOnState = {
      on: true,
      bri: 254,
      hue: 10000,
      sat: 254,
    };

    const turnOffState = {
      on: false,
    };

    axios.put(hueApiEndpoint, turnOnState, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${hueApiKey}`
      },
      rejectUnauthorized: false, // Disables SSL certificate verification
    })
    .then(response => {
      console.log('Hue light turned on:', response.data);
      setTimeout(() => {
        axios.put(hueApiEndpoint, turnOffState, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${hueApiKey}`
          },
          rejectUnauthorized: false, // Disables SSL certificate verification
        })
        .then(() => {
          console.log('Hue light turned off');
        })
        .catch(error => {
          console.error('Error turning off Hue light:', error);
        });
      }, 3000); // 3 seconds

      res.status(200).json({ message: 'Hue light turned on for 3 seconds' });
    })
    .catch(error => {
      console.error('Error turning on Hue light:', error);
      res.status(500).json({ error: 'Failed to turn on Hue light' });
    });
  } else {
    res.status(400).json({ error: 'Invalid event type' });
  }
}

// Usage example with Express.js
const express = require('express');
const app = express();

app.use(express.json());

app.post('/control-hue', turnOnHueLight);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
