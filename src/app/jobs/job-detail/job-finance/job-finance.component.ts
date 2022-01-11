import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { Part } from 'src/app/shared/part.model';

@Component({
  selector:'app-job-finance',
  templateUrl:'./job-finance.component.html',
  styleUrls:['./job-finance.component.css']
})
export class JobFinanceComponent implements OnInit{
@Input() appliances;
@Input() parts:Part[];

ngOnInit(){
  console.log('finance appliances ', this.appliances);
}
}
