import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styles: []
})
export class LogoutComponent implements OnInit {

  constructor(private user: UserService, private _logoutBar: MatSnackBar, private router: Router) { }

  openLogoutBar() {
    let loginBarRef = this._logoutBar.open("Successfully logged out.", null, { duration: 10000 });
  }

  ngOnInit() {
    this.user.logout();
    this.openLogoutBar();
    location.reload();
    this.router.navigate(['/']);
  }

}
