import { Component, OnInit } from '@angular/core';
import { toDo } from './../models/toDo';
import { MatCheckboxChange, MatSnackBar } from '@angular/material';
import { User } from './../models/User';
import { DataService } from './../data.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class ToDoComponent {
  constructor(private data: DataService,private _undoBar: MatSnackBar) { }
  user: User;
  
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
    this.data.userMessage.subscribe(message => this.user = message);
    //default initial values for test cases in task list
    if (this.user.signedIn == false) {
      this.tasks = [
        {
          content: 'Complete presentation for 3311',
          selected: false,
          deleteSelected: false
        },
        {
          content: 'Study for AI',
          selected: false,
          deleteSelected: false
        }
      ]
      //default values for completed task list 
      this.completedTasks = [
        {
          content: 'Complete Eng. Notebook',
          selected: false,
          deleteSelected: false
        }
      ]
    } else {
      for (let i = 0; i < this.user.tasks.length; i++) {
        this.tasks.push({ content: this.user.tasks[i], selected: false, deleteSelected: false });
      }
      for (let i = 0; i < this.user.completed.length; i++) {
        this.completedTasks.push({ content: this.user.completed[i], selected: false, deleteSelected: false });
      }
    }
    
  }
/*  complete element in the list based on the index */
  //pushes it to removed array
  completeTask(index: number) {
    this.tasks[index].selected = false;
    //repeats the process for the user object if a user is signed in
    if (this.user.signedIn) {
      this.user.completed.push(this.tasks[index].content)
      this.user.tasks.splice(index, 1)
    }
    this.removedTasks.push(this.tasks[index]);
    this.completedTasks.push(this.tasks[index]);
    this.tasks.splice(index, 1);
    this.data.UpdateMessage(this.user);
    this.openUndoBarCompCheck();
  }
  // deletes tasks from list and pushes to removed array
  deleteTask(index: number) {
    this.tasks[index].selected = false;
    //repeats the process for the user object if a user is signed in
    if (this.user.signedIn) {
      this.user.tasks.splice(index, 1);
      this.data.UpdateMessage(this.user);
    }
    this.removedTasks.push(this.tasks[index]);
    this.tasks.splice(index, 1);
    //pop up button at bottom of screen for undo
    this.openUndoBar();
  }
  deleteCompleted(index: number) {
    this.completedTasks[index].selected = false;
    //repeats the process for the user object if a user is signed in
    if (this.user.signedIn) {
      this.user.completed.splice(index, 1);
      this.data.UpdateMessage(this.user);
    }
    this.removedCompleted.push(this.completedTasks[index]);
    this.completedTasks.splice(index, 1);
    //pop up button at bottom of screen for undo
    this.openUndoBarCompleted();
  }
  /* adds content to list based on user input */
  addTask() {
    if (!(this.inputTask == '')) {
      this.tasks.push({ content: this.inputTask, selected: false, deleteSelected: false });
      //repeats the process for the user object if a user is signed in
      if (this.user.signedIn) {
        this.user.tasks.push(this.inputTask)
        this.data.UpdateMessage(this.user);
      }
      this.inputTask = '';
    }
  }
  //undo button pops up when remove button is pressed to undo
  removed: string = '';
  openUndoBar() {
    let undoBarRef = this._undoBar.open("Task removed", "Undo", { duration: 10000, });
    //code for Undo button
    undoBarRef.onAction().subscribe(() => {
      this._undoBar.dismiss();
      this.removed = this.removedTasks.pop().content;
      this.tasks.push({ content: this.removed, selected: false, deleteSelected: false })
      /*
      this.tasks.push(this.removedTasks.pop());
      */
      //repeats the process for the user object if a user is signed in
      if (this.user.signedIn) {
        this.user.tasks.push(this.removed)
        this.data.UpdateMessage(this.user);
      }
      this.removed = '';
      //this.removedCompleted.push(this.completedTasks.pop());
      this._undoBar.open("Action undone", null, { duration: 5000 });
    });
  }
  //undo button pops up when remove button is pressed to undo
  openUndoBarCompCheck() {
    let undoBarRef = this._undoBar.open("Task Completed", "Undo", { duration: 10000, });
    //code for undo button
    undoBarRef.onAction().subscribe(() => {
      this._undoBar.dismiss();
      this.removed = this.removedTasks.pop().content;
      if (this.user.signedIn) {
        this.user.tasks.push(this.removed)
        this.user.completed.pop()
        this.data.UpdateMessage(this.user);
      }
      this.tasks.push({ content: this.removed, selected: false, deleteSelected: false });
      this.removedCompleted.push(this.completedTasks.pop());
      this.removed = '';
      this._undoBar.open("Action undone", null, { duration: 5000 });
    });
  }
  //undo button pops up when completed button is pressed in list
  openUndoBarCompleted() {
    let undoBarRef = this._undoBar.open("Task Removed", "Undo", { duration: 10000, });
    //code for undo button
    undoBarRef.onAction().subscribe(() => {
      this.removed = this.removedCompleted.pop().content
      this._undoBar.dismiss();
      if (this.user.signedIn) {
        this.user.completed.push(this.removed)
        this.data.UpdateMessage(this.user);
      }
      this.completedTasks.push({ content: this.removed, selected: false, deleteSelected: false });
      this._undoBar.open("Action undone", null, { duration: 5000 });
    });
  }

  updateUserTodo() {
    
  }

  updateUserCompleted() {

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
