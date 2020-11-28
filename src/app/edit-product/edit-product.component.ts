import { Component, OnInit } from '@angular/core';
import {Product} from "../../classes/product";
import {ProductService} from "../../services/product.service";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product: any = {
    name: 'Harry Potter II',
    type: 'book',
    price: 100,
    description: 'Harry Potter',
    address: '276 Sun Ridge Lane, San Jose, CA',
    location: { lat: 45.4115777, lng: -73.01792759999999 },
  }

  constructor(private productService: ProductService,
              private userService: UserService,
              private router: Router) { }

  save() {
    this.productService.createProduct(this.product)
      .then(actualProduct => this.router.navigate(['detail']));
  }

  ngOnInit(): void {
    this.userService.currentUser().then(currentUser => {
      if (currentUser) {
        this.product.owner = currentUser._id;
      } else {
        alert("You should login before publishing goods.")
        this.router.navigate(['login'])
      }
    })
  }

}
