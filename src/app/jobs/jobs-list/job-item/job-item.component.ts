import { Component, OnInit, Input, HostListener, OnChanges, SimpleChanges} from '@angular/core';
import { Job } from '../../jobs.model';




@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.css']
})
export class JobItemComponent implements OnInit,OnChanges{
@Input() job:Job;
@Input() jobId:number;
@Input() jobStatus:String= '';
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
    console.log('see changes', changes);
  }
  ngOnInit(): void {
    // getting last updated job status
    console.log('the status has been changed',this.jobStatus= this.job.jobHistory[this.job.jobHistory.length-1].jobStatus);
    // if(this.job.jobHistory.length>0){
    //   this.jobStatus= this.job.jobHistory[this.job.jobHistory.length-1].jobStatus;
    // }
  }

}
