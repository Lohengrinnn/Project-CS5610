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
            this.user = currentUser;
            if (this.user.dob)
              this.user.dob = this.user.dob.slice(0, 10);
            // console.log("user info: " + JSON.stringify(this.user));
          }
        } else {
          this.router.navigate(['login']);
        }
      })

    });
  }

  // we should only allow a user to update its own profile
  update() {
    const reDt = /^\d{4}-\d{2}-\d{2}$/
    if (!this.user.dob || !this.user.dob.match(reDt)) {
      alert('date of birth is not valid');
      return;
    }
    const reMail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!this.user.email || !this.user.email.match(reMail)) {
      alert('email:(' + this.user.email + ') not valid');
      return;
    }
    const rePhone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!this.user.phone || !this.user.phone.match(rePhone)) {
      alert('phone:(' + this.user.phone + ') not valid');
      return;
    }
    if (!this.user.address) {
      alert('address is required ');
      return;
    }
    if (!this.user.role) {
      alert('role is required ');
      return;
    }
    // console.log("to update user with: " + JSON.stringify(this.user));
    this.userService.updateUser(this.user)
      .then(status => {
        console.log('update status is ' + status);
        this.router.navigateByUrl(`/profile/${this.user._id}`);
      });
  }

}

