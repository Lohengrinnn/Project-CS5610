import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  // product: any = {
  //   name: 'Harry Potter II',
  //   type: 'book',
  //   price: 100,
  //   description: 'Harry Potter',
  //   address: '276 Sun Ridge Lane, San Jose, CA',
  //   location: { lat: 45.4115777, lng: -73.01792759999999 },
  // };
  product: any = {
    name: '',
    type: '',
    price: 0,
    description: '',
    address: '',
    location: { lat: 0, lng: 0 },
  };
  currentUser: any;
  image: any;

  constructor(private productService: ProductService,
              private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log(JSON.stringify(file))
      this.image = file;
    }
  }

  create() {
    // console.log("create: " + JSON.stringify(this.product));
    this.productService.createProduct(this.product, this.image).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
    // this.productService.createProduct(this.product);
    // .then(actualProduct => this.router.navigateByUrl("/detail/${actualProduct._id}"));
  }

  update() {
    this.productService.updateProduct(this.product)
      .then(actualProduct => this.router.navigate(['detail']));
  }

  // invoke either create or update function
  save() {
    this.product.owner = this.currentUser._id;
    if (this.product._id){
      this.update();
    } else{
      this.create();
    }
  }

  ngOnInit(): void {
    this.userService.currentUser().then(currentUser => {
      if (currentUser) {
        this.currentUser = currentUser;
        console.log("current user: " + this.currentUser._id)
      } else {
        alert("You should login before publishing goods.");
        this.router.navigate(['login']);
      }
    });

    this.activatedRoute.params.subscribe(params => {
      const productId = params.pid;
      if (productId !== undefined) {
        this.productService.findProductById(productId)
          .then(product => this.product = product);
      }
    });
  }
}
