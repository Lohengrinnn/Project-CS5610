import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RemarkService} from '../../services/remark.service';

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
    status: 'AVAILABLE',
    owner: {_id: "", username: ""}
  };
  currentUser: any = {_id: "", role: ""};
  remarks : Array<any> = []
  selectedRemark : any;
  buyerName: undefined;

  productOwner = () => this.currentUser._id === this.product.owner._id

  selectRemark = (remark) => this.selectedRemark = remark;

  addRemark = () => {
    let newRemark = {
      product: this.product._id,
      author: { _id: this.currentUser._id, username: this.currentUser.username},
      editing: true
    };
    this.remarks.push(newRemark);
  }

  editRemark = (remark) => {
    remark.editing = true;
  }

  saveRemark = (remark) => {
    remark.editing = false;
    if (remark._id) {
      this.remarkService.updateRemark(remark);
    } else {
      this.remarkService.createRemark(remark).then(actualRemark => {
        remark._id = actualRemark._id
        // const index = this.remarks.findIndex((r => r.id == null));
        // this.remarks[index]._id = actualRemark._id
      });
    }
  }

  deleteRemark = (remark) => {
    if (remark._id == null) {
      this.remarks = this.remarks.filter(r => r._id != null)
    } else {
      this.remarkService.deleteRemark(remark._id)
        .then(status => this.remarks = this.remarks.filter(r => r._id != remark._id))
    }
  }

  findRemarks = (productId) => this.remarkService.findRemarksByProductId(productId)
    .then(remarks => {
      this.remarks = remarks;
    })

  deleteProduct = (productId) => {
    this.productService.deleteProduct(productId)
      .then(status => console.log(status));
  }

  requestPurchase(){
    console.log('requestPurchase for '+ this.product._id);

    this.productService.updateProduct({
      _id: this.product._id,
      status: 'PENDING',
      boughtBy: this.currentUser._id
    }).then(status => {
      console.log('purchase requested');
      this.ngOnInit();
      //this.router.navigateByUrl(`/detail/${this.product._id}`);
    });
  }

  confirmPurchase(){
    console.log('confirmPurchase for ' + this.product._id);


    this.productService.updateProduct({
      _id: this.product._id,
      status: 'SOLD'
    }).then(status => {
      console.log('sold confirmed');
      this.ngOnInit();
    });
  }

  constructor(private userService: UserService,
              private productService: ProductService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private remarkService: RemarkService) {}


  ngOnInit(): void {
    this.userService.currentUser().then(currentUser => {
      // check if user is log in and product belong to the user
      if (currentUser) {
        this.currentUser = currentUser;
      }
    });

    this.activatedRoute.params.subscribe(params => {
      const productId = params.pid;
      if (productId !== undefined) {
        this.productService.findProductById(productId)
          .then(product => {
            this.product = product;
            console.log("load product: " + JSON.stringify(product.boughtBy));
            if (!this.product.status) {
              this.product.status = 'AVAILABLE';
            }

            if (this.product.status === 'SOLD' && this.product.boughtBy) {
              console.log("find buyer name for sold product");
              this.userService.findUserById(this.product.boughtBy).then(user => {
                this.buyerName = user.username;
                console.log("find buyer name for sold product 2" + JSON.stringify(user));
              });
            }

            this.product = {...this.product, ...{base64: `data:${product.images[0].contentType};base64,${product.image}`}};
            this.findRemarks(productId)
          });
      }
    });
  }
}
