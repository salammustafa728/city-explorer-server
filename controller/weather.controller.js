require('dotenv').config();
// const weatherData = require('./data/weather.json')
const axios=require('axios');
const Weather = require('../models/weather.model')
const WEATHER_BIT_KEY=process.env.WEATHER_BIT_KEY;

const weatherController = (req,res)=>{
    const lat = req.query.lat;
    const lon = req.query.lon;
   if(lat && lon){
    const weatherBitUrl =`https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${lat}&lon=${lon}`
  
    axios.get(weatherBitUrl).then(responce =>{
      
      const responceData = responce.data.data.map(obj => new Weather(obj))
      res.json(responceData)
    }).catch(error =>{
      res.send(error.message)
    })
    
   }else{
         res.send('please provide the proper lat and lon')
   }
  }

  module.exports = weatherController;