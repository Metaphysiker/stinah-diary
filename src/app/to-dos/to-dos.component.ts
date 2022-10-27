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
    });
  }

  addToDo(toDo: ToDo){
    this.toDos.unshift(toDo);
  }

}
