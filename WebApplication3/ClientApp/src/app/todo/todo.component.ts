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
  //arrays for tasks to be displayed in list
  tasks: toDo[] = [];
  //array for removed tasks, to be used in undo function
  removedTasks: toDo[] = [];
  //array for completed task
  completedTasks: toDo[] = [];
  //array for removed completed tasks, to be used in duno fucntion
  removedCompleted: toDo[] = [];
  inputTask: string = '';
  /* test cases for to do list */
  ngOnInit(): void {
    //default initial values for test cases in task list
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
    //default values for completed task list 
    this.completedTasks = [
      {
        content: 'Test: you have completed this task',
        selected: false,
        deleteSelected: false
      }
    ]
  }
/*  complete element in the list based on the index */
  //pushes it to removed array
  completeTask(index: number) {
    this.tasks[index].selected = false;
    this.removedTasks.push(this.tasks[index]);
    this.completedTasks.push(this.tasks[index]);
    this.tasks.splice(index, 1);
    this.openUndoBarCompCheck();
  }
  // deletes tasks from list and pushes to removed array
  deleteTask(index: number) {
    this.tasks[index].selected = false;
    this.removedTasks.push(this.tasks[index]);
    this.tasks.splice(index, 1);
    //pop up button at bottom of screen for undo
    this.openUndoBar();
  }
  deleteCompleted(index: number) {
    this.completedTasks[index].selected = false;
    this.removedCompleted.push(this.completedTasks[index]);
    this.completedTasks.splice(index, 1);
    //pop up button at bottom of screen for undo
    this.openUndoBarCompleted();
  }
  /* adds content to list based on user input */
  addTask() {
    if (!(this.inputTask == '')) {
      this.tasks.push({ content: this.inputTask, selected: false, deleteSelected: false });
      this.inputTask = '';
    }
  }
  //undo button pops up when remove button is pressed to undo
  openUndoBar() {
    let undoBarRef = this._undoBar.open("Task removed", "Undo", { duration: 10000, });
    //code for Undo button
    undoBarRef.onAction().subscribe(() => {
      this._undoBar.dismiss();
      this.tasks.push(this.removedTasks.pop());
      //this.removedCompleted.push(this.completedTasks.pop());
      this._undoBar.open("Action undone", null, { duration: 5000 });
    });
  }
  //undo button pops up when remove button is pressed to undo
  openUndoBarCompCheck() {
    let undoBarRef = this._undoBar.open("Task added", "Undo", { duration: 10000, });
    //code for undo button
    undoBarRef.onAction().subscribe(() => {
      this._undoBar.dismiss();
      this.tasks.push(this.removedTasks.pop());
      this.removedCompleted.push(this.completedTasks.pop());
      this._undoBar.open("Action undone", null, { duration: 5000 });
    });
  }
  //undo button pops up when completed button is pressed in list
  openUndoBarCompleted() {
    let undoBarRef = this._undoBar.open("Task completed", "Undo", { duration: 10000, });
    //code for undo button
    undoBarRef.onAction().subscribe(() => {
      this._undoBar.dismiss();
      this.completedTasks.push(this.removedCompleted.pop());
      this._undoBar.open("Action undone", null, { duration: 5000 });
    });
  }
  // functions for chnaging look of button when moused over
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
