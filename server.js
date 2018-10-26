const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const items = require('./routes/api/items');

const app = express();
const Data = require('./models/Item');

//Bodyparser Middleware
app.use(bodyParser.json());
app.use(cors());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use('/api/items', items);
app.get('/getTrendingTVshows', (req, res) => {
  const URL =
    'https://api.themoviedb.org/3/trending/tv/day?api_key=10255e7670c6cf88d80320c2ddf5f034';

  axios
    .get(URL)
    .then(function(response) {
      console.log(response.data);
      res.send(response.data);
    })
    .catch(function(error) {
      console.log(error);
    });
});

app.get('/get', (req, res) => {
  Data.find()
    .then(data => {
      console.log(data);
      res.send(data);
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(404).json(error);
    });
});

// server.get('/helloworld', (req, res) => {
//   // res.status(200).send(JSON.stringify(value));
//   res.status(200).json(value);
// });

app.post('/get', (req, res) => {
  console.log(req.body);
  const data = [
    {
      name: req.body.name,
      first_air_date: req.body.first_air_date,
      overview: req.body.overview,
      poster_path: req.body.poster_path
    }
  ];
  Data.insertMany(data)
    .then(res => {
      res.send(res);
      res.status(200).json(res);
    })
    .catch(error => {
      res.status(400).json(error);
    });
  
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
