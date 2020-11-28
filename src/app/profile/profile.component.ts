import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: number = -1;
  user: any = {_id: '', username: '', password: '', email: '', address: ''}

  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      const uid = params.uid;
      if (typeof uid !== 'undefined') {
        this.userId = uid;
      } else {
        this.userService.currentUser().then(currentUser => {
          if (currentUser) {
            this.user = currentUser
          } else {
            this.router.navigate(['login'])
          }
        })
      }
    });
  }
}
