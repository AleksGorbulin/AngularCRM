import { Component, OnInit, Input } from '@angular/core';
import { Appliance } from 'src/app/shared/appliance.model';

@Component({
  selector: 'app-appliance-detail',
  templateUrl: './appliance-detail.component.html',
  styleUrls: ['./appliance-detail.component.css']
})
export class ApplianceDetailComponent implements OnInit {
@Input("appliances") appliances:Appliance[];

  constructor() { }

  ngOnInit(): void {
  }

}
