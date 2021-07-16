require('dotenv').config();
const axios=require('axios');
// const movieData = require('./data/movie.json');
const Cache = require('../helper/Cache')
const cacheObj = new Cache();

const Movies=require('../models/movie.model');
const MOVIE_API_KEY=process.env.MOVIE_API_KEY;

const displayMovie = (req,res)=>{
    let city=req.query.query;
    console.log('city',city);
    const requestKey = `movies-${city}`;

    if (city) {
      if (cacheObj[requestKey] && Date.now() - cacheObj[requestKey].timeStamp < 86400000) {
          res.json(cacheObj[requestKey].data);
          console.log(cacheObj[requestKey].data,'cacheObj[requestKey].data');
      } else {
          const moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${city}`;
          axios
              .get(moviesUrl)
              .then((axiosResponse) => {
                  const arrayOfMovies = axiosResponse.data.results.map((movie) => new Movies(movie));
                  cacheObj[requestKey] = {};
                  cacheObj[requestKey].data = arrayOfMovies;
                  cacheObj[requestKey].timeStamp = Date.now();
                  res.json(arrayOfMovies);
                  console.log(arrayOfMovies);
              })
              .catch((error) => {
                  res.send(error.message);
              });
      }
  } 
  else {
      res.send("please provide the City name");
  }
    }
   
    
    


module.exports = displayMovie;    