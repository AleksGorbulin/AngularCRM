import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';

@Injectable({providedIn:'root'})
export class ImageLightBoxService{
  constructor(){}
  images:[];
  fetchImages():Observable<any>{
    return of(this.images)
  }
  getImages(newImages){
    this.images=newImages;
  }
}
