import { Component, ViewChild, Input, OnInit } from '@angular/core';

@Component({
  selector:'app-job-finance',
  templateUrl:'./job-finance.component.html',
  styleUrls:['./job-finance.component.css']
})
export class JobFinanceComponent implements OnInit{
@Input() appliances;

ngOnInit(){
  console.log('finance appliances ', this.appliances);
}
}
