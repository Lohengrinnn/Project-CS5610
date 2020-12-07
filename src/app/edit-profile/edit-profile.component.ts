import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  // this is the user id of the profile page
  profileId: undefined;
  // the user who is looking at this profile page
  user: any = {_id: '', username: '', password: '', email: '', address: '', phone: '', role: '', dob: ''};
  profileOwner = false;
  currentUserId: undefined;

  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      const uid = params.uid;
      if (typeof uid !== 'undefined') {
        this.profileId = uid;
      }

      this.userService.currentUser().then(currentUser => {
        if (currentUser) {
          this.currentUserId = currentUser._id;
          if (this.currentUserId === this.profileId) {
            this.profileOwner = true;
            console.log("productOwner is true");
            this.user = currentUser;
          }
        } else {
          this.router.navigate(['login']);
        }
      })

    });
  }

  // we should only allow a user to update its own profile
  update() {
    console.log("to update user with: " + JSON.stringify(this.user));
    this.userService.updateUser(this.user)
      .then(status => console.log('update status is ' + status));
  }

}

