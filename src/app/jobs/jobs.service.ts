import { EventEmitter} from '@angular/core';
import { Job } from './jobs.model';
import { Part } from '../shared/part.model';
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
    'Asurion','SNDP12322',true,'12323323',new Date(), new Date(), new Date(), new Date(),
          [new Images('https://www.cnet.com/a/img/RPPYpCDQzZi-1Eyg2K4EVBvznaU=/940x0/2015/07/28/59f8ac3c-28ee-4bb3-9ef4-8bfd8e33e2ff/river-kenmore-72484-four-door-refrigerator-product-photos-1.jpg'),
              new Images('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLRh145NsLEoHFBhZCZFwyNhG_J7ppRK2eIw&usqp=CAU'),
              new Images('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLRh145NsLEoHFBhZCZFwyNhG_J7ppRK2eIw&usqp=CAU'),
              new Images('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLRh145NsLEoHFBhZCZFwyNhG_J7ppRK2eIw&usqp=CAU'),
              new Images('https://www.cnet.com/a/img/RPPYpCDQzZi-1Eyg2K4EVBvznaU=/940x0/2015/07/28/59f8ac3c-28ee-4bb3-9ef4-8bfd8e33e2ff/river-kenmore-72484-four-door-refrigerator-product-photos-1.jpg')],
          [new Part('B0044','12343','compressor',1,10,20,'1ewsdfe3','123ewwe4',false),
              new Part('B0044','45432','filter dryer',1,1,2,'1ewsdfe3','99332ew',false)],
          [new Appliance('Dryer','Kenmore','tnks422342','ekstr3443','display does not work'),
              new Appliance('Washer','Bosch','N/A','ekstr3443','No problem found')],
          [new JobHistory('jun 12,2002', 'completed','Good job')]),
    new Job('B0045','Maradonna', 'Dryer does not work','619-777-7777','7','Danshenskiy per','Kursk',10750,
    'COD','LG123',true,'12323323',new Date(), new Date(), new Date(), new Date(),
          [new Images('https://www.mrrooter.com/images/blog/MRR-BlogGraphic-WhyRefrigeratorLeakWater-0718.1807260706440.jpg')],
          [new Part('B0045','9000','igniter',1,10,20,'1ewsdfe3','asdfr4343',true),
              new Part('B0045','11111','belt',1,10,20,'1ewsdfe3','23wdsd',false)],
          [new Appliance('Refrigerator','LG','543344','sdfdf','handle')],
          [new JobHistory('2022-01-05', 'not completed','Good job')])];

  getJobs(){
    return this.jobs.slice();
  }
  getJob(id:number){
    const job = this.jobs[id];
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
  }
  // delete Part
  deletePart(index:number){
  }
  addStatusUpdate(index:number, jobHistory:JobHistory){
    this.jobs[index].jobHistory.unshift(jobHistory);
    this.jobsUpdated.next(this.jobs.slice());
  }
  // add images
  addImages(index, imageUrl){
    console.log('imageURl ', imageUrl);
    this.jobs[index].images.unshift(new Images(imageUrl));
  }

    // get job index by workOrder
    getIndexByWorkOrder(workOrder:string){
      return this.jobs.findIndex(
        job =>job.workOrderNumber.toLowerCase()===workOrder.toLowerCase()
      )
    }
}
