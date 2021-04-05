import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { User } from './models/User';


@Injectable({providedIn: 'root'})
export class DataService {

  message: User = {
    email : "test.user@email.com",
    userName : "Test Username",
    signedIn : false,
    password_: "Test Password",
    tasks: ["signed in test task 1", "signed in test task 2"],
    completed: ["signed in completed test task"],
    pomoTime: 1800,
    shortTime: 600,
    longTime: 1200,

    
  };
  private messageSource = new BehaviorSubject<User>(this.message);
  userMessage = this.messageSource.asObservable();


  UpdateMessage(message: User) {
    this.messageSource.next(message);
  }

  constructor() {}
}
