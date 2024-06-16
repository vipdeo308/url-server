const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl'); // You need to create this Mongoose model

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/url-shortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.error('MongoDB connection error:', err));

// Endpoint to create a short URL
app.post('/shorten', async (req, res) => {
  const { urlToShorten } = req.body;
  const shortUrl = new ShortUrl({ longUrl: urlToShorten });
  await shortUrl.save();
  
  res.send({ shortUrl: `${shortUrl.shortUrl}/${shortUrl.urlCode}` });
});

// Endpoint to redirect to the original URL
app.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;
  const shortUrl = await ShortUrl.findOne({ shortCode: shortCode });
  
  if (shortUrl) {
    shortUrl.clicks++;
    await shortUrl.save();
    res.redirect(shortUrl.longUrl);
  } else {
    res.status(404).send('Short URL not found');
  }
});


// Model for ShortUrl would include fields for longUrl, shortCode, and clickCount

app.listen(3000, () => console.log('Server started on port 3000'));
