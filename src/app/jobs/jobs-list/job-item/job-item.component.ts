import { Component, OnInit, Input, HostListener, OnChanges, SimpleChanges} from '@angular/core';
import { Job } from '../../jobs.model';




@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.css']
})
export class JobItemComponent implements OnInit,OnChanges{
@Input() job:Job;
@Input() jobId:string;
@Input() jobStatus:String= ''; // getting from parent jobStatus
constructor() { }

counter = 0;
@HostListener('window:keydown', ['$event'])
handleKeyDown(event: KeyboardEvent) {
  this.counter++;
}
resetCounter() {
  this.counter = 0;
}
  ngOnChanges(changes:SimpleChanges):void{
  }
  ngOnInit(): void {
    // getting last updated job status
    this.jobStatus= this.job.jobHistory[0].jobStatus;
  }

}
