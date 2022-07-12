const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// getting job model/schema from job.js
const Job = require('./models/job');

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

app.post("/api/jobs", (req,res,next)=>{
  const job = new Job({
   workOrderNumber:req.body.workOrderNumber,
   name:req.body.name,
   description: req.body.description,
   phone:req.body.phone,
   houseNumber:req.body.houseNumber,
   street:req.body.street,
   city: req.body.city,
   zip:req.body.zip,
  // adding aditional job information
   jobSource:req.body.jobSource, // COD, Insurance, etc...
   jobNumberAssigned:req.body.jobNumberAssigned, // Number received from insurance company
   jobType: req.body.jobType, // Type of job Original or recall
   jobAuthorization: req.body.jobAuthorization, //Authorization Number for the job
   jobCreated:req.body.jobCreated, // Date when job was created
   jobAppointmentDate:req.body.jobAppointmentDate, // Date when job appointment for service
   jobAppointmentTime:req.body.jobAppointmentTime, // Time when job appointment for service
   jobCompletionDate:req.body.jobCompletionDate, // Date when job was completed
  // added additional job information
   images:req.body.images,
   parts:req.body.parts,
   appliances:req.body.appliances,
   jobHistory:req.body.jobHistory
  });
  // save job and return _id from DB
  job.save().then((createdJob)=>{
    res.status(201).json({
      message:'Job added sucessfully',
      id:createdJob._id
    });
  }
  );
});

app.put('/api/jobs/:id',(req,res,next)=>{
  // update the DB record
  const job= new Job({
    _id:req.body.id,
    workOrderNumber:req.body.workOrderNumber,
    name:req.body.name,
    description: req.body.description,
    phone:req.body.phone,
    houseNumber:req.body.houseNumber,
    street:req.body.street,
    city: req.body.city,
    zip:req.body.zip,
   // adding aditional job information
    jobSource:req.body.jobSource, // COD, Insurance, etc...
    jobNumberAssigned:req.body.jobNumberAssigned, // Number received from insurance company
    jobType: req.body.jobType, // Type of job Original or recall
    jobAuthorization: req.body.jobAuthorization, //Authorization Number for the job
    jobCreated:req.body.jobCreated, // Date when job was created
    jobAppointmentDate:req.body.jobAppointmentDate, // Date when job appointment for service
    jobAppointmentTime:req.body.jobAppointmentTime, // Time when job appointment for service
    jobCompletionDate:req.body.jobCompletionDate, // Date when job was completed
    images:req.body.images,
    parts:req.body.parts,
    appliances:req.body.appliances,
    jobHistory:req.body.jobHistory
  })
  // job._id="62a625dfb39d6f63bbfbb24f";
  console.log('job_id, ',req.body.id, req.params.id);
  Job.updateOne({_id:req.params.id}, job).then(
    (result)=>{
      console.log('looks successfull' , req.params.id)
    res.status(200).json({message:'Updatesuccessful!'});
  },(reason)=>{
    console.log('did not go thru', reason)
  })
})


app.get('/api/jobs',(req, res, next)=>{
  // by mongoose we can use find method to get all entrees
  Job.find()
    .then(documents=>{
      res.status(200).json({
        message:'Posts fetched succesfully',
        jobs:documents
      });
    })
});

app.delete("/api/jobs/:id",(req,res,next)=>{
  // deleting from DB
  Job.deleteOne({_id:req.params.id}).then(result =>{
    console.log(result);
    res.status(200).json({message:"Post deleted"});
  })


});
module.exports = app;
