import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Images } from 'src/app/shared/images.model';
import { NgForm } from '@angular/forms';
import { JobsService } from '../../jobs.service';

@Component({
  selector: 'app-images-detail',
  templateUrl: './images-detail.component.html',
  styleUrls: ['./images-detail.component.css']
})
export class ImagesDetailComponent implements OnInit {
@Input("images") images:Images;
@Input("id") jobId:number; // id of loaded job
  constructor(private jobsService:JobsService) { }
  imageUrl=null;
  @ViewChild('imageUploadForm',{static:false}) imageUploadForm:NgForm;
  ngOnInit(): void {
  }
  onSelectFile(event){
    console.log('event value is ', event.target.value)
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.imageUrl = (<FileReader>event.target).result;
      }
    }
  }
  uploadImage(form:NgForm){
    console.log('form uploaded ', form.value);
    this.jobsService.addImages(this.jobId,this.imageUrl);
    this.imageUploadForm.resetForm();
    this.imageUrl=null;
  }
  deselectImage(){
    this.imageUrl=null;
  }
}
