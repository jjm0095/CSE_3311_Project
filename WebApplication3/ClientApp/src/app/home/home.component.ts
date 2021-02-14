import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
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
}
