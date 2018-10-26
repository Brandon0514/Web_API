const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const items = require('./routes/api/items');

const app = express();
const Data = require ('./models/Item');


//Bodyparser Middleware
app.use(bodyParser.json());
app.use(cors());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// //extract data type
// const schema = mongoose.Schema({
//   name: { type: String },
//   release_date: { type: String },
//   overview: { type: String },
//   id: { type: String },
// });

// const Movie = mongoose.model('Movie', schema, 'movieCollection');

// module.exports = Movie;

// Use Routes
app.use('/api/items', items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

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

app.get('/get',(req,res)=>{
  Data.find()
  .then(data=>{
    console.log(data);
    res.send(data);
    res.status(200).json(data);
  })
  .catch(error=>{
    res.status(404).json(error);
  });
})

//localhost:5000/postcreate
app.post('/get', (req, res) => {
  console.log(req.body);
  const data = [{
    name: req.body.name,
    release_date: req.body.Release_date,
    overview: req.body.Overview,
    id: req.body.Id 
  }];
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

