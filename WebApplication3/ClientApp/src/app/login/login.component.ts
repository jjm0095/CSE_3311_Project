import { Component, OnInit } from '@angular/core';
import { User } from './../models/User';
import { DataService } from './../data.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  constructor(private data: DataService, private _dialogBar: MatSnackBar) { }
  user: User;
  ngOnInit() {
    this.data.userMessage.subscribe(message => this.user = message);
  }
  hide = false;
  inputUName: string = '';
  inputPassword: string = '';
  currUserName: string = 'Not Signed in';
  //newU: User;

  onLogin() {
    if (!(this.inputUName == '') && !(this.inputPassword == '') && (this.inputUName == 'Test Username') && (this.inputPassword == 'Test Password')) {
      //this.newU.userName = this.inputUName;
      //this.newU.password_ = this.inputPassword;
      
      this.openDialogBar();
      this.inputUName = '';
      this.inputPassword = '';
      this.user.signedIn = true;
      this.data.UpdateMessage(this.user);
      this.updateCurrUser();
    } else {
      this.openDialogBarF();
      this.updateCurrUser();
    }
  }
  openDialogBar() {
    let undoBarRef = this._dialogBar.open(this.user.userName + " signed in", "X", { duration: 10000, });
    undoBarRef.onAction().subscribe(() => {
      this._dialogBar.dismiss();
    });
  }
  openDialogBarF() {
    let undoBarRef = this._dialogBar.open("sign in failed", "X", { duration: 10000, });
    undoBarRef.onAction().subscribe(() => {
      this._dialogBar.dismiss();
    });
  }

  updateCurrUser() {
    if (this.user.signedIn == true) {
      this.currUserName = this.user.userName;
    } else {
      this.currUserName = 'Not Signed In';
    }
  }

}
