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
    this.pickSuggestion();
  }

  pickSuggestion() {
    const index = Math.floor(Math.random() * this.suggestions.length);
    //this.suggestions[index].suggestion += 1;
    this.currentBreak = this.suggestions[index].suggestion;
  }

  addSuggestion() {
    if (!(this.newSuggestion == '')) {
      this.suggestions.push({ suggestion: this.newSuggestion });
      this.timesUsed.push({ timesUsed: 0 });
      this.newSuggestion = '';

    }
  }
}
