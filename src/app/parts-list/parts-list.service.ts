import { Part } from '../shared/part.model';
import { Subject } from 'rxjs';
import { JobsService } from '../jobs/jobs.service';
import { Injectable } from '@angular/core';
import { JobHistory } from '../shared/job-history.model';
import { Job } from '../jobs/jobs.model';

@Injectable({providedIn:'root'})
export class PartsListService{
  updatedParts= new Subject<Part[]>();
  startedEditing= new Subject<number>();
  constructor(private jobsService:JobsService){
  }
private  parts:Part[]=[
    // new Part('LG001','23ds23', 'compressor', 2, 20,30,'sdf43434rff',true),
    // new Part('LG002','23ds23', 'filter', 1,10,20,'sdf43434rff',false)
  ];
  getPartsFromJobs(){
    this.parts=[];
   this.jobsService.getJobs().every(
      job=>{
       return this.parts.push(...job.parts);
      }
    )
    return this.parts;
  }
  getParts(){
    // return this.parts.slice();
    return this.parts;
  }
  getPart(index:number){
    return this.parts[index];
  }
  addPart(part:Part){
    this.parts.push(part);
    this.updatedParts.next(this.parts);
  }
  addParts(parts:Part[]){
    this.parts.push(...parts);
  }
  updatePart(index:number, newPart:Part){
    // this.parts[index] = newPart;

    this.parts[index].name=newPart.name;
    this.updatedParts.next(this.parts.slice());
    console.log('JOBS PARTS',this.parts);
  }
  deleteItem(index:number){
    this.parts.splice(index,1);
    this.updatedParts.next(this.parts.slice());
  }
  checkIfAllPartsReceived(workOrder){
    // find job index
    const jobIndex = this.jobsService.getIndexByWorkOrder(workOrder);

    // get a job instance
    const job:Job= this.jobsService.getJob(+jobIndex);

    // check if all parts received for this job
    const allPartsReceived =job.parts.every(part=>{return part.received===true});
    if(allPartsReceived){
      // create a new job history
      var jobHistory:JobHistory = new JobHistory('01/18/22', 'parts received','part department checked out all parts received');
    }else{
      var jobHistory:JobHistory = new JobHistory('01/18/22', 'waiting for parts','part department updated parts');
    }
    this.jobsService.addStatusUpdate(jobIndex,jobHistory);
  }
}
