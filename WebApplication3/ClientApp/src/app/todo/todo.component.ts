import { Component, OnInit } from '@angular/core';
import { toDo } from './../models/todo';

@Component({
  selector: 'app-login',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class ToDoComponent{
  tasks: toDo[] = [];
  inputTask: string = '';

  ngOnInit(): void {
    this.tasks = [
      {
        content: 'test 1'
      },
      {
        content: 'test 2'
      }
    ]
  }

  deleteTask(index:number) {
    this.tasks.splice(index, 1);
 
  }
  
  addTask() {
    if (!(this.inputTask == '')) {
      this.tasks.push({ content: this.inputTask });
      this.inputTask = '';
    }
  }
}
