import { Component, OnInit } from '@angular/core';
import { PortalModule } from '@angular/cdk/portal';
import { Break } from './../models/Break';
import { TimeUsed } from './../models/Break';

@Component({
  selector: 'app-break',
  templateUrl: './break.component.html',
})

export class BreakComponent {
  suggestions: Break[] = [];
  timesUsed: TimeUsed[] = [];
  newSuggestion: string = '';

  currentBreak: string = '';
  currentBreakI: number;

  //this.currentBreak.suggestion = 'hello';

  ngOnInit(): void {
    this.suggestions = [
      {
        suggestion: 'Drink Water and Stay Hydrated',
       
      },
      {
        suggestion: 'Stand up and Stretch',
      },
      {
        suggestion: 'Let your eyes take a break from looking at the screen',
      }
    ]
    this.timesUsed = [
      {
        timesUsed: 0

      },
      {
        timesUsed: 0 
      },
      {
        timesUsed: 0
      }
    ]
    this.pickSuggestion();
  }

  pickSuggestion() {
    let index = Math.floor(Math.random() * this.suggestions.length);
    while (index == this.currentBreakI) {
      index = Math.floor(Math.random() * this.suggestions.length);
    }
    this.timesUsed[index].timesUsed += 1;
    this.currentBreak = this.suggestions[index].suggestion;
  }
/*
  getMinTimeUsed() {
    this.currentBreakI = 0;
    for (let i = 0; i < this.timesUsed.length; i++) {
      if (this.timesUsed[i].timesUsed < this.timesUsed[this.currentBreakI].timesUsed) {
        this.currentBreakI = i;
      }
    } 
  }
  */
  addSuggestion() {
    if (!(this.newSuggestion == '')) {
      this.suggestions.push({ suggestion: this.newSuggestion });
      this.timesUsed.push({ timesUsed: 0 });
      this.newSuggestion = '';

    }
  }
}
