import { EventEmitter} from '@angular/core';
import { Job } from './jobs.model';
import { Part } from '../shared/part.model';
import { Address } from '../shared/address.model';
import { Appliance } from '../shared/appliance.model';
import { Subject } from 'rxjs';
import { Images } from '../shared/images.model';
import { JobHistory } from '../shared/job-history.model';


export class JobsService{
  searchResults = new EventEmitter<Job[]>();
  jobsUpdated = new Subject<Job[]>();
  statusUpdated = new Subject<JobHistory[]>();

 private jobs:Job[]=[
    new Job('B0044','John Snow', 'Refrigerator leaks water','619-888-8888','2517','Northside dr','San Diego',92108,
          [new Images('https://www.mrrooter.com/images/blog/MRR-BlogGraphic-WhyRefrigeratorLeakWater-0718.1807260706440.jpg'),
              new Images('https://www.mrrooter.com/images/blog/MRR-BlogGraphic-WhyRefrigeratorLeakWater-0718.1807260706440.jpg'),
              new Images('https://www.mrrooter.com/images/blog/MRR-BlogGraphic-WhyRefrigeratorLeakWater-0718.1807260706440.jpg')],
          [new Part('COD1','12343','compressor',1,10,20,'1ewsdfe3',false),
              new Part('COD2','45432','filter dryer',1,1,2,'1ewsdfe3',false)],
          [new Appliance('Dryer','tnks422342','ekstr3443','display does not work'),
              new Appliance('Washer','N/A','ekstr3443','No problem found')],
          [new JobHistory('jun 12,2002', 'completed','Good job')]),
    new Job('B0045','Maradonna', 'Dryer does not work','619-777-7777','7','Danshenskiy per','Kursk',10750,
          [new Images('https://www.mrrooter.com/images/blog/MRR-BlogGraphic-WhyRefrigeratorLeakWater-0718.1807260706440.jpg')],
          [new Part('AHS1','9000','igniter',1,10,20,'1ewsdfe3',true),
              new Part('ASHURION','11111','belt',1,10,20,'1ewsdfe3',false)],
          [new Appliance('Refrigerator','543344','sdfdf','handle')],
          [new JobHistory('2022-01-05', 'not completed','Good job')])];

  getJobs(){
    return this.jobs.slice();
  }
  getJob(id:number){
    const job = this.jobs[id];
    // const job= this.jobs.find((job)=>job.id===id);
    console.log('get job ', job);
    return job;
  }
  findJob(query:string){
    const queryString= query.toLowerCase();
    const filteredJobs:Job[]=this.jobs.filter(
      (job)=>{
         return job.name.toLowerCase().includes(queryString) ||
                job.description.toLowerCase().includes(queryString)||
                job.phone.includes(queryString) ||
                job.houseNumber.includes(queryString)||
                job.street.includes(queryString)||
                job.city.includes(queryString)||
                job.workOrderNumber.toLowerCase().includes(queryString)}
    );
      this.searchResults.emit(filteredJobs)
  }
  addJob(job:Job){
    this.jobs.push(job);
    // send subject to update view
    this.jobsUpdated.next(this.jobs.slice());
  }
  updateJob(index:number,newJob:Job){
    this.jobs[index]=newJob;
    // send subject to update view
    this.jobsUpdated.next(this.jobs.slice());
    console.log('this.jobs.slice() ',this.jobs.slice());
  }
  // delete Part
  deletePart(index:number){
  }
  addStatusUpdate(index:number, jobHistory:JobHistory){
    this.jobs[index].jobHistory.push(jobHistory);
    this.jobsUpdated.next(this.jobs.slice());
    console.log('from service job array', this.jobs[index].jobHistory);
  }
}
