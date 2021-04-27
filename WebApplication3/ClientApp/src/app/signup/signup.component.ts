import { Component, OnInit } from '@angular/core';
import { User } from './../models/User';
import { DataService } from './../data.service';
import { UserRegistration } from '../shared/models/user.registration.interface';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  ngOnInit(): void {

  }
  hidePassword: boolean = true;
  hideConfirm: boolean = true;

  //inputUName: string = "";
  //inputEmail: string = "";
  //inputPassword: string = "";
  //inputPasswordConfrim: string = "";

  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;

  constructor(private userService: UserService, private router: Router, private _signUpBar: MatSnackBar) { }
  //user: User;
  //ngOnInit() {
  //  this.data.userMessage.subscribe(message => this.user = message);
  //}
  //hide = false;
  //inputUName: string = '';
  //inputPassword: string = '';
  //newU: User;
  //*/

  openSignupBar() {
    let loginBarRef = this._signUpBar.open("User successfully registered.", null, { duration: 10000 });
  }

  signUp({ value, valid }: { value: UserRegistration, valid: boolean }) {
    //this.openSignupBar();
    //this.router.navigate(['/login']);

    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';

    if (valid) {
      this.isRequesting = false;
      this.userService.register(value.email, value.password, value.firstName, value.lastName)
        .subscribe(
          result => {
            console.log(result);
            if (result == null) {
              this.openSignupBar();
              this.router.navigate(['/login'], { queryParams: { brandNew: true, email: value.email } });
            }
          }, errors => console.error(errors));
    }
  }

  openAccountFailBar() {
    let undoBarRef = this._signUpBar.open("One of the fields was invalid", "X", { duration: 10000, });
    undoBarRef.onAction().subscribe(() => {
      this._signUpBar.dismiss();
    });
  }
}
