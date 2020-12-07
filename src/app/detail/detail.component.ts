import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ProductService} from '../../services/product.service';

import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  product: any = {
    _id: '',
    name: '',
    type: '',
    price: 0,
    description: '',
    address: '',
    location: {lat: 0, lng: 0},
    owner: ''
  };
  currentUser: any;
  productOwner = false;

  constructor(private userService: UserService,
              private productService: ProductService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.userService.currentUser().then(currentUser => {
      // check if user is log in and product belong to the user
      this.currentUser = currentUser;
      console.log("currentUser id is: " + this.currentUser._id);
      if (currentUser && currentUser._id === this.product.owner) {
        this.productOwner = true;
        console.log("productOwner is: " + this.productOwner);
      }
    });

    this.activatedRoute.params.subscribe(params => {
      const productId = params.pid;
      if (productId !== undefined) {
        this.productService.findProductById(productId)
          .then(product => {
            this.product = product;
            console.log("product is: " + JSON.stringify(product));
            if (this.currentUser && this.currentUser._id === this.product.owner) {
              this.productOwner = true;
            }
          });
      }
    });
  }

  editClicked(){
    this.router.navigateByUrl('/edit/' + this.product._id);
  }

}
