import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Job } from '../jobs.model';
import { JobsService } from '../jobs.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit,OnDestroy {

  constructor(private jobsService:JobsService) { }
  jobs:Job[];
  query:string;
  subsctiption :Subscription;
  searchSubsctiption:Subscription;
  ngOnInit(): void {
    // update view if jobs change added or edited
    this.subsctiption=this.jobsService.jobsUpdated.subscribe(
      (jobs)=>{
        this.jobs=jobs;
        console.log('jobs-list updated in jobs-list component', jobs);
      }
    );
    //get/show initial jobs
   this.jobs=this.jobsService.getJobs();
   console.log('jobs-list updated in jobs-list component 2', this.jobs);
    // get/show jobs after search
   this.searchSubsctiption= this.jobsService.searchResults.subscribe(
      (foundJobs)=>{
        if(foundJobs.length >0){
          this.jobs=foundJobs
        }else{
          this.jobs=null;
        }
      }
    );
  }
search(){
  this.jobsService.findJob(this.query);
}
ngOnDestroy(){
  this.subsctiption.unsubscribe();
  this.searchSubsctiption.unsubscribe();
}
}
