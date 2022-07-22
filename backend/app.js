const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jobsRoutes = require('./routes/jobs');
// getting job model/schema from job.js


const app = express();

mongoose.connect("mongodb+srv://Alex:sov6PiaTSj387kBb@cluster0.d4odj.mongodb.net/node-angular?retryWrites=true&w=majority")
  .then(()=>{
    console.log('Connected to database');
  })
  .catch(()=>{
    console.log('Connection failed');
  })
// Alex sov6PiaTSj387kBb mangoDB user pass
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin',"*");
  res.setHeader('Access-Control-Allow-Headers',"Origin, X-Requested-With, Content-Type,Accept");
  res.setHeader('Access-Control-Allow-Methods',"GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
})

app.use("/api/jobs",jobsRoutes);

module.exports = app;
