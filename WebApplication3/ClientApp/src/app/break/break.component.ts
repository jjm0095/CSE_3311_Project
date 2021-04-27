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
  timesPicked = 0

  //string for pulling content from input field in html
  newSuggestion: string = '';


  //string for current break suggestion to be shown, contains nothing by default
  currentBreak: string = '';
  previousBreak: string = '';
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
    this.createQueue();
    this.pickSuggestion();
  }
  //picks a random suggestion from the suggestions pool and sends the string to the html file
  pickSuggestion() {
    this.previousBreak = this.currentBreak
    while (this.previousBreak == this.currentBreak) {
      this.currentBreak = this.suggestions[this.suggestions.length - 1].suggestion;
      this.suggestions.pop()
      this.suggestions.splice(0, 0, { suggestion: this.currentBreak })
      this.timesPicked++
      if (this.timesPicked = this.suggestions.length * 2) {
        this.createQueue()
      }
    }
  }
  //randomize the positions of each element in the array
  createQueue() {
    //this.suggestions.sort() => Math.random() - 0.5);
    
    let len = this.suggestions.length
    while (len > 0) {
      let index = Math.floor(Math.random() * len)
      len--
      let temp = this.suggestions[len].suggestion
      this.suggestions[len].suggestion = this.suggestions[index].suggestion
      this.suggestions[index].suggestion = temp
    }
    
  }

  //pulls from newSuggestions string and creates and pushes new object with this content to the suggestions array
  addSuggestion() {
    if (!(this.newSuggestion == '')) {
      this.suggestions.push({ suggestion: this.newSuggestion });
      this.timesUsed.push({ timesUsed: 0 });
      this.newSuggestion = '';
    }
    this.createQueue()
  }
}
