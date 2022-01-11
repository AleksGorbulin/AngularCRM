import { Component, OnInit,Input } from '@angular/core';
import { Job } from '../../jobs.model';
import { NgForm } from '@angular/forms';
import { JobsService } from '../../jobs.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {
@Input ("currentJob") job:Job; // getting job object from job-detail
jobStatus:String="Choose status ";
privataNotes:String;
newJobObject={};
editDate:Date;
// job route id
id:number;
  constructor(private jobService:JobsService,private route:ActivatedRoute,) { }

  ngOnInit(): void {
    this.newJobObject = {...this.job}
    this.newJobObject['workOrderNumber'] = 'Z1';
    this.editDate = new Date();
    // get the job route
    this.route.params.subscribe(
      (params:Params)=>{
        this.id= params['id'];
        // this.editMode=params['id']!=null;
        // this.initForm();
      }
    );

  }
  updateStatus(form:NgForm){
    console.log(form.value);
    this.jobService.addStatusUpdate(this.id,form.value);
  }
}
