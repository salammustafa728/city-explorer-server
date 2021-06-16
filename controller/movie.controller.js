require('dotenv').config();
const axios=require('axios');
// const movieData = require('./data/movie.json');
const Movie=require('../models/movie.model');
const MOVIE_API_KEY=process.env.MOVIE_API_KEY;

async function displayMovie (req,res){
    let searchQuery=req.query.query;
    const movieUrl=`https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${searchQuery}`
    const movieDD=await axios.get(movieUrl);
    const movieData= movieDD.data.results.map(movie=>{
      return new Movie(movie);
  
    })
    res.status(200).send(movieData) 
    
    
    }


module.exports = displayMovie;    