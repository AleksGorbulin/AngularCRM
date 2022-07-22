import { Component, OnInit, Input } from '@angular/core';
import { Appliance } from 'src/app/shared/appliance.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-appliance-detail',
  templateUrl: './appliance-detail.component.html',
  styleUrls: ['./appliance-detail.component.css']
})
export class ApplianceDetailComponent implements OnInit {
@Input("appliances") appliances:Appliance[];
@Input("jobId") jobid:string;
applianceUpdateForm:FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.applianceUpdateForm = new FormGroup({
      
    })
  }
  onApplianceUpdate(){

  }

}
