require('dotenv').config();
const express = require('express') // require the express package
const cors = require('cors');

const { response } = require('express');
const app = express() // initialize your express app instance
const weatherController = require('./controller/weather.controller');
const movieController = require('./controller/movie.controller');
const indexController= require('./controller/indes.controller')
app.use(cors()) // after you initialize your express app instance
// a server endpoint 

const PORT=process.env.PORT;


app.get('/',indexController );
 
app.get('/weather', weatherController);

app.get('/movies',movieController);

app.listen(PORT,()=>{
  console.log(`Server started on ${PORT}`);
})