const mongoose = require('mongoose');

const jobsSchema = mongoose.Schema({
   workOrderNumber:String,
   name:String,
   description: String,
   phone:String,
   houseNumber:String,
   street:String,
   city: String,
   zip:Number,
  // adding aditional job information
   jobSource:String, // COD, Insurance, etc...
   jobNumberAssigned:String, // Number received from insurance company
   jobType: Boolean, // Type of job Original or recall
   jobAuthorization: String, //Authorization Number for the job
   jobCreated:Date, // Date when job was created
   jobAppointmentDate:Date, // Date when job appointment for service
   jobAppointmentTime:Date, // Time when job appointment for service
   jobCompletionDate:Date, // Date when job was completed
  // added additional job information
   images:[],
   parts:[],
   appliances:[],
   jobHistory:[]
});

module.exports = mongoose.model('Job', jobsSchema);
