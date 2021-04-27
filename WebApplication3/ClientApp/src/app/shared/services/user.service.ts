import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import { UserRegistration } from '../models/user.registration.interface';
import { ConfigService } from '../utils/config.service';

import { BaseService } from "./base.service";

import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Local } from 'protractor/built/driverProviders';


@Injectable()

export class UserService extends BaseService {

  baseUrl: string = '';

  get requestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*'
    });

    return { headers };
  }

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;

  constructor(private http: HttpClient, private configService: ConfigService) {
    super();
    this.loggedIn = !!localStorage.getItem('auth_token');
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = configService.getApiURI();
  }

  updateTimer(timer: string, interval: number) {
    let userId = this.current_user;
    let body = JSON.stringify({"timer": timer, "interval": interval, "userId": userId });
    return this.http.post<any>(this.baseUrl + '/accounts/timer', body, this.requestHeaders);
  }

  register(email: string, password: string, firstName: string, lastName: string): Observable<UserRegistration> {
    let body = JSON.stringify({email, "password": password, "firstName": firstName, "lastName": lastName});
    return this.http.post<UserRegistration>(this.baseUrl + "/accounts", body, this.requestHeaders);
  };

  login(userName, password) {
    return this.http.post<any>(this.baseUrl + '/auth/login', JSON.stringify({ userName, password }), this.requestHeaders)
    .pipe(map(result => {
      localStorage.setItem('auth_token', result.auth_token);
      localStorage.setItem('current_user', result.id);
      localStorage.setItem('pomodoro', result.pomodoro);
      localStorage.setItem('shortBreak', result.shortBreak);
      localStorage.setItem('longBreak', result.longBreak);
      this.loggedIn = true;
      this._authNavStatusSource.next(true);
      return true;
    }));
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  get pomodoro(): number {
    return parseInt(localStorage.getItem('pomodoro'));
  }

  get shortBreak(): number {
    return parseInt(localStorage.getItem('shortBreak'));
  }

  get longBreak(): number {
    return parseInt(localStorage.getItem('longBreak'));
  }

  get current_user(): string {
    return localStorage.getItem('current_user');
  }


  isLoggedIn() {
    return this.loggedIn;
  }
}
