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
  profileId: undefined;
  // the user of  this profile page
  user: any = {_id: '', username: '', password: '', email: '', address: '', phone: '', role: '', dob: '', following: []};
  currentUserId: undefined;
  profileOwner = false;
  products:Product[] = [];

  constructor(private router: Router,
              private productService: ProductService,
              private activeRoute: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      const uid = params.uid;
      if (typeof uid !== 'undefined') {
        this.profileId = uid;
        console.log("profile id is: " + this.profileId);
      }
      console.log("Fetching current user");
      this.userService.currentUser().then(currentUser => {
        if (currentUser) {
          console.log("currentUser is " + JSON.stringify(currentUser));
          this.currentUserId = currentUser._id;
          if (!this.profileId) {
            this.profileId = currentUser._id;
            this.user = currentUser;
          }
        } else {
          this.router.navigate(['login']);
        }
        if (this.currentUserId === this.profileId) {
          this.profileOwner = true;
          console.log("productOwner is true");
        }

        this.productService.getProducts()
          .then(products => {
            console.log("profile id is  " + this.profileId);
            //console.log("Products: " + JSON.stringify(products));
            this.products = products.filter(product => product.owner._id === this.profileId);
          });

        if (!this.profileOwner && this.profileId) {
          console.log("fetch profile as the user is not current user");
          this.userService.findUserById(this.profileId).then(user => {
            this.user = user;
          });
        }

      });



    });


  }

  // we should only allow a user to update its own profile
  update() {
    this.router.navigateByUrl('/edit_profile/' + this.profileId);
  }

  addToFavorites() {
    console.log("aaa");

    this.userService.currentUser().then(currentUser => {
      if (currentUser) {
        console.log("currentUser is " + JSON.stringify(currentUser));
        this.currentUserId = currentUser._id;
        currentUser.following.push(this.profileId);

        // const followings = [];
        // followings.push(this.profileId);
        // currentUser = { ...currentUser, followings: followings};
        this.userService.updateUser(currentUser).then( resp => {
            console.log("update user success");
          }
        );

      } else {
        this.router.navigate(['login']);
      }

    });

  }

}
