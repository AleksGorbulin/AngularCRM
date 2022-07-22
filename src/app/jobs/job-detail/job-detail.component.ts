import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { Job } from '../jobs.model';
import { Part } from 'src/app/shared/part.model';
import { PartsListService } from 'src/app/parts-list/parts-list.service';
import { JobsService } from '../jobs.service';
import { ActivatedRoute, Params} from '@angular/router';
import { Appliance } from 'src/app/shared/appliance.model';
import { map, tap } from 'rxjs/operators';


@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
job:Job;
id:string; //job id loaded
loadedTab:string='info'; //load choosen tab| info by default
appliances:Appliance[];
imageUrl=null;
@ViewChild('imageUploadForm',{static:false}) imageUploadForm:NgForm;

  constructor(private partsListService:PartsListService,
              private jobsService:JobsService,
              private route:ActivatedRoute,
              ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=params['id'];
        // this.job=this.jobsService.getJob(this.id);
        // 
        this.jobsService.getJobDemo(this.id)
        .subscribe(
          jobData=> {
            this.job=jobData;
          }
        );
        if(this.job){
          this.appliances = this.job.appliances;
        }
      }
    );
    // updating detail view if edited the job
    this.jobsService.jobUpdated.subscribe(
      (job)=>{
        this.job = job;
      }
    ) 
  }
  addParts(parts:Part[]){
    this.partsListService.addParts(parts);
  }
  onSelectTab(arg:string){
    this.loadedTab = arg;
  }
  onSelectFile(event){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.imageUrl = (<FileReader>event.target).result;
      }
    }
  }
  uploadImage(form:NgForm){
    this.jobsService.addImages(this.id,this.imageUrl);
    this.imageUploadForm.resetForm();
    this.imageUrl=null;
  }
  deselectImage(){
    this.imageUrl=null;
  }
  onDelete(id:string){
    this.jobsService.deleteJob(id);
  }
}
