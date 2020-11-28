import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {} from 'googlemaps';
import {Product} from "../../classes/product";
import {MapService} from "../../services/map.service";
import {ProductService} from "../../services/product.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // @ViewChild('map') public mapElement: ElementRef;
  // map: google.maps.Map;
  products:Product[] = [];
  // currentUser: any;

  constructor(private productService: ProductService,
              private mapService: MapService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.productService.getProducts()
      .then(products => this.products = products)
    // this.userService.currentUser().then(currentUser => {
    //   console.log(currentUser);
    //   if (currentUser) {
    //     this.currentUser = currentUser
    //   }
    // })
  }

  ngAfterViewInit() {
    // this.initGoogleMap();
  }

  // initGoogleMap() {
  //   this.mapService.getGoogleMap().then(() => {
  //     const mapProperties = {
  //       center: new google.maps.LatLng(37.33, -121.92),
  //       zoom: 10,
  //       mapTypeId: google.maps.MapTypeId.ROADMAP
  //     };
  //     this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
  //   });
  // }
}
