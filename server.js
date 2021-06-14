require('dotenv').config();
const express = require('express') // require the express package
const cors = require('cors');
const weatherData = require('./data/weather.json')
const app = express() // initialize your express app instance


app.use(cors()) // after you initialize your express app instance
// a server endpoint 

const PORT=process.env.PORT;
app.get('/', // our endpoint name
 function (req, res) { // callback function of what we should do with our request
  res.send('Hello World') // our endpoint function response
})
 
app.listen(PORT)