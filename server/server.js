const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { response } = require('express');
const authRoutes = require('../routes/authRoutes');
const taskRoutes = require('../routes/taskRoutes');
const {checkUser}= require('../middleware/authMiddleware');

const server = express();
const port = process.env.PORT || 3000;

//middle ware
server.use(express.static('../public'));
//this middleware right here gets a json data from our web server
server.use(express.json());
//this middleware helps with cookies
server.use(cookieParser());
server.use(express.urlencoded({extended: true}));


//view engine
server.set('view engine', 'ejs');
server.set('views','../views');
server.locals.moment = require('moment');


const dbURI = 'mongodb+srv://taskAdmin:in5q6kN2Bnm3nSP@cluster0.3a6id.gcp.mongodb.net/TaskHandler?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result)=>{
      server.listen(port);
      console.log('connected to db successfully')
      console.log('listening on port 3000')
  })
  .catch((error)=>{
      console.log(error)
  });

//basic routes
server.get('*', checkUser);
server.get('/',(request, response)=>response.render('home'));


server.use(authRoutes);
server.use(taskRoutes);

//404 error
server.use((request, response)=>{
    response.status(404).render('404',{title:'404'});
});
