import { Component } from '@angular/core';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'MyPomodoro';
  currUser: User;
  ngOnInit(): void {
    
    this.currUser.email = "";
    this.currUser.signedIn = false;
    this.currUser.password_ = "";
    this.currUser.userName = "";

  }
}
