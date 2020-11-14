import {AfterContentInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {} from 'googlemaps';
import {Product} from "../../classes/product";
import {MapService} from "../../services/map.service";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('map') public mapElement: ElementRef;
  map: google.maps.Map;
  products:Product[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts()
      .then(products => this.products = products)
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
