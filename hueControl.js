Certainly! Here's an example of a Node.js function that handles an API request and turns on a Philips Hue light using the Philips Hue API:

```javascript
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
```

Please note that you need to replace `'http://your-philips-hue-api-endpoint/lights/1/state'` with the actual Philips Hue API endpoint for your light, and `'your-philips-hue-api-key'` with your Philips Hue API key. Also, make sure you have the `axios` package installed (`npm install axios`) before running this code.

This code assumes you're using Express.js as the server framework, but you can adapt it to any other Node.js server framework as needed. The function `turnOnHueLight` checks if the event type is `'tip'`, and if so, it sends a PUT request to the Philips Hue API to turn on the specified light.
