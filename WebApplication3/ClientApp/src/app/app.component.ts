import { Component } from '@angular/core';
import { User } from './models/User';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private user: UserService) { }
  title = 'MyPomodoro';
  loggedIn = false;
/*  currUser: User;*/
  ngOnInit(): void {
    this.loggedIn = this.user.isLoggedIn();
    //this.currUser.email = "";
    //this.currUser.signedIn = false;
    //this.currUser.password_ = "";
    //this.currUser.userName = "";

  }
}
