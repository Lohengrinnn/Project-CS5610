import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router,
              private userService: UserService,
              private appComp: AppComponent) { }

  login = (username, password) => {
    this.userService.login(username, password)
      .then(currentUser => {
        if (currentUser === null) {
          console.log("login failed.");
          alert("login failed.");
        } else {
          this.appComp.ngOnInit();
          this.router.navigate(['profile']);
        }
      })
  }

  ngOnInit(): void {
  }

}
