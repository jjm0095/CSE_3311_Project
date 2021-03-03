import { Component, OnInit } from '@angular/core';
import { toDo } from './../models/toDo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class ToDoComponent {
  tasks: toDo[] = [];
  inputTask: string = '';
  /* test cases for to do list */
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
  /* delete element in the list based on the index */
  deleteTask(index: number) {
    this.tasks.splice(index, 1);

  }
  /* adds content to list based on user input */
  addTask() {
    if (!(this.inputTask == '')) {
      this.tasks.push({ content: this.inputTask });
      this.inputTask = '';
    }
  }
}
