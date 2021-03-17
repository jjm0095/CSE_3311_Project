import { Component, OnInit } from '@angular/core';
import { toDo } from './../models/toDo';
import { MatCheckboxChange, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class ToDoComponent {
  constructor(private _undoBar: MatSnackBar) { }
  tasks: toDo[] = [];
  removedTasks: toDo[] = [];
  inputTask: string = '';
  /* test cases for to do list */
  ngOnInit(): void {
    this.tasks = [
      {
        content: 'test 1',
        selected: false
      },
      {
        content: 'test 2',
        selected: false
      }
    ]
  }
  /* delete element in the list based on the index */
  deleteTask(index: number) {
    this.tasks[index].selected = false;
    this.removedTasks.push(this.tasks[index]);
    this.tasks.splice(index, 1);
    this.openUndoBar();
  }
  /* adds content to list based on user input */
  addTask() {
    if (!(this.inputTask == '')) {
      this.tasks.push({ content: this.inputTask, selected: false });
      this.inputTask = '';
    }
  }

  openUndoBar() {
    let undoBarRef = this._undoBar.open("Task completed", "Undo", { duration: 10000, });

    undoBarRef.onAction().subscribe(() => {
      this._undoBar.dismiss();
      this.tasks.push(this.removedTasks.pop());
      this._undoBar.open("Action undone", null, { duration: 5000 });
    });
  }

  onTaskHover(index: number) {
    this.tasks[index].selected = true;
  }

  onTaskLeave(index: number) {
    this.tasks[index].selected = false;
  }
}
