import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {RemarkService} from "../../services/remark.service";

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
    owner: {_id: "", username: ""}
  };
  currentUser: any = {_id: "", role: ""};
  remarks : Array<any> = []
  selectedRemark : any;

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

  constructor(private userService: UserService,
              private productService: ProductService,
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
            this.product = {...this.product, ...{base64: `data:${product.images[0].contentType};base64,${product.image}`}};
            this.findRemarks(productId)
          });
      }
    });
  }
}
