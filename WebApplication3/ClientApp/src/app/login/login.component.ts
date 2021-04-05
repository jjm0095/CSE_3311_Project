import { Component, OnInit } from '@angular/core';
import { User } from './../models/User';
import { DataService } from './../data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  constructor(private data: DataService) { }
  user: User;
  ngOnInit() {
    this.data.userMessage.subscribe(message => this.user = message);
  }
  hide = false;
  inputUName: string = '';
  inputPassword: string = '';
  newU: User;

  onLogin() {
    if (!(this.inputUName == '') && !(this.inputPassword == '')) {
    this.newU.userName = this.inputUName;
    this.newU.password_ = this.inputPassword; 
    }
  }
}
