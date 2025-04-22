const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory data store for votes
const votes = {
  option1: 0,
  option2: 0
};

// API routes
app.get('/api/votes', (req, res) => {
  res.json(votes);
});

app.post('/api/vote', (req, res) => {
  const { option } = req.body;
  
  if (option === 'option1' || option === 'option2') {
    votes[option]++;
    res.json({ success: true, votes });
  } else {
    res.status(400).json({ success: false, message: 'Invalid option' });
  }
});

// Serve static assets in all environments when the client/build folder exists
app.use(express.static(path.join(__dirname, 'client/build')));

// Handle any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 