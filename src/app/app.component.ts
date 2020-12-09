import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Flea Market';
  anonymous : any = {_id: '', username: 'anonymous'};
  user : any = this.anonymous;

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userService.currentUser().then(currentUser => {
      if (currentUser)
        this.user = currentUser;
      else
        this.user = this.anonymous;
      }
    )
  }

  btnClick(searchField){
    console.log("btnClick: " + searchField);
    this.router.navigateByUrl('/search/' + searchField);
  }

  logout = () => this.userService.logout()
    .then(status => {
      this.ngOnInit();
      this.router.navigate([''])
    })
}
