import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from './../models/User';
import { DataService } from './../data.service';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { Credentials } from '../shared/models/credentials.interface';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  //constructor(private data: DataService, private _dialogBar: MatSnackBar) { }
  //user: User;
  //ngOnInit() {
  //  this.data.userMessage.subscribe(message => this.user = message);
  //}
  //hide = true;
  //inputUName: string = '';
  //inputPassword: string = '';
  //currUserName: string = 'Not Signed in';
  ////newU: User;

  //onLogin() {
  //  if (!(this.inputUName == '') && !(this.inputPassword == '') && (this.inputUName == 'Test Username') && (this.inputPassword == 'Test Password')) {
  //    //this.newU.userName = this.inputUName;
  //    //this.newU.password_ = this.inputPassword;
      
  //    this.openDialogBar();
  //    this.inputUName = '';
  //    this.inputPassword = '';
  //    this.user.signedIn = true;
  //    this.data.UpdateMessage(this.user);
  //    this.updateCurrUser();
  //  } else {
  //    this.openDialogBarF();
  //    this.updateCurrUser();
  //  }
  //}
  //openDialogBar() {
  //  let undoBarRef = this._dialogBar.open(this.user.userName + " signed in", "X", { duration: 10000, });
  //  undoBarRef.onAction().subscribe(() => {
  //    this._dialogBar.dismiss();
  //  });
  //}
  //openDialogBarF() {
  //  let undoBarRef = this._dialogBar.open("sign in failed", "X", { duration: 10000, });
  //  undoBarRef.onAction().subscribe(() => {
  //    this._dialogBar.dismiss();
  //  });
  //}

  //updateCurrUser() {
  //  if (this.user.signedIn == true) {
  //    this.currUserName = this.user.userName;
  //  } else {
  //    this.currUserName = 'Not Signed In';
  //  }
  //}
  private subscription: Subscription;
  hide = true;
  brandNew: boolean;
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  credentials: Credentials = { email: '', password: '' };

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute, private _loginBar: MatSnackBar) { }

  ngOnInit() {

    // subscribe to router event
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
        this.brandNew = param['brandNew'];
        this.credentials.email = param['email'];
      });
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }

  openLoginBar() {
    let loginBarRef = this._loginBar.open("Successfully logged in.", null, {duration: 10000});
  }

  login({ value, valid }: { value: Credentials, valid: boolean }) {
    //this.openLoginBar();
    //this.router.navigate(['/']);
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    if (valid) {
      this.userService.login(value.email, value.password)
        .subscribe(
          result => {
            if (result) {
              this.openLoginBar();
              this.router.navigate(['/']);
            }
          },
          error => console.log(error));
    }
  }
}
