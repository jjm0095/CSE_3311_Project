import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sound',
  templateUrl: './sound.component.html',
})

export class SoundComponent implements OnInit {
  volume1: number = 0.5;
  volume2: number = 0.5;
  volume3: number = 0.5;

  sound1 = new Audio();
  sound2 = new Audio();
  sound3 = new Audio();

  sound1Playing = false;
  sound2Playing = false;
  sound3Playing = false;

  ngOnInit() {
    this.sound1.src = "../../assets/audio/sound1.mp3";
    this.sound1.loop = true;
    this.sound1.volume = this.volume1;
    this.sound2.src = "../../assets/audio/sound2.mp3";
    this.sound2.loop = true;
    this.sound2.volume = this.volume2;
    this.sound3.src = "../../assets/audio/sound3.mp3";
    this.sound3.loop = true;
    this.sound3.volume = this.volume3;
  }

  playSound1() {
    this.sound1.load();
    this.sound1.play();
    this.sound1Playing = true;
  }
  pauseSound1() {
    this.sound1.pause();
    this.sound1Playing = false;
  }
  playSound2() {
    this.sound2.load();
    this.sound2.play();
    this.sound2Playing = true;
  }
  pauseSound2() {
    this.sound2.pause();
    this.sound2Playing = false;
  }
  playSound3() {
    this.sound3.load();
    this.sound3.play();
    this.sound3Playing = true;
  }
  pauseSound3() {
    this.sound3.pause();
    this.sound3Playing = false;
  }

  changeVolume1() {
    this.sound1.volume = this.volume1;
  }
  changeVolume2() {
    this.sound2.volume = this.volume2;
  }
  changeVolume3() {
    this.sound3.volume = this.volume3;
  }
}
