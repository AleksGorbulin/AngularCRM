import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { Images } from '../images.model';

@Injectable({providedIn:'root'})
export class ImageLightBoxService{
  constructor(){}
  images:Images[]=[];
  // updateImages = new Subject<Images[]>();
  fetchImages(){
   return this.images;
  }
  getImages(newImages){
    this.images=newImages;
  }
}
