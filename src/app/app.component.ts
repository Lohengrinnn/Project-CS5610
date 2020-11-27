import {Component} from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Flea Market';
  constructor(private userService: UserService,
              private router: Router) {
  }
  logout = () => this.userService.logout()
    .then(status => this.router.navigate(['']))
}
