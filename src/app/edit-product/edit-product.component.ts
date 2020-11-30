import { Component, OnInit } from '@angular/core';
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
    name: 'Harry Potter I',
    type: 'book',
    price: 100,
    description: 'Harry Potter',
    address: '11203 Sun Spike Road, South Lake Tahoe, CA',
    location: { lat: 38.9115777, lng: -119.91792759999999 },
  }
  image: any;

  constructor(private productService: ProductService,
              private userService: UserService,
              private router: Router) { }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(JSON.stringify(file))
      this.image = file;
    }
  }
  save() {
    this.productService.createProductImg(this.product, this.image)
      .subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
    // console.log(JSON.stringify(this.product))
    // this.productService.createProduct(this.product)
    //   .then(actualProduct => this.router.navigateByUrl("/detail/${actualProduct._id}"));
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
