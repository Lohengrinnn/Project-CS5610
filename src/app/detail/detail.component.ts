import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  product: any = {
    // name: '',
    // base64: '',
    // type: '',
    // price: 0,
    // description: '',
    // address: '',
    // location: {lat: 0, lng: 0},
    // owner: ''
  };
  currentUser: any = {
  };
  productOwner = false;
  anonymousUser = false;


  deleteProduct = (productId) => {
    this.productService.deleteProduct(productId)
      .then(status => console.log(status));
  }

  constructor(private userService: UserService,
              private productService: ProductService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.userService.currentUser().then(currentUser => {
      // check if user is log in and product belong to the user
      this.currentUser = currentUser;
      if (this.currentUser && this.currentUser._id === this.product.owner) {
        this.productOwner = true;
      }
      // user not logged in
      if (this.currentUser === null){
        this.anonymousUser = true;
      }
    });

    this.activatedRoute.params.subscribe(params => {
      const productId = params.pid;
      if (productId !== undefined) {
        this.productService.findProductById(productId)
          .then(product => {
            this.product = product;
            this.product = {...this.product, ...{base64: `data:${product.images[0].contentType};base64,${product.image}`}};
          });
      }
    });
  }
}
