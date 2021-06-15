require('dotenv').config();
const express = require('express') // require the express package
const cors = require('cors');
const weatherData = require('./data/weather.json')
const axios=require('axios');
const app = express() // initialize your express app instance


app.use(cors()) // after you initialize your express app instance
// a server endpoint 

const PORT=process.env.PORT;
const WEATHER_BIT_KEY=process.env.WEATHER_BIT_KEY;
app.get('/', // our endpoint name
 function (req, res) { // callback function of what we should do with our request
  res.send('Hello World') // our endpoint function response
})
 
app.get('/weather', (req,res)=>{
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
})
// .catch(error){
//   res.send(error.message);
// }

class Weather {
  constructor(weatherData){
    this.description=weatherData.weather.description;
    this.date=weatherData.valid_date;
  }
}

app.listen(PORT,()=>{
  console.log(`Server started on ${PORT}`);
})