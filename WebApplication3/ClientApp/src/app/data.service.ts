import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from './models/User';


@Injectable({providedIn: 'root'})
export class DataService {

  message: User = {
    email : "default email",
    userName : "Default Username",
    isdefault : true,
    password_ : "Default Password",
  };
  private messageSource = new BehaviorSubject<User>(this.message);
  userMessage = this.messageSource.asObservable();

  //user$: Observable<User> = this.messageUser.asObservable();

  UpdateMessage(message: User) {
    this.messageSource.next(message);
  }

  constructor() {}
}
