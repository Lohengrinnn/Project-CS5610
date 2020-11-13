import {AfterContentInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {} from 'googlemaps';
import {Product} from "../class/product";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('map') public mapElement: ElementRef;
  map: google.maps.Map;
  products: Product[] = [
    { id: 1,
      name: "Harry Potter I",
      type: "book",
      price: 100,
      description: "Harry Potter",
      address: "276 Sun Ridge Lane, San Jose, CA",
      owner: "You know who",
      image: null
    },
    { id: 2,
      name: "Harry Potter II",
      type: "book",
      price: 100,
      description: "Harry Potter",
      address: "276 Sun Ridge Lane, San Jose, CA",
      owner: "You know who",
      image: null
    },
    { id: 3,
      name: "Harry Potter III",
      type: "book",
      price: 100,
      description: "Harry Potter",
      address: "276 Sun Ridge Lane, San Jose, CA",
      owner: "You know who",
      image: null
    },
    { id: 4,
      name: "Harry Potter IV",
      type: "book",
      price: 100,
      description: "Harry Potter",
      address: "276 Sun Ridge Lane, San Jose, CA",
      owner: "You know who",
      image: null
    },
    ]
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.initGoogleMap();
  }

  initGoogleMap() {
    if(window.google){
      const mapProperties = {
        center: new google.maps.LatLng(37.33, -121.92),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    } else {
      setTimeout(() => {
        this.initGoogleMap();
      }, 2000);
    }
  }
}
