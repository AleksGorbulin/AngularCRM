import { Component, OnInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { Part } from 'src/app/shared/part.model';
import { PartsListService } from '../parts-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-part-edit',
  templateUrl: './part-edit.component.html',
  styleUrls: ['./part-edit.component.css']
})
export class PartEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static:false}) partsForm:NgForm;
  subscription:Subscription;
  editMode=false;
  editedItemIndex;
  editedItem:Part;
  constructor(private partsListService:PartsListService) { }

  ngOnInit(): void {
    this.subscription = this.partsListService.startedEditing.subscribe(
      (index:number)=>{
        this.editedItemIndex = index;
        this.editMode= true;
        this.editedItem = this.partsListService.getPart(index);
        this.partsForm.setValue({
          //  jobId:this.editedItem.jobId,
           partNumber:this.editedItem.number,
           description:this.editedItem.name,
           quantity:this.editedItem.quantity,
           cost: this.editedItem.cost,
           retail:this.editedItem.retail,
           trackNumber:this.editedItem.trackNumber,
           partOrderNumber:this.editedItem.partOrderNumber,
           received:this.editedItem.received
        });
      }
    );
  }
  submitForm(form:NgForm){
    const value = form.value;
    const newPart:Part= new Part(
      this.editedItem.jobId,
      value.partNumber,
      value.description,
      value.quantity,
      value.cost,
      value.retail,
      value.trackNumber,
      value.partOrderNumber,
      value.received
    );
    if(this.editMode){
      this.partsListService.updatePart(this.editedItemIndex,newPart );
    }else{
      this.partsListService.addPart(newPart);
    }
    this.editMode=false;
    this.partsForm.reset();
  }

  onClear(){
    this.partsForm.resetForm();
    this.editMode= false;
  }
  onDelete(){
    this.partsListService.deleteItem(this.editedItemIndex);
    this.onClear();
  }
ngOnDestroy(){
  this.subscription.unsubscribe();
}
}
