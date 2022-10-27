import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ToDo } from '../to-do';
import { ToDoService } from '../to-do.service';

@Component({
  selector: 'app-to-dos',
  templateUrl: './to-dos.component.html',
  styleUrls: ['./to-dos.component.css']
})
export class ToDosComponent implements OnInit {
  toDos: ToDo[] = [];

  uncompletedToDos: ToDo[] = [];
  completedToDos: ToDo[] = [];

  constructor(
    private toDoService: ToDoService,
  ) { }

  ngOnInit(): void {
    this.getToDos();
  }

  getToDos(){
    this.toDoService.getToDos()
    .then((data: any) => {
      this.toDos = data;
      this.uncompletedToDos = this.toDos.filter(function(to_do) { return to_do.completed === 'false'; });
      this.completedToDos = this.toDos.filter(function(to_do) { return to_do.completed === 'true'; });
    });
  }

  addToDo(toDo: ToDo){
    this.toDos.unshift(toDo);
  }

}
