import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ImageLightBoxService } from './image-lightbox.service';
import { Images } from '../images.model';

@Component({
  selector: 'app-image-lightbox',
  templateUrl: './image-lightbox.component.html',
  styleUrls: ['./image-lightbox.component.css']
})
export class ImageLightBoxComponent implements OnInit {
 @Input("images") images:Images[]=[];
  slideIndex = 0;
  subscription;
  constructor(private imageLightBoxService:ImageLightBoxService) { }

  ngOnInit(): void {
    this.loadImages();
    this.showSlides(1);
  }
  loadImages(){
    return this.images;
//  this.images= this.imageLightBoxService.fetchImages();
  }
  openModal() {
    document.getElementById('imgModal').style.display = "block";
   }
   closeModal() {
    document.getElementById('imgModal').style.display = "none";
   }
   plusSlides(n) {
    this.showSlides(this.slideIndex += n);
   }
   currentSlide(n) {
    this.showSlides(this.slideIndex = n);
   }
   showSlides(slideIndex);

   showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("img-slides") as HTMLCollectionOf < HTMLElement > ;
    const dots = document.getElementsByClassName("images") as HTMLCollectionOf < HTMLElement > ;
    if (n > slides.length) {
     this.slideIndex = 1
    }
    if (n < 1) {
     this.slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
     slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex - 1].style.display = "block";
    if (dots && dots.length > 0) {
     dots[this.slideIndex - 1].className += " active";
    }
   }

}
