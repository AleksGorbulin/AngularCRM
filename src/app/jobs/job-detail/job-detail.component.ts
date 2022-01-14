import { Component, OnInit, Input } from '@angular/core';
import { Job } from '../jobs.model';
import { Part } from 'src/app/shared/part.model';
import { PartsListService } from 'src/app/parts-list/parts-list.service';
import { JobsService } from '../jobs.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Appliance } from 'src/app/shared/appliance.model';
import { ImageLightBoxService } from 'src/app/shared/image-lightBox/image-lightbox.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
job:Job;
id:number;
loadedTab:string='info'; //load choosen tab| info by default
appliances:Appliance[];

  constructor(private partsListService:PartsListService,
              private jobsService:JobsService,
              private route:ActivatedRoute,
              private imageLightBox:ImageLightBoxService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.job=this.jobsService.getJob(this.id);
        if(this.job.appliances){
          this.appliances = this.job.appliances;
        }
      }
    );
  }
  addParts(parts:Part[]){
    this.partsListService.addParts(parts);
  }
  onSelectTab(arg:string){
    this.loadedTab = arg;
    console.log('loadedTab', this.loadedTab);
  }
  passToImageLightbox(){
    this.imageLightBox.getImages(this.job.images);
  }
}
