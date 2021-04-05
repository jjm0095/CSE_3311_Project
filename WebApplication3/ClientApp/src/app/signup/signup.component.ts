import { Component, OnInit } from '@angular/core';
import { User } from './../models/User';
import { DataService } from './../data.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {

  inputUName: string = "";
  inputEmail: string = "";
  inputPassword: string = "";
  inputPasswordConfrim: string = "";

  /*constructor(private data: DataService) { }
  user: User;
  ngOnInit() {
    this.data.userMessage.subscribe(message => this.user = message);
  }
  hide = false;
  inputUName: string = '';
  inputPassword: string = '';
  newU: User;
  */
  onSignUp() {
    
  }
}
