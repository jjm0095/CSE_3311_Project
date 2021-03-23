import { Component, OnInit } from '@angular/core';
import { PortalModule } from '@angular/cdk/portal';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})


export class HomeComponent implements OnInit {
  intervals = {
    pomodoro: 1500,
    shortBreak: 300,
    longBreak: 900,
  };
  starts = {
    pomodoro: 1500,
    shortBreak: 300,
    longBreak: 900,
  };

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
    startTimeSeconds: this.starts.pomodoro,
    startTimeString: this.secondsToString(this.starts.pomodoro)
  };

  shortBreakTimer = {
    timeSeconds: this.intervals.shortBreak,
    timeString: this.secondsToString(this.intervals.shortBreak),
    buttonText: "Start",
    timerId: null,
    paused: true,
    iconClass: "glyphicon glyphicon-play",
    startTimeSeconds: this.starts.shortBreak,
    startTimeString: this.secondsToString(this.starts.shortBreak)
  };

  longBreakTimer = {
    timeSeconds: this.intervals.longBreak,
    timeString: this.secondsToString(this.intervals.longBreak),
    buttonText: "Start",
    timerId: null,
    paused: true,
    iconClass: "glyphicon glyphicon-play",
    startTimeSeconds: this.starts.longBreak,
    startTimeString: this.secondsToString(this.starts.longBreak)
  }

  timer: number = 90;
  pause: boolean = false;
  constructor() { }

  ngOnInit() {

  }

 

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
    this.starts.pomodoro = this.PomodoroMinutes * 60 + this.PomodoroSeconds
    this.pomodoroTimer.startTimeSeconds = this.starts.pomodoro;
    this.pomodoroTimer.startTimeString = this.secondsToString(this.starts.pomodoro)
  }

  onSaveShortTimerConfig() {
    this.intervals.shortBreak = this.ShortBreakMinutes * 60 + this.ShortBreakSeconds
    this.shortBreakTimer.timeSeconds = this.intervals.shortBreak;
    this.shortBreakTimer.timeString = this.secondsToString(this.intervals.shortBreak)
    this.starts.shortBreak = this.ShortBreakMinutes * 60 + this.ShortBreakSeconds
    this.shortBreakTimer.startTimeSeconds = this.starts.shortBreak;
    this.shortBreakTimer.startTimeString = this.secondsToString(this.starts.shortBreak)
  }

  onSaveLongTimerConfig() {
    this.intervals.longBreak = this.LongBreakMinutes * 60 + this.LongBreakSeconds
    this.longBreakTimer.timeSeconds = this.intervals.longBreak;
    this.longBreakTimer.timeString = this.secondsToString(this.intervals.longBreak)
    this.starts.longBreak = this.LongBreakMinutes * 60 + this.LongBreakSeconds
    this.longBreakTimer.startTimeSeconds = this.starts.longBreak;
    this.longBreakTimer.startTimeString = this.secondsToString(this.starts.longBreak)
  }

  changeApp(app: string) {
    this.currentApp = app;
  }

}
