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
  products: Array<any> = [];
  published: Array<any> = [];
  userRole: String = "";
  currentUserId: String = "";
  following: [];
  followedUsers: Array<any> = [];

  constructor(private productService: ProductService,
              private mapService: MapService,
              private userService: UserService) { }

  updatePublished() {
    if (this.userRole == "SELLER") {
      this.published = this.products.filter(product => product.owner._id === this.currentUserId);
    }
  }

  ngOnInit(): void {
    this.userService.currentUser().then(currentUser => {
      if (currentUser) {
        this.userRole = currentUser.role;
        this.currentUserId = currentUser._id;
        this.updatePublished();
        this.userService.findUserById(currentUser._id).then(user => {
          this.following = user.following;
          console.log("follow:" + this.following);

          this.following.map(followId => {

            this.userService.findUserById(followId).then(follow => {
              this.followedUsers.push(follow);
              console.log("follow user:" + JSON.stringify(follow));
            });

          });

        });


      }
    });
    this.productService.getProducts()
      .then(products => {
        // console.log(JSON.stringify(products))
        this.products = products;
        this.updatePublished();
      })
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
