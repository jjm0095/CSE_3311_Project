import { Component, OnInit } from '@angular/core';
import { PortalModule } from '@angular/cdk/portal';
import { Break } from './../models/Break';
import { TimeUsed } from './../models/Break';

@Component({
  selector: 'app-break',
  templateUrl: './break.component.html',
})

export class BreakComponent {
  //array for storing content of suggestions
  suggestions: Break[] = [];
  //array for storing number of times a suggestion is used
  timesUsed: TimeUsed[] = [];

  //string for pulling content from input field in html
  newSuggestion: string = '';


  //string for current break suggestion to be shown, contains nothing by default
  currentBreak: string = '';
  currentBreakI: number;

  //this.currentBreak.suggestion = 'hello';

  ngOnInit(): void {
    //initialization for default suggestion array
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
  //picks a random suggestion from the suggestions pool and sends the string to the html file
  pickSuggestion() {
    //creates random index
    let index = Math.floor(Math.random() * this.suggestions.length);
    while (index == this.currentBreakI) {
      index = Math.floor(Math.random() * this.suggestions.length);
    }
    //increments times used by one
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

  //pulls from newSuggestions string and creates and pushes new object with this content to the suggestions array
  addSuggestion() {
    if (!(this.newSuggestion == '')) {
      this.suggestions.push({ suggestion: this.newSuggestion });
      this.timesUsed.push({ timesUsed: 0 });
      this.newSuggestion = '';

    }
  }
}
