const express = require('express');
const http = require('http');
const app = express();
const port = 3000;



const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQzMzI0MjksImNvbXBhbnlOYW1lIjoiQ2VudHJhbCBSYWlsIiwiY2xpZW50SUQiOiIyMGU3MGViNS02ZWE0LTQ0NDMtOGUwNi1kZWRlZjM5OTE2N2IiLCJvd25lck5hbWUiOiIiLCJvd25lckVtYWlsIjoiIiwicm9sbE5vIjoiNTAwMDgzODQwIn0.LvMb9e_lsrWiL8sHYq1l6ukDBzwrkh3U9AIUrhTO-Pg';


app.get('/fetchData', (req, res) => {

  const externalApiUrl = 'http://20.244.56.144/train/trains';

  const url = new URL(externalApiUrl);

  
  const options = {
    hostname: url.hostname,
    path: url.pathname,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${bearerToken}`, // Include the bearer token in the headers
    },
  };

  const request = http.request(options, (response) => {
    let data = '';

    
    response.on('data', (chunk) => {
      data += chunk;
    });

    // Handle the end of the response
    response.on('end', () => {
      try {
        const parsedData = JSON.parse(data);
        res.json(parsedData);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  });

  // Handling errors
  request.on('error', (error) => {
    console.error('Error making HTTP request:', error);
    res.status(500).json({ error: 'Internal server error' });
  });

  
  request.end();
});

app.listen(port, () => {
  console.log(`Data API is listening on port ${port}`);
});
