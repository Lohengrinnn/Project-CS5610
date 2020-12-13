import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Product} from '../../classes/product';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // this is the user id of the profile page
  profileUserId: String = '';
  // the user of  this profile page
  profileUser: any = {_id: '', username: '', password: '', email: '', address: '', phone: '', role: '', dob: '', following: []};
  currentUser: any = {_id: ''};
  products:Product[] = [];
  follow: String = 'none';

  constructor(private router: Router,
              private productService: ProductService,
              private activeRoute: ActivatedRoute,
              private userService: UserService) { }

  profileOwner = () => this.currentUser._id !== '' && this.currentUser._id !== this.profileUserId;

  fetchProduct = () => {
    this.productService.getProducts()
      .then(products => {
        // console.log("profile id is  " + this.profileUserId);
        this.products = products.filter(product => product.owner._id === this.profileUserId);
      });
  }

  updateFollow = () => {
    if (this.profileUserId !== ''
      && this.currentUser._id !== ''
      && this.currentUser._id !== this.profileUserId) {
      if (this.currentUser.following.findIndex(uid => uid === this.profileUserId) >= 0) {
        this.follow = 'true';
      } else {
        this.follow = 'false';
      }
    } else {
      this.follow = 'none';
    }
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      const uid = params.uid;
      if (typeof uid !== 'undefined') {
        this.profileUserId = uid;
        this.userService.findUserById(this.profileUserId).then(user => {
          this.profileUser = user;
        });
        this.fetchProduct();
        this.updateFollow();
      }

      this.userService.currentUser().then(currentUser => {
        if (currentUser) {
          this.currentUser = currentUser;
          if (typeof uid === 'undefined') {
            this.profileUserId = this.currentUser._id;
            this.profileUser = this.currentUser
            this.fetchProduct();
          }
          this.updateFollow();
        }
      });
    });
  }

  // we should only allow a user to update its own profile
  update() {
    this.router.navigateByUrl('/edit_profile/' + this.profileUserId);
  }

  addToFavorites() {
    if (this.follow == 'false')
      this.currentUser.following.push(this.profileUserId);
    else if (this.follow == 'true')
      this.currentUser.following = this.currentUser.following.filter(uid => uid != this.profileUserId);
    // currentUser = { ...currentUser, followings: followings};
    this.userService.updateUser(this.currentUser).then(resp => {
      console.log("update user success")});
    this.userService.login(this.currentUser.username, this.currentUser.password);
    this.updateFollow();
  }

}
