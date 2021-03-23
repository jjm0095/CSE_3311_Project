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
  completedTasks: toDo[] = [];
  removedCompleted: toDo[] = [];
  inputTask: string = '';
  /* test cases for to do list */
  ngOnInit(): void {
    this.tasks = [
      {
        content: 'test 1',
        selected: false,
        deleteSelected: false
      },
      {
        content: 'test 2',
        selected: false,
        deleteSelected: false
      }
    ]
    this.completedTasks = [
      {
        content: 'Test: you have completed this task',
        selected: false,
        deleteSelected: false
      }
    ]
  }
  /* delete element in the list based on the index */
  completeTask(index: number) {
    this.tasks[index].selected = false;
    this.removedTasks.push(this.tasks[index]);
    this.completedTasks.push(this.tasks[index]);
    this.tasks.splice(index, 1);
    this.openUndoBarCompCheck();
  }
  deleteTask(index: number) {
    this.tasks[index].selected = false;
    this.removedTasks.push(this.tasks[index]);
    this.tasks.splice(index, 1);
    this.openUndoBar();
  }
  deleteCompleted(index: number) {
    this.completedTasks[index].selected = false;
    this.removedCompleted.push(this.completedTasks[index]);
    this.completedTasks.splice(index, 1);
    this.openUndoBarCompleted();
  }
  /* adds content to list based on user input */
  addTask() {
    if (!(this.inputTask == '')) {
      this.tasks.push({ content: this.inputTask, selected: false, deleteSelected: false });
      this.inputTask = '';
    }
  }

  openUndoBar() {
    let undoBarRef = this._undoBar.open("Task removed", "Undo", { duration: 10000, });

    undoBarRef.onAction().subscribe(() => {
      this._undoBar.dismiss();
      this.tasks.push(this.removedTasks.pop());
      //this.removedCompleted.push(this.completedTasks.pop());
      this._undoBar.open("Action undone", null, { duration: 5000 });
    });
  }
  openUndoBarCompCheck() {
    let undoBarRef = this._undoBar.open("Task added", "Undo", { duration: 10000, });

    undoBarRef.onAction().subscribe(() => {
      this._undoBar.dismiss();
      this.tasks.push(this.removedTasks.pop());
      this.removedCompleted.push(this.completedTasks.pop());
      this._undoBar.open("Action undone", null, { duration: 5000 });
    });
  }
  openUndoBarCompleted() {
    let undoBarRef = this._undoBar.open("Task completed", "Undo", { duration: 10000, });

    undoBarRef.onAction().subscribe(() => {
      this._undoBar.dismiss();
      this.completedTasks.push(this.removedCompleted.pop());
      this._undoBar.open("Action undone", null, { duration: 5000 });
    });
  }

  onTaskHover(index: number) {
    this.tasks[index].selected = true;
  }

  onTaskLeave(index: number) {
    this.tasks[index].selected = false;
  }

  onDeleteHover(index: number) {
    this.tasks[index].deleteSelected = true;
  }

  onDeleteLeave(index: number) {
    this.tasks[index].deleteSelected = false;
  }

  onCompletedHover(index: number) {
    this.completedTasks[index].selected = true;
  }

  onCompletedLeave(index: number) {
    this.completedTasks[index].selected = false;
  }
}
