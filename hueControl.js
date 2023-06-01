const axios = require('axios');

function turnOnHueLight(req, res) {
  const postData = req.body;

  if (postData.event === 'tip') {
    const hueApiEndpoint = 'http://10.10.10.101/lights/1/state'; // Replace with your Philips Hue API endpoint and light ID
    const hueApiKey = 'your-philips-hue-api-key'; // Replace with your Philips Hue API key

    const hueLightState = {
      on: true,
      bri: 254, // Brightness (0-254)
      hue: 10000, // Color hue (0-65535)
      sat: 254, // Saturation (0-254)
    };

    axios.put(hueApiEndpoint, hueLightState, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${hueApiKey}`
      }
    })
    .then(response => {
      console.log('Hue light turned on:', response.data);
      res.status(200).json({ message: 'Hue light turned on' });
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
