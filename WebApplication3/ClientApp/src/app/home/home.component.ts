import { Component, OnInit } from '@angular/core';
import { PortalModule } from '@angular/cdk/portal';
import { User } from './../models/User';
import { DataService } from './../data.service';
import { UserService } from '../shared/services/user.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})


export class HomeComponent implements OnInit {
  
  constructor(private data: DataService, private user: UserService, private _configBar: MatSnackBar) { }
/* user: User;*/
  //userIntervals = {
  //  pomodoro: 1500,
  //  shortBreak: 300,
  //  longBreak: 900,
  //}

  intervals = {
    pomodoro: 1500,
    shortBreak: 300,
    longBreak: 900,
  };
  //starts = {
  //  pomodoro: 1500,
  //  shortBreak: 300,
  //  longBreak: 900,
  //};
  ngOnInit(): void {
    if (this.user.isLoggedIn()) {
      this.intervals.pomodoro = this.user.pomodoro;
      this.pomodoroTimer.startTimeSeconds = this.intervals.pomodoro;
      this.pomodoroTimer.timeSeconds = this.intervals.pomodoro;
      this.pomodoroTimer.startTimeString = this.secondsToString(this.intervals.pomodoro);
      this.pomodoroTimer.timeString = this.secondsToString(this.intervals.pomodoro);

      this.intervals.shortBreak = this.user.shortBreak;
      this.shortBreakTimer.startTimeSeconds = this.user.shortBreak;
      this.shortBreakTimer.timeSeconds = this.user.shortBreak;
      this.shortBreakTimer.startTimeString = this.secondsToString(this.intervals.shortBreak);
      this.shortBreakTimer.timeString = this.secondsToString(this.intervals.shortBreak);

      this.intervals.longBreak = this.user.longBreak;
      this.longBreakTimer.startTimeSeconds = this.user.longBreak;
      this.longBreakTimer.timeSeconds = this.user.longBreak;
      this.longBreakTimer.startTimeString = this.secondsToString(this.intervals.longBreak);
      this.longBreakTimer.timeString = this.secondsToString(this.intervals.longBreak);

      this.PomodoroMinutes= this.secondsToDate(this.intervals.pomodoro).getMinutes();
      this.PomodoroSeconds = this.secondsToDate(this.intervals.pomodoro).getSeconds();

      this.ShortBreakMinutes = this.secondsToDate(this.intervals.shortBreak).getMinutes();
      this.ShortBreakSeconds = this.secondsToDate(this.intervals.shortBreak).getSeconds();

      this.LongBreakMinutes = this.secondsToDate(this.intervals.longBreak).getMinutes();
      this.LongBreakSeconds = this.secondsToDate(this.intervals.longBreak).getSeconds();
    }
    //this.data.userMessage.subscribe(message => this.user = message);
    //if (this.user.signedIn == true) {
    //  this.userConfigTimers()
    //}
  }
  
  openConfigBar(timer: string) {
    let loginBarRef = this._configBar.open(timer + " timer successfullly updated.", null, { duration: 10000 });
  }

  secondsToString(value: number): string {
    var date = new Date(0);
    date.setSeconds(value);
    var timeString = date.toISOString().substr(14, 5);
    return timeString;
  }

  secondsToDate(value: number): Date {
    var date = new Date(0);
    date.setSeconds(value);
    return date;
  }

  PomodoroMinutes: number = this.secondsToDate(this.intervals.pomodoro).getMinutes();
  PomodoroSeconds: number = this.secondsToDate(this.intervals.pomodoro).getSeconds();

  ShortBreakMinutes: number = this.secondsToDate(this.intervals.shortBreak).getMinutes();
  ShortBreakSeconds: number = this.secondsToDate(this.intervals.shortBreak).getSeconds();

  LongBreakMinutes: number = this.secondsToDate(this.intervals.longBreak).getMinutes();
  LongBreakSeconds: number = this.secondsToDate(this.intervals.longBreak).getSeconds();

  apps = {
    todo: "todo",
    break: "break", // Break suggestions
    sounds: "sounds", // Calming sounds
    breathe: "breathe" // Breathing exercises
  }

  currentApp = this.apps.todo;

  pomodoroTimer = {
    
    timeSeconds: this.intervals.pomodoro,
    timeString: this.secondsToString(this.intervals.pomodoro),
    buttonText: "Start",
    timerId: null,
    paused: true,
    iconClass: "glyphicon glyphicon-play",
    startTimeSeconds: this.intervals.pomodoro,
    startTimeString: this.secondsToString(this.intervals.pomodoro)
  };

  shortBreakTimer = {
    timeSeconds: this.intervals.shortBreak,
    timeString: this.secondsToString(this.intervals.shortBreak),
    buttonText: "Start",
    timerId: null,
    paused: true,
    iconClass: "glyphicon glyphicon-play",
    startTimeSeconds: this.intervals.shortBreak,
    startTimeString: this.secondsToString(this.intervals.shortBreak)
  };

  longBreakTimer = {
    timeSeconds: this.intervals.longBreak,
    timeString: this.secondsToString(this.intervals.longBreak),
    buttonText: "Start",
    timerId: null,
    paused: true,
    iconClass: "glyphicon glyphicon-play",
    startTimeSeconds: this.intervals.longBreak,
    startTimeString: this.secondsToString(this.intervals.longBreak)
  }

  timer: number = 90;
  pause: boolean = false;
 

  countdown() {
    
      let intervalID = setInterval(() => {
        if (!this.pause) {
          this.timer = this.timer - 1;
        }
        if (this.timer == 0) clearInterval(intervalID)
      }, 1000)

  }
  pauseCountdown() {
    if (this.pause == false) {
      this.pause = true;
    }
  }

  playCountdown(){
    if(this.pause == true) {
      this.pause = false;
    }
  }


  getButtonText(value: boolean): string {
    return value ? "Start" : "Pause";
  }

  playAlert() {
    let audio = new Audio();
    audio.src = "../../../assets/audio/alert.mp3";
    audio.load();
    audio.play();
  }

  onPomodoroButton() {
    // Reset the timer if time has reached 0
    if (!this.pomodoroTimer.timeSeconds) {
      if (this.pomodoroTimer.timerId) {
        clearInterval(this.pomodoroTimer.timerId);
        this.pomodoroTimer.timerId = null;
      }
      this.pomodoroTimer.timeSeconds = this.intervals.pomodoro;
      this.loopPomodoro();
    }
    else {
      // Start timer (first time)
      if (!this.pomodoroTimer.timerId) {
        this.pomodoroTimer.paused = false;
        this.pomodoroTimer.buttonText = this.getButtonText(this.pomodoroTimer.paused);
        this.loopPomodoro();
      }
      else {
        // Pause/Resume the timer
        this.pomodoroTimer.paused = !this.pomodoroTimer.paused;
        this.pomodoroTimer.buttonText = this.getButtonText(this.pomodoroTimer.paused);
      }
    }
  }

  loopPomodoro() {
    this.pomodoroTimer.timerId = setInterval(() => {
      if (0 >= this.pomodoroTimer.timeSeconds) {
        this.playAlert();
        if (this.pomodoroTimer.timerId) {
          clearInterval(this.pomodoroTimer.timerId);
          this.pomodoroTimer.timerId = null;
        }
        return;
      }
      if (!this.pomodoroTimer.paused) {
        this.pomodoroTimer.timeSeconds--;
        this.pomodoroTimer.timeString = this.secondsToString(this.pomodoroTimer.timeSeconds);
      }
    }, 1000);
  }

  onShortBreakButton() {
    // Reset the timer if time has reached 0
    if (!this.shortBreakTimer.timeSeconds) {
      if (this.shortBreakTimer.timerId) {
        clearInterval(this.shortBreakTimer.timerId);
        this.shortBreakTimer.timerId = null;
      }
      this.shortBreakTimer.timeSeconds = this.intervals.shortBreak;
      this.loopShortBreak();
    }
    else {
      // Start timer (first time)
      if (!this.shortBreakTimer.timerId) {
        this.shortBreakTimer.paused = false;
        this.shortBreakTimer.buttonText = this.getButtonText(this.shortBreakTimer.paused);
        this.loopShortBreak();
      }
      else {
        // Pause/Resume the timer
        this.shortBreakTimer.paused = !this.shortBreakTimer.paused;
        this.shortBreakTimer.buttonText = this.getButtonText(this.shortBreakTimer.paused);
      }
    }
  }

  loopShortBreak() {
    this.shortBreakTimer.timerId = setInterval(() => {
      if (0 >= this.shortBreakTimer.timeSeconds) {
        this.playAlert();
        if (this.shortBreakTimer.timerId) {
          clearInterval(this.shortBreakTimer.timerId);
          this.shortBreakTimer.timerId = null;
        }
        return;
      }
      if (!this.shortBreakTimer.paused) {
        this.shortBreakTimer.timeSeconds--;
        this.shortBreakTimer.timeString = this.secondsToString(this.shortBreakTimer.timeSeconds);
      }
    }, 1000);
  }

  onLongBreakButton() {
    // Reset the timer if time has reached 0
    if (!this.longBreakTimer.timeSeconds) {
      if (this.longBreakTimer.timerId) {
        clearInterval(this.longBreakTimer.timerId);
        this.longBreakTimer.timerId = null;
      }
      this.longBreakTimer.timeSeconds = this.intervals.longBreak;
      this.loopLongBreak();
    }
    else {
      // Start timer (first time)
      if (!this.longBreakTimer.timerId) {
        this.longBreakTimer.paused = false;
        this.longBreakTimer.buttonText = this.getButtonText(this.longBreakTimer.paused);
        this.loopLongBreak();
      }
      else {
        // Pause/Resume the timer
        this.longBreakTimer.paused = !this.longBreakTimer.paused;
        this.longBreakTimer.buttonText = this.getButtonText(this.longBreakTimer.paused);
      }
    }
  }

  loopLongBreak() {
    this.longBreakTimer.timerId = setInterval(() => {
      if (0 >= this.longBreakTimer.timeSeconds) {
        this.playAlert();
        if (this.longBreakTimer.timerId) {
          clearInterval(this.longBreakTimer.timerId);
          this.longBreakTimer.timerId = null;
        }
        return;
      }
      if (!this.longBreakTimer.paused) {
        this.longBreakTimer.timeSeconds--;
        this.longBreakTimer.timeString = this.secondsToString(this.longBreakTimer.timeSeconds);
      }
    }, 1000);
  }

  onSavePomodoroTimerConfig() {
    this.intervals.pomodoro = this.PomodoroMinutes * 60 + this.PomodoroSeconds
    this.pomodoroTimer.timeSeconds = this.intervals.pomodoro;
    this.pomodoroTimer.timeString = this.secondsToString(this.intervals.pomodoro)
    this.intervals.pomodoro = this.PomodoroMinutes * 60 + this.PomodoroSeconds
    if (this.user.isLoggedIn) {
      this.user.updateTimer('pomodoro', this.intervals.pomodoro).subscribe();
      this.openConfigBar("Pomodoro");
      //this.user.pomoTime = this.intervals.pomodoro
      //this.data.UpdateMessage(this.user);
    }
    this.pomodoroTimer.startTimeSeconds = this.intervals.pomodoro;
    this.pomodoroTimer.startTimeString = this.secondsToString(this.intervals.pomodoro)
    //if (this.user.isLoggedIn) {

    //  //this.user.pomoTime = this.intervals.pomodoro
    //  //this.data.UpdateMessage(this.user);
    //}
  }

  onSaveShortTimerConfig() {
    this.intervals.shortBreak = this.ShortBreakMinutes * 60 + this.ShortBreakSeconds
    this.shortBreakTimer.timeSeconds = this.intervals.shortBreak;
    this.shortBreakTimer.timeString = this.secondsToString(this.intervals.shortBreak)
    this.intervals.shortBreak = this.ShortBreakMinutes * 60 + this.ShortBreakSeconds
    if (this.user.isLoggedIn) {
      this.user.updateTimer('shortBreak', this.intervals.shortBreak).subscribe();
      this.openConfigBar("Short Break");
      //this.user.shortTime = this.intervals.shortBreak
      //this.data.UpdateMessage(this.user);
    }
    this.shortBreakTimer.startTimeSeconds = this.intervals.shortBreak;
    this.shortBreakTimer.startTimeString = this.secondsToString(this.intervals.shortBreak)
    //if (this.user.isLoggedIn) {
    //  //this.user.shortTime = this.intervals.shortBreak
    //  //this.data.UpdateMessage(this.user);
    //}
  }

  onSaveLongTimerConfig() {
    this.intervals.longBreak = this.LongBreakMinutes * 60 + this.LongBreakSeconds
    this.longBreakTimer.timeSeconds = this.intervals.longBreak;
    this.longBreakTimer.timeString = this.secondsToString(this.intervals.longBreak)
    this.intervals.longBreak = this.LongBreakMinutes * 60 + this.LongBreakSeconds
    if (this.user.isLoggedIn) {
      this.user.updateTimer('longBreak', this.intervals.longBreak).subscribe();
      this.openConfigBar("Long Break");
      //this.user.longTime = this.intervals.longBreak
      //this.data.UpdateMessage(this.user);
    }
    this.longBreakTimer.startTimeSeconds = this.intervals.longBreak;
    this.longBreakTimer.startTimeString = this.secondsToString(this.intervals.longBreak)
    //if (this.user.isLoggedIn) {
    //  //this.user.longTime = this.intervals.longBreak
    //  //this.data.UpdateMessage(this.user);
    //}
  }

  //userConfigTimers() {
  //  //config pomodoro timer whena user is logged in
  //  this.intervals.pomodoro = this.user.pomoTime
  //  this.pomodoroTimer.timeSeconds = this.intervals.pomodoro;
  //  this.pomodoroTimer.timeString = this.secondsToString(this.intervals.pomodoro)
  //  this.intervals.pomodoro = this.PomodoroMinutes * 60 + this.PomodoroSeconds
  //  if (this.user.signedIn) {
  //    this.user.pomoTime = this.intervals.pomodoro
  //    this.data.UpdateMessage(this.user);
  //  }
  //  this.pomodoroTimer.startTimeSeconds = this.intervals.pomodoro;
  //  this.pomodoroTimer.startTimeString = this.secondsToString(this.intervals.pomodoro)
  //  //config short break timer when user is logged in
  //  this.intervals.shortBreak = this.user.shortTime
  //  this.shortBreakTimer.timeSeconds = this.intervals.shortBreak;
  //  this.shortBreakTimer.timeString = this.secondsToString(this.intervals.shortBreak)
  //  this.intervals.shortBreak = this.ShortBreakMinutes * 60 + this.ShortBreakSeconds
  //  if (this.user.signedIn) {
  //    this.user.shortTime = this.intervals.shortBreak
  //    this.data.UpdateMessage(this.user);
  //  }
  //  this.shortBreakTimer.startTimeSeconds = this.intervals.shortBreak;
  //  this.shortBreakTimer.startTimeString = this.secondsToString(this.intervals.shortBreak)
  //  // config long break time when user is logged in
  //  this.intervals.longBreak = this.user.longTime
  //  this.longBreakTimer.timeSeconds = this.intervals.longBreak;
  //  this.longBreakTimer.timeString = this.secondsToString(this.intervals.longBreak)
  //  this.intervals.longBreak = this.LongBreakMinutes * 60 + this.LongBreakSeconds
  //  if (this.user.signedIn) {
  //    this.user.longTime = this.intervals.longBreak
  //    this.data.UpdateMessage(this.user);
  //  }
  //  this.longBreakTimer.startTimeSeconds = this.intervals.longBreak;
  //  this.longBreakTimer.startTimeString = this.secondsToString(this.intervals.longBreak)
  //}

  changeApp(app: string) {
    this.currentApp = app;
  }

}
