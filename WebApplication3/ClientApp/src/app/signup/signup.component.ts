import { Component, OnInit } from '@angular/core';
import { User } from './../models/User';
import { DataService } from './../data.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  constructor(private data: DataService, private _dialogBar: MatSnackBar) { }
  ngOnInit(): void {

  }

  newU: User;

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
    /*
    if (!(this.inputEmail == '') && !(this.inputPassword == '') && (this.inputPassword == this.inputPasswordConfrim) && !(this.inputUName == '')) {
      this.newU.email = this.inputEmail;
      this.newU.userName = this.inputUName;
      this.newU.password_ = this.inputPassword;

      this.openAccountSuccessBar()
    } else if (this.inputPassword != this.inputPasswordConfrim) {
      this.openPasswordMisMatchBar()
    } else {
      this.openAccountFailBar()
    }
    */
  }
  /*
  openAccountSuccessBar() {
    let undoBarRef = this._dialogBar.open("Account \""+ this.inputUName +"\" was created", "X", { duration: 10000, });
    undoBarRef.onAction().subscribe(() => {
      this._dialogBar.dismiss();
    });
  }

  openPasswordMisMatchBar() {
    let undoBarRef = this._dialogBar.open("Please confrim your password", "X", { duration: 10000, });
    undoBarRef.onAction().subscribe(() => {
      this._dialogBar.dismiss();
    });
  }

  openAccountFailBar() {
    let undoBarRef = this._dialogBar.open("One of the fields was invalid", "X", { duration: 10000, });
    undoBarRef.onAction().subscribe(() => {
      this._dialogBar.dismiss();
    });
  }
  */
}
