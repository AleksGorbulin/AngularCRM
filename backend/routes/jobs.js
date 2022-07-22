const express = require('express');
const Job = require('../models/job');
const router = express.Router();



router.post("", (req,res,next)=>{
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

// =======================UPDATE FIELD IN JOB=========================
router.put('/:id',(req,res,next)=>{
    const jobHistory =  req.body;

    //  find job that needs status update
    Job.findById(req.params.id).then(
        job=>{
          if(job){
            const oldStatuses = job.jobHistory;
            const newHistory = oldStatuses.unshift(jobHistory)
            Job.updateOne({_id:req.params.id},{$set:{jobHistory:oldStatuses}}).then(
                (result)=>{
                    res.status(200).json({message:'Updated Successfully'});
                },(reason)=>{
                    res.status(404).json({message:"Could not update the DB"});
                }
            )
          }else{
            console.log('could not find the job to update the status');
            res.status(404).json({message:"Could not find the job to update"});
          }
        }
    )
  })
// ==================END  UPDATE FIELD IN JOB=========================

// =======================Update JOB======================================
router.put('/:id',(req,res,next)=>{
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
  Job.updateOne({_id:req.params.id}, job).then(
    (result)=>{
    res.status(200).json({message:'Updatesuccessful!'});
  },(reason)=>{
    console.log('did not go thru', reason)
  })
})
// =======================END UPDATE JOB==============================




router.get('',(req, res, next)=>{
  // by mongoose we can use find method to get all entrees
  Job.find()
    .then(documents=>{
      res.status(200).json({
        message:'Posts fetched succesfully',
        jobs:documents
      });
    })
});
//-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=
// get single job by id
router.get('/:id', (req,res,next)=>{
  Job.findById(req.params.id).then(
    job=>{
      if(job){
        res.status(200).json(job);
      }else{
        res.status(404).json({message:"Job not found!"});
      }
    }
)
})
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
router.delete("/:id",(req,res,next)=>{
  // deleting from DB
  Job.deleteOne({_id:req.params.id}).then(result =>{
    console.log(result);
    res.status(200).json({message:"Post deleted"});
  })
});


module.exports = router;