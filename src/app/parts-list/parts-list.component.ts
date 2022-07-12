import { Component, OnInit, OnDestroy } from '@angular/core';
import { Part } from '../shared/part.model';
import { PartsListService } from './parts-list.service';
import { JobsService } from '../jobs/jobs.service';
import { Job } from '../jobs/jobs.model';

@Component({
  selector: 'app-parts-list',
  templateUrl: './parts-list.component.html',
  styleUrls: ['./parts-list.component.css']
})
export class PartsListComponent implements OnInit, OnDestroy {
  parts:Part[];
  jobs:Job[];
  private subscription;

  constructor(private partsListService:PartsListService
              ) { }

  ngOnInit(): void {
    // this.parts= this.partsListService.getParts();
    // this.parts=this.partsListService.getPartsFromJobs();
    this.subscription=this.partsListService.updatedParts.subscribe(
      (updatedParts:Part[])=>{
        this.parts=updatedParts;
        console.log('updated parts with slon', this.parts)
      }
    );
  }
  onEditItem(id:number){
    this.partsListService.startedEditing.next(id);
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  changePartStatus(index,jobId){
    this.parts[index].received= !this.parts[index].received;
    this.parts[index].quantity=10;
    // this.partsListService.checkIfAllPartsReceived(jobId);
  }
}
