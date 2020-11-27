import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: String = '';
  password: String = '';
  password_verify: string = '';
  constructor(private router: Router,
              private usersService: UserService) { }

  register = () => {
    if (this.password !== this.password_verify) {
      alert("<password> is different from <verify password>")
    } else {
      this.usersService.register(this.username, this.password)
        .then(actualUser => this.router.navigate(['profile']));
    }
  }

  ngOnInit(): void {
  }

}
