import { Component, OnInit, OnDestroy } from '@angular/core';
import { Part } from '../shared/part.model';
import { PartsListService } from './parts-list.service';
import { isBoolean } from 'util';

@Component({
  selector: 'app-parts-list',
  templateUrl: './parts-list.component.html',
  styleUrls: ['./parts-list.component.css']
})
export class PartsListComponent implements OnInit, OnDestroy {
  parts:Part[];
  private subscription;

  constructor(private partsListService:PartsListService) { }

  ngOnInit(): void {
    this.parts= this.partsListService.getParts();
    this.subscription=this.partsListService.updatedParts.subscribe(
      (updatedParts:Part[])=>{
        this.parts=updatedParts;
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
    this.partsListService.checkIfAllPartsReceived(jobId);
  }
}
